import { Rental } from '../infra/typeorm/entities/Rental';

interface ICreateRentalDTO {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

interface IRentalsRepository {
    create(data: ICreateRentalDTO): Promise<Rental>;

    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    findById(id:string):Promise<Rental>
}

export { IRentalsRepository, ICreateRentalDTO };
