import { ISpecificationRepository } from '../../cars/repositories/ISpecificationRepository';

interface IRequest {
    name: string;
    description: string;
}
class CreateSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationRepository) {}
    execute({ name, description }: IRequest): void {
        const specificationAlreadyExist = this.specificationRepository.findByName(
            name,
        );
        if (specificationAlreadyExist) {
            throw new Error('Specification Already Exist');
        }
        this.specificationRepository.create({
            name,
            description,
        });
    }
}

export default CreateSpecificationUseCase;
