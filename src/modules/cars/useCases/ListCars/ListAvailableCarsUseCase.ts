import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
    name?: string;
    category_id?: string;
    brand?: string;
}

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarRepository,
    ) {}
    async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(
            name,
            category_id,
            brand,
        );
        return cars;
    }
}

export { ListAvailableCarsUseCase };
