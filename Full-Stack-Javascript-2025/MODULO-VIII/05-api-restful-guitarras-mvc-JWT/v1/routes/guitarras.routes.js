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
    login,
    logout,
    refreshToken
} from '../../controllers/auth.controller.js'

import {
    authenticateJWT,
    authorizeRoles
} from '../../middlewares/auth.js'

import {
    validateCreateGuitar,
    validatePatchGuitar,
    validatePutGuitar
} from '../../middlewares/validateGuitar.js';

// GET /api/v1
router.get('/', getApiDocumentation);

// GET /api/v1/health
router.get('/health', getHealth);

// http:localhost:3000/api/v1/auth/login
router.post('/auth/login', login);

// http:localhost:3000/api/v1/auth/refresh
router.get('/auth/refresh', refreshToken );

// http:localhost:3000/api/v1/auth/logout
router.post('/auth/logout', logout);

// GET /api/v1/guitarras
router.get('/guitarras', authenticateJWT, getAllGuitars);

// GET /api/v1/guitarras/:guitarId
router.get('/guitarras/:guitarId', authenticateJWT,  getOneGuitar);

// POST /api/v1/guitarras
router.post('/guitarras',authenticateJWT, authorizeRoles('admin'), validateCreateGuitar, createdGuitar);

// PUT /api/v1/guitarras/:guitarId
router.put('/guitarras/:guitarId', authenticateJWT, authorizeRoles('admin'), validatePutGuitar, replaceOneGuitar);

// PATCH /api/v1/guitarras/:guitarId
router.patch('/guitarras/:guitarId', authenticateJWT, authorizeRoles('admin'), validatePatchGuitar, patchOneGuitar);

// DELETE /api/v1/guitarras/:guitarId
router.delete('/guitarras/:guitarId', authenticateJWT, authorizeRoles('admin'), deleteOneGuitar);

export default router;
