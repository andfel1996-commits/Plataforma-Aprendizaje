import express from 'express';
import apiV1Routes from '../v1/routes/guitarras.routes.js';
import { requestInfo } from '../middlewares/requestInfo.js';
import { cacheForGetRequest } from '../middlewares/cacheHeaders.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import { notFoundHandler } from '../middlewares/notFound.js';

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.apiVersion = process.env.API_VERSION || 'v1';
        this.cacheSeconds = Number(process.env.API_CACHE_MAX_AGE || 60);
        this.paths = {
            api: `/api/${this.apiVersion}`
        };
        this.middlewares();
        this.routes();
        this.errorMiddlewares();
    }

    middlewares(){
        this.app.disable('x-powered-by');
        this.app.use(express.json());
        this.app.use(requestInfo);
        this.app.use(cacheForGetRequest(this.cacheSeconds));
    }

    routes(){
        this.app.get('/', (req, res) => {
            return res.status(200).json({
                status: 'success',
                code: 200,
                message: 'Bienvenido a la API RESTfull de guitarras.',
                data: {
                    docs: `${req.protocol}://${req.get('host')}${this.paths.api}`
                }
            });
        });
        this.app.use(this.paths.api, apiV1Routes);
    }

    errorMiddlewares(){
        this.app.use(notFoundHandler);
        this.app.use(errorHandler);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`);
        });
    }
}

export default Server;
