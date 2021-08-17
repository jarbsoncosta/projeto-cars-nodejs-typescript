import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import AppError from '@shared/errors/AppError';
import { DayJsDateProvider } from '@shared/provider/DateProvider/implementations/DayJsDateProvider';

import CreateUserUseCase from '../createUser/CreateUserUseCase';
import { AuthenticateUseCase } from './AuthenticateUserUseCase';

let autenticateUserUseCase: AuthenticateUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProviver: DayJsDateProvider


describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        dateProviver = new DayJsDateProvider()

        autenticateUserUseCase = new AuthenticateUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProviver
        );
        
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });
    // deve ser capaz de autenticar um usuário
    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            name: 'jarbson costa',
            email: 'jarbsonfc@gmail.com',
            driver_license: '48434773',
            password: '1234',
        };
        await createUserUseCase.execute(user);

        const result = await autenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty('token');
    });
    // não deve ser capaz de autenticar um usuário inexistente
    it('should not be able to authenticate an nonexistent user',async () => {
       await expect(autenticateUserUseCase.execute({
                email: 'false@gmail.com',
                password: '1234',
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });
    // não deve ser capaz de autenticar com senha incorreta
    it('should not be able to authenticate with incorrect password', async () => {
               const user: ICreateUserDTO = {
                name: 'User Test Error',
                email: 'user@user.com',
                driver_license: '4843',
                password: '1234',
            };
            await createUserUseCase.execute(user);
        
       await expect( autenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassword',
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });
});
