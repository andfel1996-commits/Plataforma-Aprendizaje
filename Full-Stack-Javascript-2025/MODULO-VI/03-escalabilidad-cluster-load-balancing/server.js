import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// Endpoint clave para la demo:
// Nos dice qué proceso (PID) atendió la request
app.get("/info", (req, res) => {
  res.json({
    pid: process.pid,
    mensaje: "Este PID corresponde al proceso Node que atendió esta request",
  });
});

app.use((req, res) => {
  res.status(404).send("404 - Ruta no encontrada");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT} | PID: ${process.pid}`);
});