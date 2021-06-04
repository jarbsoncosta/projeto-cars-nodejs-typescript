import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICreateImageCarDTO {
    car_id: string;
    image_name: string;
}

interface ICarsImagesRepository {
    create({ car_id, image_name }: ICreateImageCarDTO): Promise<CarImage>;
}

export { ICarsImagesRepository, ICreateImageCarDTO };
