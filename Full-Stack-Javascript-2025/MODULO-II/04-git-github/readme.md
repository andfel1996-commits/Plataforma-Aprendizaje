# Git + GitHub — Apuntes (Terminal + Flujo básico) 🚀
> **En este curso usaremos principalmente “Git Bash” en Windows.**  
> Git = control de versiones en tu computador. GitHub = plataforma para alojar repos y colaborar.

---

## Contenidos
1. [1) Abrir terminal correctamente (Windows)](#1-abrir-terminal-correctamente-windows)
2. [2) Movernos en la terminal (comandos básicos)](#2-movernos-en-la-terminal-comandos-básicos)
3. [3) Archivos y carpetas (crear/copiar/borrar)](#3-archivos-y-carpetas-crearcopiarborrar)
4. [4) Instalar Git](#4-instalar-git)
5. [5) Configurar Git (nombre + email)](#5-configurar-git-nombre--email)
6. [6) Flujo Git (init → add → commit)](#6-flujo-git-init--add--commit)
7. [7) Conectar repo con GitHub (SSH) — paso a paso (Windows)](#7-conectar-repo-con-github-ssh--paso-a-paso-windows)
8. [8) Trabajar con ramas (branch/checkout/merge)](#8-trabajar-con-ramas-branchcheckoutmerge)
9. [9) Comandos útiles (log, reflog, status)](#9-comandos-útiles-log-reflog-status)
10. [10) Tags (versionado)](#10-tags-versionado)
11. [11) Stash (guardar cambios sin commit)](#11-stash-guardar-cambios-sin-commit)
12. [12) ⚠️ Comandos peligrosos (con cuidado)](#12-️-comandos-peligrosos-con-cuidado)

---

## 1) Abrir terminal correctamente (Windows)
🗣️ **Qué decir en voz alta:**  
“En Windows NO usamos el CMD para el curso: usamos **Git Bash** porque trae comandos tipo Linux y funciona perfecto con Git.”

**Pasos:**
1. Instala Git for Windows.
2. Abre el menú inicio → busca **Git Bash** → abrir. 

---

## 2) Movernos en la terminal (comandos básicos)
   
“Antes de Git, necesito saber dónde estoy parado y cómo moverme. Si no sé mi carpeta, voy a commitear en cualquier lado.”

**Dónde estoy**
```bash
pwd
```

**Listar lo que hay en la carpeta actual**
```bash
ls
ls -a      # incluye ocultos
ls -la     # lista detallada + ocultos
```

**Moverme entre carpetas**
```bash
cd nombre_carpeta      # entra a una carpeta
cd ..                  # vuelve a la carpeta “padre”
cd ~                   # va al HOME del usuario
cd /                   # raíz (en Git Bash de Windows verás /c/, /d/, etc.)
```

**Ejemplos (Windows Git Bash)**
```bash
cd /c/Users/TU_USUARIO/Desktop
cd /c/Users/TU_USUARIO/Documents
```

---

## 3) Archivos y carpetas (crear/copiar/borrar)
   
“Estos comandos no son Git, pero los uso todo el tiempo para preparar proyectos.”

**Crear carpeta**
```bash
mkdir proyecto1
```

**Crear archivo vacío**
```bash
touch index.html
```

**Copiar archivo**
```bash
cp index.html proyecto1/index.html
cp index.html proyecto1/index2.html
```

**Copiar carpeta (recursivo)**
```bash
cp -r assets proyecto1
```

**Borrar archivo o carpeta (⚠️ no va a la papelera)**
```bash
rm archivo.txt
rm -r carpeta
```

> ⚠️ Evita comandos “agresivos” tipo `rm .*` (puedes borrar configuraciones importantes).

---

## 4) Instalar Git
### Windows (recomendado)
1. Descargar e instalar **Git for Windows** desde git-scm.
2. Durante la instalación, deja las opciones por defecto.
3. Luego abre **Git Bash**. 

### macOS (si alguien usa Mac)
- Con Homebrew:
```bash
brew install git
```

**Ver versión instalada**
```bash
git --version
```

---

## 5) Configurar Git (nombre + email)
   
“Esto NO es usuario/contraseña: es la identidad que queda grabada en cada commit.”

### 1) Git Bash (Windows)
1. Abre Git Bash
2. Ejecuta:

```bash
    git config --global user.name "Tu Nombre Apellido"
    git config --global user.email "tucorreo@dominio.com"
```
3. Verifica:
```bash
    git config --global --list
    # o solo:
    git config --global user.name
    git config --global user.email

```

### 2) PowerShell (Windows)
1. Abre PowerShell (o Windows Terminal)
2. Ejecuta:

```bash
    git config --global user.name "Tu Nombre Apellido"
    git config --global user.email "tucorreo@dominio.com"
```
3. Verifica:
```bash
    git config --global --list
    git config --global user.name
    git config --global user.email

```
### 3) MAC
**Config global (una vez)**
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu_correo@dominio.com"
```


**Confirmar**
```bash
git config --list
git config --global user.name
git config --global user.email
```


**(Opcional recomendado) Definir rama por defecto como `main`**
```bash
git config --global init.defaultBranch main
```

### Ver dónde quedó guardado

Windows (Git Bash/PowerShell):
C:\Users\TU_USUARIO\.gitconfig

macOS:
/Users/TU_USUARIO/.gitconfig

Si te equivocaste y quieres borrar un valor

```bash
    git config --global --unset user.name
    git config --global --unset user.email

```

---

## 6) Flujo Git (init → add → commit)
   
“Git funciona como una cámara de fotos: saco ‘fotos’ (commits) de mi proyecto para poder volver atrás.”

### Paso 1: iniciar repo
```bash
cd /c/Users/TU_USUARIO/Desktop/mi_proyecto
git init
```

### Paso 2: ver estado
```bash
git status
```

### Paso 3: agregar cambios (staging)
```bash
git add .
```

### Paso 4: crear commit
```bash
git commit -m "Mi primer commit"
```

### Paso 5: nuevo cambio → nuevo commit
```bash
git add .
git commit -m "Segundo commit"
```

**Ver historial**
```bash
git log
```

---

## 7) Conectar repo con GitHub (SSH) — paso a paso (Windows)
   
“SSH es como una llave: en vez de usuario/clave, uso una llave pública en GitHub y una llave privada en mi PC.”

### 7.1 Generar la clave (recomendado: ed25519)
En **Git Bash**:
```bash
ssh-keygen -t ed25519 -C "tu_correo@dominio.com"
```

- Cuando pregunte **dónde guardar**, presiona **Enter**.
- Cuando pregunte passphrase: puedes poner una o dejar vacío (para principiantes, vacío es más simple). 

> Si tu sistema no soporta ed25519 (raro), usa RSA 4096: 
```bash
ssh-keygen -t rsa -b 4096 -C "tu_correo@dominio.com"
```

### 7.2 Iniciar ssh-agent y agregar la llave
En **Git Bash**:
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

**Si ssh-agent da problemas (alternativa PowerShell admin):**
1. Abre PowerShell como Administrador y ejecuta:
```powershell
Get-Service -Name ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent
```
2. Luego vuelve a Git Bash y ejecuta:
```bash
ssh-add /c/Users/TU_USUARIO/.ssh/id_ed25519
```

### 7.3 Copiar la llave pública al portapapeles
En **Git Bash (Windows)**:
```bash
clip < ~/.ssh/id_ed25519.pub
```

### 7.4 Pegar en GitHub
1. GitHub → tu foto (arriba derecha) → **Settings**
2. Menú izquierdo → **SSH and GPG keys**
3. **New SSH key**
4. Pegar la clave
5. **Add SSH key** citeturn0search2

### 7.5 Probar conexión
```bash
ssh -T git@github.com
```

Si todo está bien, verás un mensaje tipo “Hi USERNAME…”.

---

## 8) Trabajar con ramas (branch/checkout/merge)
   
“Una rama es una línea de tiempo paralela. Creo una rama para trabajar sin romper `main`.”

**Ver ramas**
```bash
git branch
```

**Crear rama**
```bash
git branch feature-login
```

**Cambiarme a la rama**
```bash
git checkout feature-login
```

**(Alternativa moderna) crear + cambiar**
```bash
git checkout -b feature-login
```

**Volver a main**
```bash
git checkout main
```

**Fusionar (merge)**
> Recuerda: **te paras en la rama que RECIBE los cambios**.
```bash
git checkout main
git merge feature-login
```

---

## 9) Comandos útiles (log, reflog, status)
```bash
git status
git log
git reflog
```

   
- `status`: “qué cambió”  
- `log`: “historia”  
- `reflog`: “historia más completa (rescates)”

---

## 10) Tags (versionado)
   
“Un tag es como poner un ‘post-it’ en un commit: versión v1.0, v1.1…”

**Tag anotado (recomendado)**
```bash
git tag -a v1.0 -m "Primera versión estable"
```

**Tag anotado en un commit específico**
```bash
git tag -a v1.0 -m "Primera versión estable" <HASH>
```

**Subir un tag**
```bash
git push origin v1.0
```

---

## 11) Stash (guardar cambios sin commit)
   
“Stash es ‘guardar en el bolsillo’ cambios incompletos para poder cambiar de rama sin ensuciar.”

**Guardar**
```bash
git stash
```

**Ver stashes**
```bash
git stash list
```

**Recuperar**
```bash
git stash apply
```

---

## 12) ⚠️ Comandos peligrosos (con cuidado)
   
“Estos comandos existen, pero en equipo pueden causar problemas. Los uso solo cuando entiendo el impacto.”

**Modificar el último commit (solo si NO lo has compartido)**
```bash
git commit --amend -m "Nuevo mensaje"
```

**Force push (evitar en ramas compartidas)**
```bash
git push -f
```

**Forzar local a quedar igual que remoto (BORRA cambios locales)**
```bash
git fetch --all
git reset --hard origin/main
```

**Eliminar Git del proyecto (borra historial)**
```bash
rm -rf .git
```

# Clase 2 Git y Github

## Dinámica Clase: FETCH vs PULL + Pull Request (PR) usando el repo `html-rock-demo` 🎸🚀

> Repo a usar (cópialo tal cual):  
```bash
    https://github.com/abecerraguz/html-rock-demo
```

## Objetivo (qué vamos a lograr hoy)

Al final de la dinámica, cada estudiante podrá:

- Diferenciar FETCH (traer sin mezclar) vs PULL (traer + mezclar).
- Trabajar con ramas en Git.
- Crear un Pull Request en GitHub y fusionarlo (merge) a main.
- Quedar sincronizado local ↔ remoto.

## Reglas del ejercicio (modo “equipo real”)

NO se trabaja directo en main para nuevas mejoras → siempre rama feature-*.
main solo recibe cambios por Pull Request.
Commits cortos y claros (mínimo 2).

## Parte 0 — Preparación (2–3 min)
### 0.1 Clonar el repo

```bash
    cd /c/Users/TU_USUARIO/Desktop
    git clone https://github.com/abecerraguz/html-rock-demo
    cd html-rock-demo
```

### 0.2 Chequeo rápido de “salud”

```bash 
    git status
    git remote -v
    git branch
```
✅ Importante: revisa cómo se llama la rama principal (debería ser main).
Si no estás seguro:

```bash
    git branch -a
```

# Parte 1 — PR (rama → commits → push rama → PR) (10–15 min)
🎯 Meta: preparar una mejora y subirla como rama para crear Pull Request después.

## 1.1 Crear una rama de trabajo
```bash
    git checkout -b feature-readme-rock
```

## 1.2 Crear un archivo nuevo para la práctica (no rompemos nada del proyecto)
Crea un archivo Markdown dentro del repo:
```bash
    touch PRACTICA-GIT.md
```
Abre PRACTICA-GIT.md y pega esto:

```bash
    # Práctica Git & GitHub 🎸
    ## Integrante
    - Nombre: TU_NOMBRE

    ## Lo que aprendí hoy
    - Fetch trae cambios pero no los mezcla
    - Pull trae y mezcla en mi rama actual
    - PR es la forma “correcta” de integrar cambios a main
```

## 1.3 Commit 1 (incremental)
```bash
    git add PRACTICA-GIT.md
    git commit -m "Agrego archivo PRACTICA-GIT.md"
```

## 1.4 Modificar README (o cualquier archivo que ya exista)
Edita el README.md y agrega una sección simple, por ejemplo:
```bash
    ## Práctica de colaboración
    Este repo se usó para practicar fetch, pull y pull request.
```
## 1.5 Commit 2
```bash
    git add README.md
    git commit -m "Actualizo README con sección de práctica"
```

## 1.6 Subir tu rama al remoto
```bash
    git push -u origin feature-readme-rock
```
✅ Check:

```bash
    git log --oneline -n 5
```

# Parte 2 — Simulación de “equipo” para practicar FETCH y PULL (5 min)

Hacemos un cambio desde GitHub web (solo para simular colaboración).

🎯 Resultado esperado: GitHub tiene un commit nuevo en main que tu PC todavía NO tiene.

# Parte 3 — FETCH (traer SIN mezclar) ✅ (5–8 min)

### 3.1 Qué comando uso y por qué
🟦 Uso git fetch cuando quiero:

Traer cambios del remoto…

…pero sin tocar mi rama actual ni mis archivos (todavía).

Poder revisar antes de integrar.

### 3.2 Ejecutar fetch
Puedes hacerlo desde cualquier rama, pero es más claro si lo haces desde tu rama feature:

```bash
    git status
    git fetch origin
```

### 3.3 Ver qué llegó SIN mezclar
```bash
    git log --oneline --decorate --graph --all -n 15
```

📌 Qué debes mirar:

- Tu rama local: feature-readme-rock
- Tu main local
- El remoto: origin/main (aquí está el cambio nuevo)

Comparar main local vs main remoto:

```bash
    git diff main..origin/main
```

✅ Hasta aquí:
- Trajiste cambios del remoto ✅
- NO mezclaste nada ✅
- Tu carpeta NO cambió ✅

# Parte 4 — PULL (traer + mezclar) ✅ (5–8 min)
### 4.1 Qué comando uso y por qué

🟨 Uso git pull cuando quiero:
- Traer cambios del remoto…
- …y aplicarlos en mi rama actual altiro (merge automático).
- Actualizar mi main local para estar al día.

### 4.2 Ir a main y hacer pull
```bash
    git checkout main
    git pull origin main
```
✅ Check:

```bash
    git log --oneline -n 5
    git status
```
Si te equivocas de rama: recuerda que pull actualiza la rama en la que estás parado.

# Parte 5 — Crear Pull Request (PR) en GitHub ✅ (8–12 min)
🎯 Meta: integrar tu trabajo (feature-readme-rock) a main de forma correcta.

### 5.1 Volver a tu rama feature
```bash
    git checkout feature-readme-rock
```
### 5.2 (Recomendado) Traer los últimos cambios de main hacia tu rama feature

Esto evita sorpresas en el PR.
```bash
    git merge main
```

Si aparece conflicto, lo resuelves editando el archivo, luego:

```bash 
    git add .
    git commit -m "Resuelvo conflictos al integrar main"
```

### 5.3 Crear PR en GitHub
En GitHub (web):
1. Ve al repo
2. Deberías ver “Compare & pull request” (si no, ve a Pull requests → New pull request)
3. Base: main ← Compare: feature-readme-rock
4. Título: Agrego práctica y mejoras al README
5. Descripción (ejemplo):
    - Agrego PRACTICA-GIT.md
    - Agrego sección de práctica en README
6. Clic Create pull request

## 5.4 Merge del PR
En la pantalla del PR:
- Clic Merge pull request
- Confirmar merge

# Parte 6 — Sincronizar tu local después del merge ✅ (2–3 min)
Ahora tu repo local debe quedar igual al remoto.
```bash
git checkout main
git pull origin main
```

✅ Check final:
```bash
git log --oneline -n 10
git status
```

¿Cuándo uso cada uno? (resumen para alumnos)
✅ git fetch
- “Traigo cambios del remoto, pero no los aplico todavía.”
- Lo uso cuando quiero revisar antes de mezclar.
- Perfecto para equipos.

✅ git pull
- “Traigo cambios del remoto y los mezclo en mi rama actual.”
- Lo uso para actualizarme rápido (por ejemplo al comenzar a trabajar).

✅ Pull Request (PR)

“Propongo cambios desde una rama y los integro a main con revisión.”
Es el flujo profesional: rama → PR → merge.

Checklist de aprobación (rápido)

 - Cloné el repo html-rock-demo
 - Creé una rama feature-*
 - Hice mínimo 2 commits
 - Subí mi rama con git push -u origin feature-*
 - Simulé un cambio remoto en main
 - Usé git fetch y vi origin/main actualizado sin mezclar
 - Usé git pull en main y actualicé mi repo local
 - Creé un PR y lo mergeé a main
 - Hice git pull final en main

Errores típicos (soluciones rápidas)

“src refspec main does not match any”

No hay commits aún en esa rama:
```bash
git add .
git commit -m "Primer commit"
git push -u origin main
```

“remote origin already exists”
```bash
git remote -v
git remote remove origin
git remote add origin https://github.com/abecerraguz/html-rock-demo
```

“Estoy en la rama equivocada”
```bash
git branch
git checkout main
```

Extra (opcional): Ver diferencias con comando visual
```bash
git log --oneline --decorate --graph --all -n 20
```