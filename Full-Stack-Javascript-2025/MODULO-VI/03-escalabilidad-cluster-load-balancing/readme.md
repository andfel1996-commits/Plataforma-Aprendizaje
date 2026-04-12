# Demo: Escalabilidad en Node/Express (PM2 Cluster + NGINX como concepto)

- **El servidor Node/Express se programa normal** (rutas + 404).  
- La escalabilidad (cuando el proyecto “cae en el 10%”) se demuestra con **PM2** (cluster) y se explica **NGINX** como “puerta de entrada” (reverse proxy / balanceador).

---

## Objetivo pedagógico (regla 90/10)

- **90% de los casos (local / aprendizaje / proyectos chicos):**  
  ✅ `node server.js` (un proceso)

- **10% de los casos (producción / más carga / varios cores):**  
  ✅ `PM2` levanta **varios procesos** (cluster) sin cambiar el código  
  ✅ `NGINX` se usa como **puerta de entrada** (HTTPS + proxy) y, si hay muchas instancias, reparte tráfico

---

## Requisitos

- Node.js instalado
- Proyecto con `"type": "module"` en `package.json` (para usar `import ... from ...`)
- (Para la demo de producción) PM2 instalado: `npm i -g pm2`

---

## Estructura mínima

```
tu-proyecto/
  server.js
  package.json
```

---

## Código: `server.js` (normal, sin cluster en código)

Crea un archivo `server.js` con esto:

```js
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
```

---

## Parte A — Demo del 90% (modo normal: 1 proceso)

### 1) Ejecuta el servidor
```bash
node server.js
```

### 2) Prueba en el navegador
- http://localhost:3000/health
- http://localhost:3000/info

✅ Verás **siempre el mismo `pid`** (porque es 1 proceso).

### 3) Prueba recomendada con terminal (más confiable que el navegador)
```bash
curl http://localhost:3000/info
curl http://localhost:3000/info
curl http://localhost:3000/info
```

---

## ¿Qué es PM2? (explicación simple)

PM2 es un **administrador de procesos (process manager) para Node.js**.  
No es un framework web (como Express): es una herramienta para **ejecutar tu app en producción** de forma más estable.

PM2 te ayuda principalmente a:

- **Mantener tu app “viva”**: si el proceso se cae, PM2 puede **reiniciarlo**.
- **Levantar varias copias (cluster)** sin tocar el código: con `-i max` creas **un proceso por core** (aprox.).
- **Ver y gestionar logs** sin depender de una terminal abierta.
- **Arrancar tu app automáticamente** cuando se reinicia el servidor (con `pm2 startup` + `pm2 save`).

Analogía rápida:
- **Node/Express** = “la app” (el cocinero).
- **PM2** = “el jefe de turno” que lo mantiene trabajando, lo reinicia si se cae y puede contratar varios cocineros (cluster).

---

## Parte B — Demo del 10% (modo producción: PM2 Cluster)

> Idea clave: **no cambiamos el código**. Cambiamos **cómo ejecutamos** el server.

### 1) Instala PM2 (si no lo tienes)
```bash
npm i -g pm2
```

### 2) Levanta el server en modo cluster (un proceso por core)
```bash
pm2 start server.js --name miapp -i max
```

### 2.1) Levantar PM2 en 1 proceso (modo normal)
```bash
pm2 start server.js --name miapp
```
Eso deja 1 proceso.



### 3) Verifica procesos
```bash
pm2 list
```

### 4) Prueba el endpoint `/info` varias veces
```bash
curl http://localhost:3000/info
curl http://localhost:3000/info
curl http://localhost:3000/info
```

✅ Si ves **PIDs distintos**, significa que **distintos procesos** (workers) atendieron las requests.

> Nota: el navegador puede “pegarse” a un proceso por keep-alive.  
> Para demo, usa `curl`.

---

## ¿Qué hace PM2 realmente?

- PM2 es un **administrador de procesos** para Node.
- En cluster mode (`-i max`) levanta **varias copias** de tu server (varios procesos).
- PM2 puede **reiniciar** procesos si se caen y ayudarte con **logs** y control del servicio.

Comandos útiles:
```bash
pm2 logs miapp
pm2 restart miapp
pm2 stop miapp
pm2 delete miapp
```

---

## ¿Dónde entra NGINX? (sin configurarlo en clase)

NGINX se usa en producción como “la puerta de entrada”:

- Recibe tráfico en **80/443** (HTTP/HTTPS)
- Maneja HTTPS/certificados, seguridad, compresión, etc.
- **Reenvía** las requests a tu Node (por ejemplo, a `127.0.0.1:3000`)
- Si hay **varias instancias/servidores**, puede **repartir** tráfico (load balancing)

### Diagrama mental (1 servidor)
```txt
Cliente (Internet)
   |
   v
NGINX (80/443)  -> HTTPS + proxy
   |
   v
PM2 (cluster)   -> varios procesos Node
   |
   +--> Node PID 1111 (Express)
   +--> Node PID 2222 (Express)
   +--> Node PID 3333 (Express)
```

### Diagrama mental (varios servidores)
```txt
Cliente
  |
  v
Load Balancer (NGINX/Cloud)
  |----> Servidor A (NGINX -> PM2 -> Node workers)
  |----> Servidor B (NGINX -> PM2 -> Node workers)
  +----> Servidor C (NGINX -> PM2 -> Node workers)
```

---

## Preguntas típicas (FAQ)

### “¿Tengo que programar `cluster` en mi `server.js`?”
No es necesario. En la vida real, es común usar **PM2** para cluster sin tocar el código.

### “¿Por qué no implementamos NGINX en local?”
Porque el objetivo es entender el **concepto** sin montar infraestructura.  
En producción, NGINX vive en el servidor como configuración de sistema.

### “¿Qué cambia en mi app cuando hay varias instancias?”
Lo importante es no depender de **memoria local** para “guardar estado” (sesiones en RAM, contadores globales, archivos solo en disco local, etc.).  
En proyectos reales eso se resuelve con DB/Redis/Storage.

---

## Cierre

> “El server se programa normal. Si crece el tráfico, PM2 lo multiplica (cluster) y NGINX actúa como puerta de entrada y, si hace falta, reparte el tráfico.”
