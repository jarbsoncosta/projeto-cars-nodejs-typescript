import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import swaggerUi from 'swagger-ui-express';

import AppError from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';

import '@shared/container';

import swaggerFile from '../../../swagger.json';
import routes from './routes';

const app = express();

createConnection("localhost");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile)); //

app.use(express.json());
app.use(routes);

// tratamento de erros da aplicação
app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }
        console.log(error);

        return response.status(500).json({
            status: 'error',
            message: 'Erro Interno do servidor',
        });
    },
);

export{app}
