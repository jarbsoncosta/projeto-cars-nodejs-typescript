import {  getRepository, Repository } from 'typeorm'
import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import User from '../../entities/User';

class UsersRepository implements IUsersRepository{
    private repository: Repository<User>
     constructor() {
        this.repository = getRepository(User)
       
    }
   async create({
    name,   
    password,
    email,
    driver_license}: ICreateUserDTO): Promise<void>{
        const user = this.repository.create({
            name,          
            password,
            email,
            driver_license

        });

        await this.repository.save(user)
             
  }
      
}

export {UsersRepository}
