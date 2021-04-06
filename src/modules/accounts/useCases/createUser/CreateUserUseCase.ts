import {inject, injectable} from 'tsyringe'
import { IUsersRepository } from "../../repositories/IUsersRepository";
import {ICreateUserDTO} from '../../dtos/ICreateUserDTO'


@injectable()
class CreateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) {}
    async execute({
        name,        
        password,
        email,
        driver_license
    }: ICreateUserDTO): Promise<void>{
        await this.usersRepository.create({
            name,
            password,
            email,
            driver_license,
        
        });
}
    
}


export default CreateUserUseCase;