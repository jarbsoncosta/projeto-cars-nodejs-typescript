import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import AppError from "@shared/errors/AppError";
import { IDateProvider } from "@shared/provider/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string;
    user_id: string
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: RentalsRepository,
        @inject("CarsRepository")
        private carsRepository: CarsRepository,
        @inject('DayJsDateProvider')
        private dateProvider: IDateProvider,

    ) { }
    async execute({ id, user_id }: IRequest): Promise<Rental> {

        //verificar se existe um aluguel
        const rental = await this.rentalsRepository.findById(id)
        const car = await this.carsRepository.findById(rental.car_id)
        
        const minimum_daily = 1

        if (!rental) {
            throw new AppError("Rental dos not exists");

        }
        //verificar o tempo de aluguel
        const dateNow = this.dateProvider.dateNow() //pegar data atual

        //verifica quantas diarias esse aluguem tem
        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        )
        //verificando de o atraso for menor ou igual a zero, atribui-se o valor mínimo de uma diaria
        if (daily <= 0) {
            daily = minimum_daily
        }

        const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date)//comparando a data inicial com a data de devolução

        //calculando a quantidade de atrasos
        let total = 0
        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount
            total = calculate_fine
        }
        //calculando diaria
        total += daily * car.daily_rate
        rental.end_date = this.dateProvider.dateNow()
        rental.total = total

        //atualizando o agendamento 
        await this.rentalsRepository.create(rental)

        //atualizando a disponibilidade do carro
        await this.carsRepository.updateAvailable(car.id, true)

        return rental

    }

}


export { DevolutionRentalUseCase }