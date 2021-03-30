import 'reflect-metadata'
import express from 'express';
import swaggerUi from 'swagger-ui-express'

import routes from './routes';
import swaggerFile from './swagger.json'

import './database'

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))//

app.use(express.json());
app.use(routes);

app.listen(3334, () => {
    console.log('server is running');
});
