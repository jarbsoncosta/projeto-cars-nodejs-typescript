import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarRepository {
    private repository: Repository<Car>;
    constructor() {
        this.repository = getRepository(Car);
    }
   

    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            specifications,
            id,
        });

        await this.repository.save(car);
        return car;
    }
    async findByLicensePlace(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });
        return car;
    }
    async findAvailable(
        name?: string,
        category_id?: string,
        brand?: string,
    ): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder('c')
            .where('available = :available', { available: true });

        if (brand) {
            carsQuery.andWhere('LOWER(brand) = LOWER(:brand)', { brand });
        }
        if (name) {
            carsQuery.andWhere('LOWER(name) = LOWER(:name)', { name });
        }
        if (category_id) {
            carsQuery.andWhere('LOWER(category_id) = LOWER(:category_id)', {
                category_id,
            });
        }

        const cars = await carsQuery.getMany();
        return cars;
    }
    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);
        return car;
    }
    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository.createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id") //onde o id seja igual ao :id
            .setParameters({ id })
            .execute()
        //Update cars set available = 'true' where id =id
    }
}

export { CarsRepository };
