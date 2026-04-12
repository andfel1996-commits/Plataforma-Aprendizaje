import multer from "multer";
import { fileURLToPath } from 'url';
import path, { dirname }       from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// Destino y nombre del archivo
const storage = multer.diskStorage({
    destination:(_req, _file, cb ) => {
        // public/assets/img/publicaciones/
        cb(null,path.join(__dirname, '../public/assets/img/publicaciones'));

    },

    filename : (req, file, cb) => {
        // Nombre único: timestamp + número aleatorio + extensión original
        // Ejemplo: 1741872000000-482931047.jpg
        const ext = path.extname(file.originalname).toLocaleLowerCase();
        const nombre = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, nombre)
    }
})

// Filtro : sólo imagenes
const fileFilter = (_req, file, cb) => {
      const tiposPermitidos = /jpeg|jpg|png|gif|webp/;
    const esValido = tiposPermitidos.test(path.extname(file.originalname).toLowerCase())
                  && tiposPermitidos.test(file.mimetype);

    if (esValido) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif, webp).'));
    }

}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }  // máximo 5 MB
});

export default upload;