import { Router } from 'express';

import { CreateRentalsController } from '@modules/rentals/useCases/createRental/CreateRentalsController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalsController = new CreateRentalsController();

rentalRoutes.post('/', ensureAuthenticated, createRentalsController.handle);

export default rentalRoutes;
