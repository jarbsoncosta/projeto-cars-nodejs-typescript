import Specification from '../../cars/models/Specification';
import { ISpecificationRepository } from '../../cars/repositories/ISpecificationRepository';

class ListSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationRepository) {}

    execute(): Specification[] {
        const specifications = this.specificationRepository.list();
        return specifications;
    }
}

export default ListSpecificationUseCase;
