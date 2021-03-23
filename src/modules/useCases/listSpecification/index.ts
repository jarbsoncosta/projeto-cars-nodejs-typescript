import SpecificationRepository from '../../cars/repositories/implementations/SpecificationRepository';
import ListSpecificationController from './ListSpecificationController';
import ListSpecificationUseCase from './ListSpecificationUseCase';

const specificationRepository = SpecificationRepository.getInstance();

const listSpecificationUseCase = new ListSpecificationUseCase(
    specificationRepository,
);

const listSpecificationController = new ListSpecificationController(
    listSpecificationUseCase,
);

export default listSpecificationController;
