import {
    uploadFileService,
    listFilesService,
    deleteFileService
} from '../services/uploads.service.js';

import { sendResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/ApiError.js';

export const uploadFileController = async ( req, res, next ) => {
    try {
        
        if(!req.files || Object.keys(req.files).length === 0 ){
            throw new ApiError(400, 'No se ha enviado archivo')
        }

        const file = req.files.file;
        const result = await uploadFileService(file);
        sendResponse(res,201, result, 'Archivo subido correctamente')

    } catch (error) {
        next(error)
    }
}

export const listFilesController = async (req, res, next ) => {
    try {
        const files = await listFilesService();
        sendResponse(res, 200, files, 'Archivos obtenidos correctamente')
    } catch (error) {
         next(error)
    }
}

export const deleteFileController = async ( req, res, next ) => {
    try {
        const { filename } = req.params;
        const result = await deleteFileService( filename )
        sendResponse(res, 200, result, 'Archivo eliminado correctamente')
    } catch (error) {
        next(error)
    }
}