import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
        carsRepositoryInMemory,
    );
});
// não deve ser capaz de adicionar uma nova especificação a um carro existente
it('should not be able to add a new specification to a now-existent car', async () => {
    expect(async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car1',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-123',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'category',
        });

        const specification_id = '4321';
        await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specification_id,
        });
    }).rejects.toBeInstanceOf(AppError);
});
// deve ser capaz de adicionar uma nova especificação ao carro
it('should be able to add a new specification to the car', async () => {
    const car_id = '1234';
    const specification_id = '4321';
    await createCarSpecificationUseCase.execute({ car_id, specification_id });
});
