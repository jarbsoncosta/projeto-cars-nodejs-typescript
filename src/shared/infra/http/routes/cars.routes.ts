import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarController } from '@modules/cars/useCases/ListCars/ListAvailableCarsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRouters = Router();

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();

carsRouters.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle,
);
carsRouters.get('/available', listAvailableCarController.handle);

export default carsRouters;
