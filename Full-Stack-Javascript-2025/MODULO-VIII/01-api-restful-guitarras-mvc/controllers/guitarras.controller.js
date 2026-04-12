import {
    createNewGuitarService,
    deleteOneGuitarService,
    getAllGuitarsService,
    getOneGuitarService,
    patchOneGuitarService,
    replaceOneGuitarService
} from '../services/guitarras.service.js'

import { sendSuccess } from '../utils/apiResponse.js';

import {
    buildCollectionLinks,
    buildGuitarLinks,
    getBaseUrl
} from '../utils/hateoas.js';

import { filterFields } from '../utils/filterFields.js';

const enrichGuitar = (req, guitar) => ({
  ...guitar,
  _links : buildGuitarLinks(req, guitar.id )
})

// ─── GET /api/v1 ─────────────────────────────────────────────────────────────
// Endpoint de documentación: devuelve un resumen de todos los endpoints disponibles.
// No necesita try/catch porque no accede a datos ni puede fallar con errores de negocio.
export const getApiDocumentation = (req, res) => {

  const baseUrl = getBaseUrl(req); // "http://localhost:3000"

  return sendSuccess({
    res,
    message: 'Documentación resumida de la API RESTful de guitarras.',
    data: {
      version: 'v1',
      baseUrl: `${baseUrl}/api/v1`,
      endpoints: {
        health:        { method: 'GET',    url: `${baseUrl}/api/v1/health` },
        list:          { method: 'GET',    url: `${baseUrl}/api/v1/guitarras`, queryParams: ['q', 'sortBy', 'order', 'page', 'limit', 'fields'] },
        detail:        { method: 'GET',    url: `${baseUrl}/api/v1/guitarras/:guitarId?fields=id,name,brand` },
        create:        { method: 'POST',   url: `${baseUrl}/api/v1/guitarras` },
        replace:       { method: 'PUT',    url: `${baseUrl}/api/v1/guitarras/:guitarId` },
        partialUpdate: { method: 'PATCH',  url: `${baseUrl}/api/v1/guitarras/:guitarId` },
        remove:        { method: 'DELETE', url: `${baseUrl}/api/v1/guitarras/:guitarId` }
      },
      // Ejemplo del body necesario para crear una guitarra (POST)
      exampleBody: {
        name: 'Ibanez RG550', brand: 'Ibanez', model: 'RG550',
        body: 'Superstrat', color: 'Purple Neon',
        strings: 6, value: 1499, stock: 5
      }
    }
  });
};

// GET /api/v1/health
export const getHealth = ( req, res ) => {
  return sendSuccess({
    res,
    message : 'API opertiva',
    data:{
      uptimeSeconds : Math.floor( process.uptime() ), // Segundos desde cuando el servicio lleva corriendo 
      timestamp: new Date().toISOString()
    }
  })
}

export const getAllGuitars = ( req, res, next  ) => {
  try {

      // Llamamos al service devuelve todas las guitarras
      const { items, meta } = getAllGuitarsService(req.query);

      // vamos a leer los fields para filtrar el listado si el cliente lo rqueire
      const { fields } = req.query;



      // Agregamos _links HATEOAS a cada guitarra del listado
      const data  = items.map(( guitar ) => {
        const filteredGuitar = filterFields( guitar, fields );
        const guitarId = filteredGuitar.id || guitar.id
        return {
          ...filteredGuitar,
          _links: buildGuitarLinks(req, guitarId)
        }
      })
     
      return sendSuccess({
        res,
        message:'Listado de guitarras obtenido correctamente.',
        data,
        meta,
        links : buildCollectionLinks( req, meta )
      })
  } catch (error) {
    return next(error)
  }
}

// GET /api/v1/guitarras/:guitarId

export const getOneGuitar = ( req, res, next ) => {
  try {
    const guitar = getOneGuitarService(req.params.guitarId);
    return sendSuccess({
      res,
      message: 'Guitarra obtenida correctamente',
      data: enrichGuitar(req, guitar)
    })
  } catch (error) {
     return next(error)
  }
}

// POST /api/v1/guitarras
export const createdGuitar = ( req, res, next ) => {
  try {
    const createGuitar = createNewGuitarService( req.body );
    // Contruimos la URL donde el cliente puede encontrar el nuevo recurso
    // Esta URL va al header 'location' de la respusta HTTP estándar
    const location = `/api/v1/guitarras/${createGuitar.id}`
    return sendSuccess({
      res,
      statusCode : 201,
      message: 'Guitarra creada correctamente',
      data : enrichGuitar(req, createGuitar),
      location
    })
  } catch (error) {
    return next(error)
  }
}

// PUT /api/v1/guitarras/:guitarId
export const replaceOneGuitar = (req, res,  next ) => {
  try {
    const updatedGuitar = replaceOneGuitarService(req.params.guitarId, req.body );
    return sendSuccess({
      res,
      message:'Guitarra remplazada correctamente.',
      data: enrichGuitar( req, updatedGuitar )
    })
  } catch (error) {
    return next(error)
  }
}

// PATCH /api/v1/guitarras/:guitarId
export const patchOneGuitar = ( req, res, next ) => {
  try {
    const updateGuitar = patchOneGuitarService( req.params.guitarId,  req.body );
    return sendSuccess({
      res,
      message: 'Guitarra actualiada parcialmente.',
      data : enrichGuitar(req, updateGuitar )
    })
  } catch (error) {
    return next( error )
  }
}

// DELETE /api/v1/guitarras/:guitarId
export const deleteOneGuitar =  ( req, res , next ) => {
  try {
    deleteOneGuitarService(req.params.guitarId)
    return res.status(204).send()
  } catch (error) {
     return next(error)
  }
}

