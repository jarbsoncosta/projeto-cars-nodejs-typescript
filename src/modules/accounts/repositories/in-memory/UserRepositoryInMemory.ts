import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import User from '@modules/accounts/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class UserRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({
        email,
        password,
        name,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            email,
            password,
            name,
            driver_license,
        });
        this.users.push(user);
    }
    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    }
    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }
}

export { UserRepositoryInMemory };
