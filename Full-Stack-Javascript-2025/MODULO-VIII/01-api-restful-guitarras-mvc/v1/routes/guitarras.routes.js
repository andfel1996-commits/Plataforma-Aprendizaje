import express from 'express';
const router = express.Router();
import {
    getApiDocumentation,
    getHealth,
    getAllGuitars,
    getOneGuitar,
    createdGuitar,
    replaceOneGuitar,
    patchOneGuitar,
    deleteOneGuitar
} from '../../controllers/guitarras.controller.js';

import {
    validateCreateGuitar,
    validatePatchGuitar,
    validatePutGuitar
} from '../../middlewares/validateGuitar.js'

// http:localhost:3000/api/v1
router.get( '/', getApiDocumentation );

// http:localhost:3000/api/v1/health
router.get('/health', getHealth);

// http:localhost:3000/api/v1/guitarras
router.get('/guitarras', getAllGuitars );

// http:localhost:3000/api/v1/guitarras/:guitarId
router.get('/guitarras/:guitarId', getOneGuitar );

// http:localhost:3000/api/v1/guitarras
router.post('/guitarras', validateCreateGuitar, createdGuitar )

// http:localhost:3000/api/v1/guitarras/:guitarId
router.put('/guitarras/:guitarId',validatePutGuitar, replaceOneGuitar )

// http:localhost:3000/api/v1/guitarras/:guitarId
router.patch('/guitarras/:guitarId', validatePatchGuitar, patchOneGuitar )

// http:localhost:3000/api/v1/guitarras/:guitarId
router.delete('/guitarras/:guitarId', deleteOneGuitar )



export default router;