import express from 'express';
import { putPublicacion, deletePublicacion } from '../controller/publicacionHandler.js';

const router = express.Router();

router.put('/:id', putPublicacion);

router.delete('/:id', deletePublicacion);

export default router