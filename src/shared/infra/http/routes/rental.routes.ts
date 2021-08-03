import { Router } from 'express';

import { CreateRentalsController } from '@modules/rentals/useCases/createRental/CreateRentalsController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { DevolutionsRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUseController';


const rentalRoutes = Router();

const createRentalsController = new CreateRentalsController();
const devolutionsRentalController = new DevolutionsRentalController()
const listRentalsByUserController = new ListRentalsByUserController

rentalRoutes.post('/', ensureAuthenticated, createRentalsController.handle);
rentalRoutes.post('/devolution/:id', ensureAuthenticated, devolutionsRentalController.handle);
rentalRoutes.get('/user', ensureAuthenticated, listRentalsByUserController.handle )

export default rentalRoutes;
