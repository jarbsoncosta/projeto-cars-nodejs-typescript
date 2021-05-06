import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlace(license_plate: string): Promise<Car>;
}
export { ICreateCarDTO, ICarRepository };
