import Specification from '../models/Specification';

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    findByName(name: string): Specification;
    create({ name, description }: ICreateSpecificationDTO): void;
    list(): Specification[];
}
export { ISpecificationRepository, ICreateSpecificationDTO };
