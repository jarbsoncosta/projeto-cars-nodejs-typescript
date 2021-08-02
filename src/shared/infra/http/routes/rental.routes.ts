import { Router } from 'express';

import { CreateRentalsController } from '@modules/rentals/useCases/createRental/CreateRentalsController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { DevolutionsRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';

const rentalRoutes = Router();

const createRentalsController = new CreateRentalsController();
const devolutionsRentalController = new DevolutionsRentalController()

rentalRoutes.post('/', ensureAuthenticated, createRentalsController.handle);
rentalRoutes.post('/devolution/:id', ensureAuthenticated, devolutionsRentalController.handle);

export default rentalRoutes;
