import { inject, injectable } from 'tsyringe';

import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationRepository: ISpecificationRepository,
    ) {}
    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExist = await this.specificationRepository.findByName(
            name,
        );
        if (specificationAlreadyExist) {
            throw new AppError('Specification Already Exist');
        }
        await this.specificationRepository.create({
            name,
            description,
        });
    }
}

export default CreateSpecificationUseCase;
