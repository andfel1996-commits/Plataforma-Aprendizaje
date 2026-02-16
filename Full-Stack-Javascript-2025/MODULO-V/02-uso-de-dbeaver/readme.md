# Chuleta de comandos — MySQL (3306) + XAMPP (3307) — macOS y Windows

## Nota importante sobre DBeaver
**DBeaver es solo un cliente.**  
Funciona **si y solo si** en tu computador (o en un servidor remoto) existe un **RDBMS/DBMS** instalado y ejecutándose (por ejemplo: MySQL, MariaDB, PostgreSQL, SQL Server, etc.).  
Si **no hay un servidor de base de datos corriendo** (o no está accesible por host/puerto/credenciales), DBeaver **no puede conectar**.

---

## Descargas oficiales (MySQL y XAMPP)

### MySQL Community Server (oficial)
- **macOS + Windows (seleccionas sistema en la misma página):**  
  https://dev.mysql.com/downloads/mysql/
- **Página general MySQL Community (alternativa):**  
  https://www.mysql.com/products/community/

### XAMPP (oficial — Apache Friends)
- **Descarga (Windows / macOS / Linux):**  
  https://www.apachefriends.org/download.html
- **Versión en español (misma descarga):**  
  https://www.apachefriends.org/es/download.html

---

## 0) Conceptos rápidos

- **3306**: normalmente es el MySQL instalado en el sistema (por ejemplo MySQL DMG en macOS, o MySQL Server en Windows).
- **3307**: recomendado para **XAMPP** para evitar choque con 3306.
- `root` es superusuario, pero **igual puede (y debe) tener contraseña**.

---

# macOS

## 1) Ver estado de puertos y procesos

### 1.1 Ver qué está escuchando en 3306 / 3307
```bash
sudo lsof -nP -iTCP:3306 -sTCP:LISTEN
sudo lsof -nP -iTCP:3307 -sTCP:LISTEN
```

### 1.2 Ver procesos mysqld activos
```bash
ps aux | grep mysqld | grep -v grep
```

---

## 2) MySQL DMG (Oracle) — puerto 3306

> Instalación típica DMG: `/usr/local/mysql/...`

### 2.1 Iniciar / detener / reiniciar
```bash
sudo /usr/local/mysql/support-files/mysql.server start
sudo /usr/local/mysql/support-files/mysql.server stop
sudo /usr/local/mysql/support-files/mysql.server restart
```

### 2.2 Probar conexión a 3306
```bash
/usr/local/mysql/bin/mysql -u root -P 3306 -p
```

---

## 3) XAMPP — puerto 3307 (recomendado)

> Rutas típicas:
> - `/Applications/XAMPP/xamppfiles/xampp`
> - o `/Applications/lampp/lampp`

### 3.1 Iniciar / detener XAMPP completo
```bash
sudo /Applications/XAMPP/xamppfiles/xampp start
sudo /Applications/XAMPP/xamppfiles/xampp stop
```

### 3.2 Iniciar / detener SOLO MySQL de XAMPP (si tu XAMPP lo soporta)
```bash
sudo /Applications/XAMPP/xamppfiles/xampp startmysql
sudo /Applications/XAMPP/xamppfiles/xampp stopmysql
```

### 3.3 Si tu ruta es `lampp`
```bash
sudo /Applications/lampp/lampp start
sudo /Applications/lampp/lampp stop
```

---

## 4) Cambiar contraseña de `root` en MySQL 3306 (macOS)

### 4.1 Caso A: recuerdas la contraseña actual
1) Entra:
```bash
/usr/local/mysql/bin/mysql -u root -P 3306 -p
```
2) Cambia la clave:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NuevaClaveFuerte_123!';
exit;
```

### 4.2 Caso B: NO recuerdas la contraseña (RESET seguro)
> Este método arranca MySQL en modo recuperación **solo local**.

1) Detén MySQL normal:
```bash
sudo /usr/local/mysql/support-files/mysql.server stop
```

2) Inicia modo recuperación (3306):
```bash
sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables --skip-networking --port=3306 &
```

3) Entra sin password:
```bash
/usr/local/mysql/bin/mysql -u root -P 3306
```

4) Resetea clave:
```sql
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NuevaClaveFuerte_123!';
exit;
```

5) Apaga modo recuperación:
```bash
sudo pkill -f mysqld_safe
sudo pkill -f mysqld
```

6) Inicia MySQL normal:
```bash
sudo /usr/local/mysql/support-files/mysql.server start
```

7) Prueba:
```bash
/usr/local/mysql/bin/mysql -u root -P 3306 -p
```

---

# Windows

## 1) Ver estado de puertos y procesos (3306 / 3307)

### 1.1 Ver si hay algo escuchando en el puerto
**CMD (símbolo del sistema) o PowerShell:**
```bat
netstat -ano | findstr :3306
netstat -ano | findstr :3307
```

- La última columna es el **PID**.
- Para ver el proceso asociado:
```bat
tasklist /FI "PID eq 1234"
```

> Tip PowerShell (opcional):
```powershell
Get-Process -Id 1234
```

---

## 2) MySQL Server (Windows) — iniciar / detener

### 2.1 Usando `services.msc` (rápido)
1) `Win + R` → escribe `services.msc`
2) Busca **MySQL** (puede llamarse `MySQL80`, `MySQL`, etc.)
3) Start / Stop / Restart

### 2.2 Por terminal (CMD como Administrador)
Primero identifica el nombre del servicio:
```bat
sc query type= service state= all | findstr /I mysql
```

Luego inicia/detén (reemplaza `MySQL80` por tu nombre real):
```bat
net start MySQL80
net stop MySQL80
```

Alternativa con `sc`:
```bat
sc start MySQL80
sc stop MySQL80
```

---

## 3) XAMPP (Windows) — iniciar / detener

### 3.1 Desde XAMPP Control Panel (recomendado)
- Inicia/Detén **Apache** y **MySQL** desde el panel.

### 3.2 Por terminal (si tu instalación lo soporta)
Ejemplos comunes:
```bat
C:\xampp\xampp_start.exe
C:\xampp\xampp_stop.exe
```

> Si no existen esos ejecutables, usa el **Control Panel**.

---

## 4) Cambiar contraseña de `root` en Windows (MySQL 3306)

> Ruta típica del cliente:
> `C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe`

### 4.1 Caso A: recuerdas la contraseña
```bat
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -P 3306 -p
```

Dentro:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NuevaClaveFuerte_123!';
exit;
```

### 4.2 Caso B: NO recuerdas la contraseña (RESET)
1) Detén el servicio:
```bat
net stop MySQL80
```

2) Inicia modo recuperación (en terminal Administrador):
```bat
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
mysqld --skip-grant-tables --skip-networking --port=3306
```

3) En otra terminal, conéctate sin password:
```bat
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
mysql -u root -P 3306
```

4) Resetea clave:
```sql
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NuevaClaveFuerte_123!';
exit;
```

5) Cierra `mysqld` con `Ctrl + C`, luego inicia normal:
```bat
net start MySQL80
```

---

## 5) Checklist “no chocar puertos” (ambos SO)

- MySQL principal: `127.0.0.1:3306`
- XAMPP: `127.0.0.1:3307`

---

## 6) (Opcional) Crear usuario dedicado para `mi_blog` (mejor que usar root)

```sql
CREATE USER 'blog_admin'@'localhost' IDENTIFIED BY 'ClaveFuerte_123!';
GRANT ALL PRIVILEGES ON mi_blog.* TO 'blog_admin'@'localhost';
FLUSH PRIVILEGES;
```
