import express from "express";
const app = express();

app.get('/usuarios', (req,res)=>{
    res.send('<h1>Juan Perez</h1>')
})

app.listen(3000,()=>console.log('Sever Up en puerto 3000'));
// import http from 'http';
// const servidor  = http.createServer((req,res)=>{
//     const { url, method } = req;
//     if(url === '/usuarios' && method === 'GET'){
//         res.write('Respuesta del server')
//         res.end();
//     }
// })

//servidor.listen(3000,()=> console.log('Server levantado en el puerto 3000'))