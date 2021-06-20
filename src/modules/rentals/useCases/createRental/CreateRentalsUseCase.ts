import { inject } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

class CreateRentalsUseCase {
    constructor(private rentalsRepository: IRentalsRepository) {}

    async execute({
        car_id,
        user_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        // Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id,
        );
        if (carUnavailable) {
            throw new AppError('Car is Unavailable');
        }
        // Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
            user_id,
        );
        if (rentalOpenToUser) {
            throw new AppError("there's a rental in progress fo user!");
        }
        // O aluguel deve ter duração minima de 24 horas

        const rental = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date,
        });
        return rental;
    }
}

export { CreateRentalsUseCase };
