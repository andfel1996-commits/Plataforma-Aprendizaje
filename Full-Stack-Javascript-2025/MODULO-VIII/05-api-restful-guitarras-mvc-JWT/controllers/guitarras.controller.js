import {
    createNewGuitarService,
    deleteOneGuitarService,
    getAllGuitarsService,
    getOneGuitarService,
    patchOneGuitarService,
    replaceOneGuitarService
} from '../services/guitarras.service.js';

import { sendSuccess } from '../utils/apiResponse.js';
import { buildCollectionLinks, buildGuitarLinks, getBaseUrl } from '../utils/hateoas.js';
import { filterFields } from '../utils/filterFields.js';

const enrichGuitar = (req, guitar) => ({
    ...guitar,
    _links: buildGuitarLinks(req, guitar.id)
});

// GET /api/v1
export const getApiDocumentation = (req, res) => {
    const baseUrl = getBaseUrl(req);
    return sendSuccess({
        res,
        message: 'Documentación resumida de la API RESTful de guitarras.',
        data: {
            version: 'v1',
            baseUrl: `${baseUrl}/api/v1`,
            endpoints: {
                health:        { method: 'GET',    url: `${baseUrl}/api/v1/health` },
                list:          { method: 'GET',    url: `${baseUrl}/api/v1/guitarras`, queryParams: ['q', 'sortBy', 'order', 'page', 'limit', 'fields'] },
                detail:        { method: 'GET',    url: `${baseUrl}/api/v1/guitarras/:guitarId` },
                create:        { method: 'POST',   url: `${baseUrl}/api/v1/guitarras` },
                replace:       { method: 'PUT',    url: `${baseUrl}/api/v1/guitarras/:guitarId` },
                partialUpdate: { method: 'PATCH',  url: `${baseUrl}/api/v1/guitarras/:guitarId` },
                remove:        { method: 'DELETE', url: `${baseUrl}/api/v1/guitarras/:guitarId` }
            },
            exampleBody: {
                name: 'Ibanez RG550', brand: 'Ibanez', model: 'RG550',
                body: 'Superstrat', color: 'Purple Neon',
                strings: 6, value: 1499, stock: 5
            }
        }
    });
};

// GET /api/v1/health
export const getHealth = (req, res) => {
    return sendSuccess({
        res,
        message: 'API operativa',
        data: {
            uptimeSeconds: Math.floor(process.uptime()),
            timestamp: new Date().toISOString()
        }
    });
};

// GET /api/v1/guitarras
export const getAllGuitars = (req, res, next) => {
    try {
        const { items, meta } = getAllGuitarsService(req.query);
        const { fields } = req.query;
        const data = items.map((guitar) => {
            const filteredGuitar = filterFields(guitar, fields);
            const guitarId = filteredGuitar.id || guitar.id;
            return {
                ...filteredGuitar,
                _links: buildGuitarLinks(req, guitarId)
            };
        });
        return sendSuccess({
            res,
            message: 'Listado de guitarras obtenido correctamente.',
            data,
            meta,
            links: buildCollectionLinks(req, meta)
        });
    } catch (error) {
        return next(error);
    }
};

// GET /api/v1/guitarras/:guitarId
export const getOneGuitar = (req, res, next) => {
    try {
        const guitar = getOneGuitarService(req.params.guitarId);
        return sendSuccess({
            res,
            message: 'Guitarra obtenida correctamente',
            data: enrichGuitar(req, guitar)
        });
    } catch (error) {
        return next(error);
    }
};

// POST /api/v1/guitarras
export const createdGuitar = async (req, res, next) => {
    try {
        const createGuitar = await createNewGuitarService(req.body);
        const location = `/api/v1/guitarras/${createGuitar.id}`;
        return sendSuccess({
            res,
            statusCode: 201,
            message: 'Guitarra creada correctamente',
            data: enrichGuitar(req, createGuitar),
            location
        });
    } catch (error) {
        return next(error);
    }
};

// PUT /api/v1/guitarras/:guitarId
export const replaceOneGuitar = async (req, res, next) => {
    try {
        const updatedGuitar = await replaceOneGuitarService(req.params.guitarId, req.body);
        return sendSuccess({
            res,
            message: 'Guitarra reemplazada correctamente.',
            data: enrichGuitar(req, updatedGuitar)
        });
    } catch (error) {
        return next(error);
    }
};

// PATCH /api/v1/guitarras/:guitarId
export const patchOneGuitar = async (req, res, next) => {
    try {
        const updateGuitar = await patchOneGuitarService(req.params.guitarId, req.body);
        return sendSuccess({
            res,
            message: 'Guitarra actualizada parcialmente.',
            data: enrichGuitar(req, updateGuitar)
        });
    } catch (error) {
        return next(error);
    }
};

// DELETE /api/v1/guitarras/:guitarId
export const deleteOneGuitar = async (req, res, next) => {
    try {
        await deleteOneGuitarService(req.params.guitarId);
        return res.status(204).send();
    } catch (error) {
        return next(error);
    }
};
