import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory,
        );
    });
    it('should be able to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car1',
            description: 'car description',
            daily_rate: 130,
            license_plate: 'GHD22-r8884',
            fine_amount: 100,
            brand: 'car_brand',
            category_id: 'category_id',
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });
    it('should be able to list all available cars bay brand', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car2',
            description: 'car description',
            daily_rate: 130,
            license_plate: 'GHD22-r8884',
            fine_amount: 100,
            brand: 'car_brand_test',
            category_id: 'category_id',
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: 'Car_brand_test',
        });

        expect(cars).toEqual([car]);
    });
    it('should be able to list all available cars bay name', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car3',
            description: 'car description',
            daily_rate: 130,
            license_plate: 'GHD22-r8884',
            fine_amount: 100,
            brand: 'car_brand',
            category_id: 'category_id',
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: 'Car3',
        });
        console.log(cars);

        expect(cars).toEqual([car]);
    });
    it('should be able to list all available cars bay category', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car4',
            description: 'car description',
            daily_rate: 130,
            license_plate: 'GHD22-r8884',
            fine_amount: 100,
            brand: 'car_brand_test',
            category_id: 'Fiat',
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: 'Fiat',
        });
        console.log(cars);

        expect(cars).toEqual([car]);
    });
});
