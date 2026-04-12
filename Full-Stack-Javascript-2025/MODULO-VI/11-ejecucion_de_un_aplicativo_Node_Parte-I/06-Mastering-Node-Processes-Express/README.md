# Mastering Node Processes (Express)

Ejercicio integrador para dominar:

1) **SIGINT (Ctrl + C)**: capturar la señal para cierre limpio  
2) **Foreground vs Background**: `&` + `jobs` + `fg` (control manual)  
3) **Gestión Pro**: **PM2** (control del proceso sin depender de la terminal)

> Una sola narrativa: **control manual → control profesional**.

---

## 0) Requisitos

- Node.js (ideal: **18+ / 20+**)
- NPM
- Terminal:
  - **macOS/Linux**: zsh/bash
  - **Windows**:
    - Para `&`, `jobs`, `fg` usa **Git Bash** o **WSL** (porque son comandos del shell tipo Unix).
    - Para encontrar PID por puerto y matar procesos en Windows nativo, usaremos **PowerShell**.

---

## 1) Descargar y preparar el proyecto

### Opción A (recomendada): usar el ZIP del profe
1. Descomprime el ZIP en una carpeta, por ejemplo: `Mastering-Node-Processes-Express`
2. Entra a la carpeta desde la terminal:
   ```bash
   cd Mastering-Node-Processes-Express
   ```
3. Instala dependencias:
   ```bash
   npm install
   ```

### Opción B: crearlo desde cero (por si quieres replicar)
1. Crea carpeta:
   ```bash
   mkdir Mastering-Node-Processes-Express
   cd Mastering-Node-Processes-Express
   ```
2. Crea `package.json`:
   ```bash
   npm init -y
   ```
3. Instala Express:
   ```bash
   npm i express
   ```
4. En `package.json`, agrega:
   - `"type": "module"`
   - script `"start": "node app.js"`
5. Crea `app.js` con el código del ejercicio.

---

## 2) Parte A — Foreground + SIGINT (Ctrl + C)

### 2.1 Ejecutar en foreground (primer plano)

```bash
npm start
# o: node app.js
```

**Evidencia esperada (logs):**
- URL del server: `http://127.0.0.1:3000`
- **PID del proceso Node**
- Cada ~3s:
  - `Heartbeat: proceso vivo | pid=...`

### 2.2 Probar el servidor

En otra terminal (o en el navegador):

```bash
curl http://127.0.0.1:3000/health
```

**Evidencia esperada (JSON):**
- `ok: true`
- `pid` igual al mostrado en consola

### 2.3 Probar SIGINT (Ctrl + C)

Vuelve a la terminal donde corre Node y presiona:

- **Ctrl + C**

**Evidencia esperada:**
- `Señal recibida: SIGINT. Iniciando cierre limpio...`
- `Servidor HTTP cerrado correctamente...`
- Vuelves a tener el prompt (el proceso terminó).

---

## 3) Parte B — Background (`&`) + `jobs` (control manual)

> Esta sección es para **bash/zsh** (macOS/Linux) o **Git Bash/WSL** (Windows).

### 3.1 Ejecutar en background

```bash
node app.js &
```

**Qué significa `&`:**
- Es del **shell** (no de Node).
- Le dice al shell: “ejecuta en background y devuélveme el control de la terminal”.

**Evidencia esperada:**
- Algo como:
  - `[1] 12345`
  Donde **12345** es el PID.

### 3.2 Listar jobs y ver PID

```bash
jobs -l
```

**Para qué sirve `jobs`:**
- Lista procesos que el **shell actual** está gestionando como “jobs”.
- `-l` muestra el **PID** (clave para el flujo de trabajo).

**Evidencia esperada:**
- Línea tipo:
  - `[1]  +  12345 running  node app.js`

### 3.3 Detenerlo (2 formas, en orden)

#### Forma 1 (didáctica): traer a foreground y Ctrl+C

```bash
fg %1
```

Ahora presiona **Ctrl + C**.

**Evidencia esperada:**
- Logs de SIGINT y cierre limpio.

#### Forma 2: enviar SIGINT al PID (sin fg)

1) Obtén el PID con `jobs -l`  
2) Envía SIGINT:

```bash
kill -SIGINT <PID>
```

**Evidencia esperada:**
- `Señal recibida: SIGINT...`
- `Servidor HTTP cerrado...`

> Tip: también puedes matar por job:  
> `kill -SIGINT %1`

---

## 4) Parte C — Encontrar PID y matar procesos (macOS y Windows)

### 4.1 macOS / Linux (Terminal)

**Encontrar PID por puerto (recomendado):**
```bash
lsof -iTCP:3000 -sTCP:LISTEN -n -P
```

**Detener con SIGINT (similar a Ctrl+C):**
```bash
kill -SIGINT <PID>
```

**Detener con SIGTERM (común en servidores):**
```bash
kill -SIGTERM <PID>
```

**Forzar (último recurso):**
```bash
kill -9 <PID>
```

---

### 4.2 Windows (PowerShell)

**Encontrar PID por puerto 3000:**
```powershell
netstat -ano | findstr :3000
```

**Detener proceso por PID:**
```powershell
taskkill /PID <PID> /F
```

> Nota:
> - En Windows nativo, `taskkill` termina el proceso (no es exactamente SIGINT).
> - El objetivo aquí es: **encontrar PID y detener el proceso**.

---

## 5) Parte D — Gestión Pro con PM2

PM2 te permite:
- mantener la app en background **sin usar `&`**
- ver estado y logs
- stop/restart con comandos consistentes

### 5.1 Instalar PM2 (una vez)

```bash
npm i -g pm2
```

### 5.2 Iniciar la app con PM2

```bash
pm2 start app.js --name mastering-node-processes
pm2 list
```

**Evidencia esperada:**
- `pm2 list` muestra el proceso “online”
- para ver el PID `pm2 pid mastering-node-processes`

### 5.3 Ver logs

```bash
pm2 logs mastering-node-processes --lines 50
```

### 5.4 Stop / restart / delete

```bash
pm2 stop mastering-node-processes
pm2 restart mastering-node-processes
pm2 delete mastering-node-processes
```

**Punto clave para cerrar la confusión:**
- Con PM2, **Ctrl + C ya NO controla el proceso**, porque el proceso no está pegado a tu terminal.
- El control correcto es `pm2 stop/restart/delete`.

---

## 6) Checklist de evidencia (para entregar)

- [ ] Vi el **PID** al iniciar en foreground
- [ ] `curl /health` devolvió JSON con el mismo PID
- [ ] Ctrl + C mostró logs de **SIGINT** y cierre limpio
- [ ] Corrí con `&` y confirmé con `jobs -l`
- [ ] Detuve el proceso con `fg` + Ctrl+C **o** con `kill -SIGINT`
- [ ] En PM2 vi el proceso con `pm2 list` y revisé `pm2 logs`
- [ ] Detuve la app con `pm2 stop` (sin Ctrl + C)

---

## 7) Idea final (en una frase)

- **SIGINT** es una señal (Ctrl+C) que tu proceso puede capturar para apagar limpio.
- `&` y `jobs` son control manual del **shell**.
- **PM2** abstrae y profesionaliza la gestión del proceso.
