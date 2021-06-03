import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ISpecificationRepository } from '../ISpecificationRepository';

interface IRequest {
    name: string;
    description: string;
}

class SpecificationRepositoryInMemory implements ISpecificationRepository {
    specification: Specification[] = [];
    async create({ name, description }: IRequest): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
        });
        this.specification.push(specification);
        return specification;
    }
    async findByName(name: string): Promise<Specification> {
        return this.specification.find(
            specification => specification.name === name,
        );
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSprecification = this.specification.filter(specification =>
            ids.includes(specification.id),
        );
        return allSprecification;
    }
}

export { SpecificationRepositoryInMemory };
