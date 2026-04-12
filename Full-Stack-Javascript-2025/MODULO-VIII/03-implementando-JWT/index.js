import express from 'express';
import { users } from './data/user.js';
import jwt  from 'jsonwebtoken';

const app = express();
app.listen( 3000, () => `Servidor arriba en el puerto 3000`)

// Autorizamdo a Mark
// Paso 1
const secretKey = "Mi Llave Ultra Secreta";

// Paso 2 Generamos el token
const token = jwt.sign( users[0], secretKey );

app.get('/', ( req, res ) => {
    res.send(token)
})
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmtAZ21haWwuY29tIiwicGFzc3dvcmQiOiJmYWNlYm9vayIsImlhdCI6MTc3NDQ3OTk1OH0.H-giqFC0ReFSORV2BSF5oyMeW1rs0bIjli2_El6YM1o
// http://localhost:3000/token?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmtAZ21haWwuY29tIiwicGFzc3dvcmQiOiJmYWNlYm9vayIsImlhdCI6MTc3NDQ3OTk1OH0.H-giqFC0ReFSORV2BSF5oyMeW1rs0bIjli2_El6YM1o

// http://localhost:3000/usuarios/:userId // req.params.userId
// http://localhost:3000/usuarios?name=pedro // req.query.name
// PASO 3 lo validamos
app.get("/token", ( req, res ) => {
    const { token } = req.query;
    jwt.verify( token, secretKey, (err, data )=>{
        res.send( err ? "Token invalido" : data )
    } )
})

//PASO 4 Persistencia dek token
// http://localhost:3000/login?email=mark@gmail.com&password=facebook
app.get("/login", ( req, res )=>{
    const {email, password } = req.query;
    const user = users.find( u => u.email == email && u.password == password );

    if(user){
        const token = jwt.sign(
            {
                exp : Math.floor(Date.now() / 1000) + 120, // 2 minutos
                data : user
            },
            secretKey
        );
        res.send(`
<a href="/Dashboard?token=${token}"> <p> Ir al Dashboard </p> </a>
Bienvenido, ${email}.
<script>
localStorage.setItem('token', JSON.stringify("${token}"))
</script>
`);
    }else{
        res.send("Usuario o contraseña incorrecta")
    }
})

app.get("/Dashboard", ( req, res )=>{
    const { token } = req.query
    jwt.verify(token, secretKey,  ( err, decoded) => {
            err 
                ? res.status(401).send({
                    error : '401 Unauthorized',
                    message: err.message
                })
            :
            res.send(`Bienvenido al Dashboard ${decoded.data.email}`)
    } )
})








