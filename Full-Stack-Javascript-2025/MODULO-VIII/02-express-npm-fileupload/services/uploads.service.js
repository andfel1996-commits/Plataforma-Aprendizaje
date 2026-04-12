// importar el módulo de sistema de archivos para leer, crear, eliminar archivo y crapetas FS
import fs from 'fs';
// Importa utilidades para construir las rutas
import path from 'path';
import { fileURLToPath } from 'url';
import { ApiError } from '../utils/ApiError.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construir la ruta absoluta hacia la carpeta uploads ubicada en la raiz del proyecto
const uploadsDir = path.join(path.dirname(__dirname), 'uploads')

// Si no existe el directorio se crea
if(!fs.existsSync(uploadsDir)){
    // Si no existe crwamos la carpeta 
    fs.mkdirSync(uploadsDir, { recursive:true })
}

// Vamos a crear el servicio encargado de validar y guardar un archivo recibido desde el controlador
export const uploadFileService = async ( file ) => {
    try {

        // Si no llega el archivo , se detiene el proceso con un error 400
        if(!file){
            throw new ApiError( 400, 'No se ha enviado el archivo');
        }   
        
        // Definimos las extensiones permitidas para la aplicación
        const allowedExtensions = [
            '.pdf',
            '.doc',
            '.txt',
            '.xls',
            '.xlsx',
            '.jpg',
            '.jpeg',
            '.png',
            '.gif'
        ];

        // Vamos a obtener la extensión del archivo recibido y la vamos a normalizar en minusculas
        const fileExtension = path.extname(file.name).toLowerCase();

        // Si la extensión no está permitida , lanza un error 400 con el detalle
        if(!allowedExtensions.includes(fileExtension)){
            throw new ApiError(
                400,
                `Tipo de archivo no permitido, Permitidos ${allowedExtensions.join(', ')}`
            )
        }

        // Generar nombre único para el archivo
        // usa la fecha actual en milisegundos como parte del identificador único
        const timestamp = Date.now();
        // Se genera un sufijo aleatorio corto para reducir colisiones de nombre
        const randomSuffix = Math.random().toString(36).substring(7);
        //componemos el nombre final que se guardará en el disco
        const fileName = `${timestamp}-${randomSuffix}-${file.name}`;
        // Construimos la ruta absoluta de destino donde se moverá el archivo
        const uploadPath = path.join( uploadsDir , fileName );

        // Movemos el archivo
        await file.mv( uploadPath )

        // Retornamos los metadatados del archivo almacendo
        return {
            id: timestamp,
            filename : file.name,
            // Expone el nombre original del archivo que fue cargado
            storeFilename : fileName,
            // Informa el tamaño del archivo en bytes
            size : file.size,
            // registra la fecha de cuando fue el momento de subida
            mimetype: file.mimetype,
            uploadedAt: new Date().toISOString(),
            // Devuelve la ruta pública desde la que el archivo puede servirse
            path: `/uploads/${fileName}`
        }

    } catch (error) {
        // Reenvía cualquier error al controlador para que lo maneje el middleware global
        throw error;
    }
}

// Sevicio encargado de listar los archivos guardados en la carpeta uploads
export const listFilesService = async () => {

    try {
        // Si la carpeta uploads no existe retorna una lista vacia
        if(!fs.existsSync(uploadsDir)){
            return []
        }

        // lee todos los nombres de archivo presentes en la carpeta uploads
        const files = fs.readdirSync(uploadsDir);

        // Recorremos cada archivo para construir su información de salida
        const fileDetails = files.map(( filename ) => {
            // Construye la ruta absoluta del archivo actual
            const filePath = path.join(uploadsDir, filename );
            // Obtenemos estadísticas del archivo como tamaño  y fecha de creación
            const stats = fs.statSync(filePath);
            // Extraemos la extensíon de cada archivo
            const extension = path.extname(filename);

            // retornamos el objeto de respuesta para ese archivo
            return {
                filename,
                size : stats.size,
                uploadedAt : stats.birthtime,
                extension,
                path: `/uploads/${filename}`
            }
        })

        // Nos devuelve la lista ordenada desde el archivo más reciente al más antiguo
        return {
            items : fileDetails.sort(
                ( a, b ) =>  new Date(b.uploadedAt) - new Date(a.uploadedAt)
            ),
            total : fileDetails.length
        }
    } catch (error) {
        throw new ApiError(500, 'Error al obtener la lista de archivos')
    }
};

export const deleteFileService = async (filename) => {
    try {
        if(!filename){
            throw new ApiError(400, 'Nombre de archivo requerido')
        }

        const filePath = path.join( uploadsDir, filename )

        if(!fs.existsSync(filePath)){
            throw new ApiError(404, 'Archivo no encontrado')
        }

        // Verificamos que la ruta resultante permanezca dentro de la carpeta uploads
        if(!filePath.startsWith(uploadsDir)){
            throw new ApiError(403, 'Acceso denegado')
        }

        fs.unlinkSync(filePath);

        return {
            message : `Archivo ${filename} eliminado correctamente`,
            filename
        };

    } catch (error) {
        throw error
    }
}







