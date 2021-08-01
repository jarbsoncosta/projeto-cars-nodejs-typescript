import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import AppError from '@shared/errors/AppError';
import { IDateProvider } from '@shared/provider/DateProvider/IDateProvider';
import { ICarRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}
@injectable()
class CreateRentalsUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('DayJsDateProvider')
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private  carsRepository:ICarRepository
    ) {}

    async execute({
        car_id,
        user_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        // Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário

        const minimumHour = 24;
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

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date,
        );

        if (compare < minimumHour) {
            throw new AppError('Invalid return time');
        }

        const rental = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date,
        });
        // atualizando status do carro para indisponivel após o agendamento
        await this.carsRepository.updateAvailable(car_id, false)

        return rental;
    }
}

export { CreateRentalsUseCase };
