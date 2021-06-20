import { getRepository, Repository } from 'typeorm';

import {
    ICreateRentalDTO,
    IRentalsRepository,
} from '@modules/rentals/repositories/IRentalsRepository';
import AppError from '@shared/errors/AppError';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;
    constructor() {
        this.repository = getRepository(Rental);
    }
    findOpenRentalByUser(user_id: string): Promise<Rental> {
        throw new Error('Method not implemented.');
    }
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const rental = await this.repository.findOne(car_id);
        if (rental.start_date) {
            throw new AppError('');
        }
        return rental;
    }

    async create({
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
        });
        return rental;
    }
}

export { RentalsRepository };
