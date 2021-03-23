import { Router } from 'express';

import createSpecificationController from '../modules/useCases/createSpecification';
import listSpecificationController from '../modules/useCases/listSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (request, response) => {
    return createSpecificationController.handle(request, response);
});

specificationsRoutes.get('/', (request, response) => {
    return listSpecificationController.handle(request, response);
});
export default specificationsRoutes;
