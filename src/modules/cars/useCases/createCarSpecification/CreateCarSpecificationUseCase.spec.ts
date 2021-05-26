import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
        carsRepositoryInMemory,
        specificationRepositoryInMemory,
    );
});
// não deve ser capaz de adicionar uma nova especificação a um carro existente
it('should not be able to add a new specification to a now-existent car', async () => {
    expect(async () => {
        const car_id = '1234';
        const specification_id = ['54321'];
        await createCarSpecificationUseCase.execute({
            car_id,
            specification_id,
        });
    }).rejects.toBeInstanceOf(AppError);
});
// deve ser capaz de adicionar uma nova especificação ao carro
it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
        name: 'Car1',
        description: 'Description Car',
        daily_rate: 100,
        license_plate: 'ABC-123',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
    });

    const specification = await specificationRepositoryInMemory.create({
        description: 'test',
        name: 'test',
    });

    const specification_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
        car_id: car.id,
        specification_id,
    });
    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
});
