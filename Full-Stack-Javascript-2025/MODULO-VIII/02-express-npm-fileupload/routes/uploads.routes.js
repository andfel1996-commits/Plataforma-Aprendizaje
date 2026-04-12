import { Router } from "express";

import {
    uploadFileController,
    listFilesController,
    deleteFileController
} from '../controllers/uploads.controller.js'
const router = Router();
// Rutas
router.post( '/', uploadFileController )
router.get( '/', listFilesController )
router.delete( '/:filename', deleteFileController )

export default router