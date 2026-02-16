# OMDb API — Parámetros

Este documento resume los **parámetros** principales de la documentación de **OMDb API**, tal como en la tabla de “Parameters”.
La API se usa principalmente de 2 formas:

1) **By ID or Title** → traer el **detalle de 1 película/serie/episodio**  
2) **By Search** → traer una **lista de resultados** por texto (con paginación)

---

## 1) By ID or Title (Detalle de 1 resultado)

Se usa cuando quieres información completa de **un solo título** (no una lista).

### `i` — IMDb ID (opcional*)
- Busca por el **ID único de IMDb**.
- Ejemplo de ID: `tt0372784`
- Uso:
  ```txt
  https://www.omdbapi.com/?apikey=TU_APIKEY&i=tt0372784
  ```

### `t` — Title (opcional*)
- Busca por **título**.
- Si el título tiene espacios, se recomienda codificarlo (URL-encode).
- Uso:
  ```txt
  https://www.omdbapi.com/?apikey=TU_APIKEY&t=Batman%20Begins
  ```

> ⚠️ Nota importante de la doc: aunque `i` y `t` aparezcan como “optional”, **debes enviar al menos uno** (o `i` o `t`).  
> Si no envías ninguno, la API no sabe qué buscar.

### `type` — Tipo de resultado (opcional)
Filtra el tipo:
- `movie` (película)
- `series` (serie)
- `episode` (episodio)

Ejemplo:
```txt
https://www.omdbapi.com/?apikey=TU_APIKEY&t=Batman&type=movie
```

### `y` — Year (opcional)
Filtra por año de estreno.
```txt
https://www.omdbapi.com/?apikey=TU_APIKEY&t=Batman&y=1989
```

### `plot` — Resumen (opcional)
Define el largo del resumen:
- `short` (por defecto)
- `full` (más completo)

Ejemplo:
```txt
https://www.omdbapi.com/?apikey=TU_APIKEY&i=tt0372784&plot=full
```

### `r` — Formato de respuesta (opcional)
- `json` (por defecto)
- `xml`

Ejemplo:
```txt
https://www.omdbapi.com/?apikey=TU_APIKEY&i=tt0372784&r=json
```

### `callback` — JSONP (opcional)
Parámetro para JSONP (técnica antigua).
En apps modernas con `fetch`, normalmente **no se usa**.

Ejemplo:
```txt
https://www.omdbapi.com/?apikey=TU_APIKEY&i=tt0372784&callback=miFuncion
```

### `v` — Versión (opcional)
Versión de la API (en la doc aparece “reserved for future use”).
Normalmente no se toca.

---

## 2) By Search (Búsqueda de lista)

Se usa cuando quieres una **lista de resultados** (por ejemplo, para mostrar cards).

### `s` — Search (REQUERIDO)
Texto de búsqueda. Devuelve un arreglo en `Search: [ ... ]`.

Ejemplo:
```txt
https://www.omdbapi.com/?apikey=TU_APIKEY&s=Queen
```

### `page` — Página (opcional, pero clave)
Paginación del listado (rango 1–100 según la doc).
Por defecto es 1.

Ejemplo:
```txt
https://www.omdbapi.com/?apikey=TU_APIKEY&s=Queen&page=1
https://www.omdbapi.com/?apikey=TU_APIKEY&s=Queen&page=2
```

> ✅ En tu proyecto:
> - Botón **Cargar Más** = `page++`
> - **Infinite scroll** = `page++` cuando llegas al final

### `type` — Tipo (opcional)
Filtra lista por:
- `movie`, `series`, `episode`

Ejemplo:
```txt
https://www.omdbapi.com/?apikey=TU_APIKEY&s=Queen&type=movie
```

### `y` — Year (opcional)
Filtra resultados por año.
```txt
https://www.omdbapi.com/?apikey=TU_APIKEY&s=Queen&y=2018
```

### `r`, `callback`, `v`
Se comportan igual que en “By ID or Title”:
- `r`: `json` / `xml`
- `callback`: JSONP (antiguo)
- `v`: versión (normalmente no se usa)

---

## Chuleta rápida (para clase)

### ✅ LISTADO (cards)
- Parámetros principales: `s` y `page`

Ejemplo:
```txt
?apikey=TU_APIKEY&s=batman&page=1
```

### ✅ DETALLE (modal)
- Parámetros principales: `i` (o `t`) y opcional `plot=full`

Ejemplo:
```txt
?apikey=TU_APIKEY&i=tt0372784&plot=full
```

---

## Ejemplos típicos (resumen)

### 1) Buscar lista por texto
```txt
https://www.omdbapi.com/?apikey=TU_APIKEY&s=queen&page=1
```

### 2) Traer detalle por IMDb ID
```txt
https://www.omdbapi.com/?apikey=TU_APIKEY&i=tt0372784&plot=full
```
