# TP Integrador JS - Andrés Sánchez (Final Módulo 8 - API RESTful)


## 📝 Descripción del proyecto
Esta aplicación ha evolucionado hacia una **API RESTful completa**, integrando los conocimientos de los módulos 6, 7 y 8. Se ha implementado un sistema de **Autenticación robusto**, persistencia en **PostgreSQL** mediante **Sequelize** y gestión de archivos multimedia.

Este entregable consolida el ciclo de backend: estructura profesional, seguridad avanzada, lógica de negocio y exposición de endpoints protegidos.

---

## 📂 Estructura del proyecto (Patrón MVC)

```text
proyecto-backend/
├── config/          # Conexión a PostgreSQL (Sequelize)
├── controllers/     # Lógica: authController.js y userController.js
├── middlewares/     # Auth (JWT), Upload (Multer) y ErrorHandler
├── models/          # Modelo User (Hooks de Bcrypt y Scopes)
├── public/          # Assets y /uploads para imágenes
├── routes/          # Endpoints de la API (index.js)
├── .env             # Variables sensibles (No incluido en el repo)
├── .env.example     # Plantilla para configuración de entorno
├── app.js           # Servidor y configuración principal
└── README.md        # Documentación técnica

🛠️ Tecnologías y Seguridad
Backend: Node.js & Express.

Seguridad: JSON Web Tokens (JWT) para sesiones y Bcryptjs para hasheo de contraseñas.

ORM & DB: Sequelize con PostgreSQL.

Archivos: Multer para procesamiento de imágenes.

Pruebas: Documentación testeada íntegramente en Postman.

## Instalación y Configuración

1. Clonar el repositorio:

bash
git clone <https://github.com/andfel1996-commits/proyecto-backend.git>
cd proyecto-backend
npm install

2. Variables de Entorno: Crea un archivo .env con:


PORT=3000
DB_NAME=tu_db
DB_USER=postgres
DB_PASS=tu_password
DB_HOST=127.0.0.1
DB_PORT=5432
JWT_SECRET=tu_clave_secreta_jwt

3.Iniciar servidor:

npm run dev

🚀 Guía de Uso de la API (Postman)

Autenticación (Pública)
Registro (POST /register): Crea un usuario. La contraseña se encripta automáticamente.

Login (POST /login): Devuelve un Token JWT necesario para rutas protegidas.

Rutas Protegidas (Requieren Header Authorization: Bearer <token>)
Subida de Avatar (POST /upload): Carga una imagen usando form-data (campo avatar).

Actualizar Usuario (POST /users/update/:id): Modificación de datos persistidos.

Eliminar Usuario (POST /users/delete/:id): Borrado físico con validación previa de existencia.

✅ Funcionalidades Módulo 8


Protección de Rutas: Middleware de autenticación que valida el token antes de acceder a procesos críticos.

Encriptación de Datos: Uso de hooks en Sequelize para asegurar que las contraseñas nunca se guarden en texto plano.

Gestión de Archivos: Configuración de Multer con filtros de tipo de archivo (solo imágenes) y límites de tamaño.

API de Consumo Externo: Respuestas en formato JSON con códigos de estado HTTP estandarizados (200, 201, 401, 404).

🧠 Reflexiones Técnicas
Seguridad: La implementación de JWT y Bcrypt transformó el proyecto en una herramienta real y segura, protegiendo la integridad del usuario.

Escalabilidad: Al separar la lógica de autenticación en controladores y middlewares específicos, el código quedó preparado para crecer sin desorden.

Aprendizaje Integrado: Este proyecto demuestra la capacidad de iterar sobre una base de código, migrando de archivos JSON a una base de datos relacional y finalmente a una API protegida.