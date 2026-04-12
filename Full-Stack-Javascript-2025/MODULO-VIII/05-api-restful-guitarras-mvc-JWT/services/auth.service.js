import jwt from 'jsonwebtoken';
import { randomUUID, timingSafeEqual } from 'crypto';
import ApiError from '../utils/ApiError.js';

const ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

if(!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET){
    throw new Error('JWT_ACCESS_SECRET y JWT_REFRESH_SECRET deben estar en .env')
}

// Guardamos los secretos en constantes
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET; // Clave para firmar access Tokens
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;  // Clave para firmar el refresh token

// Base de datos de demotración

const DEMO_USERS = [

{
    id: 'u-admin-1',                                               // ID único del usuario.
    email: process.env.DEMO_ADMIN_EMAIL || 'admin@guitarras.dev', // Email configurable por .env.
    password: process.env.DEMO_ADMIN_PASSWORD || 'Admin123*',     // Contraseña configurable por .env.
    role: 'admin'                                                  // Rol con permisos de administrador.
  },
  {
    id: 'u-user-1',
    email: process.env.DEMO_USER_EMAIL || 'user@guitarras.dev',
    password: process.env.DEMO_USER_PASSWORD || 'User123*',
    role: 'user'                                                   // Rol con permisos de usuario normal.
  }

]

// ----- Almacenamiento en memoria de tokens activos ----------------------

// Cuando el usuario hace logout eliminamos el token desde Map
const activeRefreshTokens = new Map();
// Sirve para maracar los tekens como "inútiles" aun su firma siga siendo válida
const blacklistedAccessTokens = new Map();

setInterval(()=>{
    const now = Date.now() // tiempo actual en milisegundos
    for(const [ jti , expiresAt] of blacklistedAccessTokens ){
        if( now > expiresAt ) blacklistedAccessTokens.delete(jti)
    }
}, 15 * 60 * 1000 ).unref() // .unref() evita que este intervalo impida a Node.JS que cierre el proceso


// ------Funciones privadas ( No exportadas ) --------
const signAccessToken = (user, jti) => {

    return jwt.sign(
        {
            sub : user.id, // "sub" (Subject) = Quién es el dueño del token ( es un standar ),
            email : user.email,
            role: user.role,
            typ : 'access', // Campo personalizado para distinguir tipo de token
            jti  // Identificador único del token (Permite revocarlo individualmente )
        },
        ACCESS_SECRET,
        {expiresIn :ACCESS_EXPIRES_IN }
    )
}

const signRefreshToken = ( user, jti ) => {
    return jwt.sign(
        {
            sub : user.id,
            typ: 'refresh',
            jti
        },
        REFRESH_SECRET,
        { expiresIn: REFRESH_EXPIRES_IN }
    )
}

// Contruimos la respuesta completa de autentificación ( Login y refresh );
// Genera un par de nueso tokens y los registra en el Map activo

const buildAuthResponse = ( user ) => {
    // generamos IDs únicos para cada token 
    const refreshTokenJti = randomUUID();
    const accessTokenJti = randomUUID();

    // Firmamos ambos tokens con sus respectivos secretos y JTIs.
    const accessToken = signAccessToken( user, accessTokenJti );
    const refreshToken = signRefreshToken( user, refreshTokenJti );

    activeRefreshTokens.set(refreshTokenJti, {
        userId : user.id,
        role : user.role,
        issuedAt : Date.now()
    });

    // Retornamos el objeto que el controlador va a devolver al cliente
    return {
        tokenType : 'Bearer',
        accessToken,
        refreshToken,
        expiresIn : ACCESS_EXPIRES_IN,
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        }
    }
}

// ---- Servicios exportados ------
export const loginService = ({ email, password }) => {
    if (!email || !password) {
        throw new ApiError(400, 'Email y password son obligatorios.');
    }

    const user = DEMO_USERS.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
    
  // ── Comparación segura de contraseñas (timing-safe) ───────────────────────
  // Convertimos ambas contraseñas a Buffer para poder compararlas byte a byte.
  const inputBuf = Buffer.from(String(password)); // Contraseña que envió el cliente.

  // Si el usuario NO existe, creamos un Buffer del mismo tamaño para seguir comparando.
  // Esto es importante: si cortáramos aquí, el tiempo de respuesta revelaría al atacante
  // que el usuario no existe (timing attack). Siempre hacemos la comparación completa.
  const storedBuf = user ? Buffer.from(String(user.password)) : Buffer.alloc(inputBuf.length);

  // timingSafeEqual compara los dos Buffers en tiempo constante (sin cortocircuito).
  // También verifica que tengan la misma longitud antes de comparar contenido.
  const passwordMatch = inputBuf.length === storedBuf.length && timingSafeEqual(inputBuf, storedBuf);

  // Si el usuario no existe O la contraseña no coincide → error 401.
  // Usamos el mismo mensaje para no revelar cuál de los dos falló.
  if (!user || !passwordMatch) {
    throw new ApiError(401, 'Credenciales inválidas.');
  }
  return buildAuthResponse(user)
}

// REFRESH TOKEN: rota el par de tokens cuando el access token expira.
// El cliente envía su refresh token y recibe un par de tokens completamente nuevo.
export const refreshTokenService = ({ refreshToken }) => {
  // El refresh token es obligatorio para esta operación.
  if (!refreshToken) {
    throw new ApiError(400, 'refreshToken es obligatorio.');
  }

  // Intentamos verificar y decodificar el refresh token.
  let payload;
  try {
    payload = jwt.verify(refreshToken, REFRESH_SECRET); // Lanza excepción si es inválido o expiró.
  } catch {
    throw new ApiError(401, 'Refresh token inválido o expirado.');
  }

  // Verificamos que el campo "typ" sea exactamente "refresh" y que tenga jti.
  // Esto evita que alguien use un access token donde se espera un refresh token.
  if (payload.typ !== 'refresh' || !payload.jti) {
    throw new ApiError(401, 'Refresh token inválido.');
  }

  // Buscamos el token en el Map de tokens activos.
  // Si no está aquí, fue revocado (por logout u otro refresh previo → rotación).
  const storedToken = activeRefreshTokens.get(payload.jti);
  if (!storedToken || storedToken.userId !== payload.sub) {
    throw new ApiError(401, 'Refresh token revocado.');
  }

  // Eliminamos el refresh token usado: cada token solo puede usarse UNA vez (rotación).
  // Si alguien roba el token y lo usa, el token legítimo ya no servirá → detectamos la intrusión.
  activeRefreshTokens.delete(payload.jti);

  // Buscamos al usuario real por su ID para obtener datos actualizados.
  const user = DEMO_USERS.find((u) => u.id === payload.sub);
  if (!user) {
    throw new ApiError(401, 'Usuario no válido para refrescar sesión.');
  }

  // Todo correcto: generamos y devolvemos un par de tokens completamente nuevo.
  return buildAuthResponse(user);
};

// LOGOUT: cierra la sesión invalidando ambos tokens de forma inmediata.
// Ambos tokens son OBLIGATORIOS: sin ellos el logout sería incompleto.
export const logoutService = ({ refreshToken, accessToken }) => {
  // Ambos tokens son obligatorios para garantizar un logout completo.
  // Si faltara el accessToken, el usuario podría seguir accediendo hasta que expire.
  if (!refreshToken || !accessToken) {
    throw new ApiError(400, 'refreshToken y accessToken son obligatorios para cerrar sesión.');
  }

  // Verificamos el refresh token para obtener su jti y borrarlo del Map de activos.
  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET);
    if (payload.jti) {
      // Al borrarlo, el token queda revocado aunque su firma siga siendo válida.
      activeRefreshTokens.delete(payload.jti);
    }
  } catch {
    // Si el token ya expiró o es inválido, lanzamos error igualmente.
    throw new ApiError(401, 'Refresh token inválido o expirado.');
  }

  // Agregamos el access token a la blacklist para invalidarlo de forma inmediata.
  // Sin este paso, el usuario podría seguir usando el access token hasta que expire (15 min).
  try {
    const accessPayload = jwt.verify(accessToken, ACCESS_SECRET);
    if (accessPayload.jti) {
      // Guardamos el jti con su timestamp de expiración (en ms) para la limpieza automática.
      blacklistedAccessTokens.set(accessPayload.jti, accessPayload.exp * 1000);
      // accessPayload.exp viene en segundos (estándar JWT), lo multiplicamos por 1000 para ms.
    }
  } catch {
    // Si el access token ya expiró, no importa: de todas formas no sirve.
    // El refresh token ya fue revocado, el logout se considera exitoso.
  }

  // Devolvemos confirmación de logout exitoso.
  return {
    message: 'Sesión cerrada correctamente.'
  };
};

// VERIFICAR ACCESS TOKEN: valida el token y retorna los datos del usuario.
// Esta función es usada por el middleware de autenticación en cada petición protegida.
export const verifyAccessTokenService = (token) => {
  try {
    // Verificamos la firma y la expiración del token.
    const payload = jwt.verify(token, ACCESS_SECRET);

    // Verificamos que sea realmente un access token y no un refresh token.
    if (payload.typ !== 'access') {
      throw new ApiError(401, 'Token inválido para acceder a este recurso.');
    }

    // Comprobamos si este token fue invalidado manualmente (logout).
    // Aunque la firma sea válida, si está en la blacklist → acceso denegado.
    if (payload.jti && blacklistedAccessTokens.has(payload.jti)) {
      throw new ApiError(401, 'Sesión cerrada. Por favor, inicia sesión nuevamente.');
    }

    // Token válido: devolvemos los datos del usuario para que el middleware
    // los adjunte a req.user y los controladores puedan usarlos.
    return {
      id: payload.sub,       // ID del usuario (campo "sub" del JWT).
      email: payload.email,
      role: payload.role
    };
  } catch (error) {
    // Si el error ya es un ApiError nuestro, lo relanzamos tal cual.
    if (error instanceof ApiError) {
      throw error;
    }
    // Cualquier otro error de jwt.verify (firma inválida, token expirado, etc.)
    // lo convertimos en un error 401 genérico para no revelar detalles internos.
    throw new ApiError(401, 'Token de acceso inválido o expirado.');
  }
};
