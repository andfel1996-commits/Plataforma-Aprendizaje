import express from "express";
const app = express();

app.get('/quiensoy', (req,res)=>{
    res.send('<h1>Juan Perez</h1>')
})


app.use((req, res) => {
  res.status(404).send('<p style="color:red">La URL que estás consultando no existe</p>');
});

app.listen(3000,()=>console.log('Sever Up en puerto 3000'));
