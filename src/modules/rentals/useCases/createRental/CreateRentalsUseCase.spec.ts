import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import { CreateRentalsUseCase } from './CreateRentalsUseCase';

let createRentalsUseCase: CreateRentalsUseCase;
let rentalsReposityInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
    beforeEach(() => {
        rentalsReposityInMemory = new RentalsRepositoryInMemory();
        createRentalsUseCase = new CreateRentalsUseCase(
            rentalsReposityInMemory,
        );
    });
    // deve ser capaz de criar um novo aluguel
    it('should be able to create a new rental', async () => {
        const rental = await createRentalsUseCase.execute({
            user_id: '12345',
            car_id: '121212',
            expected_return_date: new Date(),
        });
        console.log(rental);
        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });
    // não deve ser capaz de criar um novo aluguel se houver outro aberto para o mesmo usuário
    it('should not be able to create a new rental if there is another open to the same user', async () => {
        expect(async () => {
            await createRentalsUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: new Date(),
            });
            await createRentalsUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    // não deve ser capaz de criar um novo aluguel se houver outro aberto para o mesmo carro
    it('should not be able to create a new rental if there is another open to the same car', async () => {
        expect(async () => {
            await createRentalsUseCase.execute({
                user_id: '1234',
                car_id: '121212',
                expected_return_date: new Date(),
            });
            await createRentalsUseCase.execute({
                user_id: '123',
                car_id: '121212',
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
