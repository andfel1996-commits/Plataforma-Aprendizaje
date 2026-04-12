import express from 'express';
import { postPublicacion } from '../controller/publicacionHandler.js'
import upload from '../middleware/upload.js';

const router = express.Router();

// upload.single('imagen'), esta imagen la vamos 
// a ingresar del frmulario (multipart/form-data)

router.post( '/', upload.single('imagen'), postPublicacion )

export default router;