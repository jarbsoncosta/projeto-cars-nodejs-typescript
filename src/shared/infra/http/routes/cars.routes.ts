import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarController } from '@modules/cars/useCases/ListCars/ListAvailableCarsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRouters = Router();

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();

const createCarSpecificationController = new CreateCarSpecificationController();

carsRouters.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle,
);
carsRouters.get('/available', listAvailableCarController.handle);
carsRouters.post(
    '/specifications/:id',
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle,
);

export default carsRouters;
