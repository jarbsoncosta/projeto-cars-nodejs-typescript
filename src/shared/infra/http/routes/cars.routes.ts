import { Router } from 'express';

import CreateUserController from '@modules/accounts/useCases/createUser/CreateUserController';

const carsRouters = Router();

const createUserController = new CreateUserController();

carsRouters.post('/', createUserController.handle);

export default carsRouters;
