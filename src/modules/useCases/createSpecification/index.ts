import SpecificationRepository from '../../cars/repositories/implementations/SpecificationRepository';
import CreateSpecificationController from './CreateSpcificationController';
import CreateSpecificationUseCase from './CreateSpecificationUseCase';

const specificationRepository = SpecificationRepository.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(
    specificationRepository,
);
const createSpecificationController = new CreateSpecificationController(
    createSpecificationUseCase,
);

export default createSpecificationController;
