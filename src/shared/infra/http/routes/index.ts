import { Router } from 'express';

import carsRouters from '@shared/infra/http/routes/cars.routes';

import authenticateRoutes from './authenticate.routes';
import categoriesRoutes from './categories.routes';
import rentalRoutes from './rental.routes';
import specificationsRoutes from './specifications.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/users', usersRoutes);
routes.use(authenticateRoutes);
routes.use('/cars', carsRouters);
routes.use('/rentals', rentalRoutes);

export default routes;
