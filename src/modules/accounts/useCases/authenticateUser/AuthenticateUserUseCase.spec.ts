import AppError from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import CreateUserUseCase from '../createUser/CreateUserUseCase';
import { AuthenticateUseCase } from './AuthenticateUserUseCase';

let autenticateUserUseCase: AuthenticateUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory();
        autenticateUserUseCase = new AuthenticateUseCase(
            usersRepositoryInMemory,
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
    it('should not be able to authenticate an nonexistent user', () => {
        expect(async () => {
            await autenticateUserUseCase.execute({
                email: 'jabson@gmail.com',
                password: '1234',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    // não deve ser capaz de autenticar com senha incorreta
    it('should not be able to authenticate with incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: 'User Test Error',
                email: 'jfc@gmail.com',
                driver_license: '4843',
                password: '1234',
            };
            await createUserUseCase.execute(user);
            await autenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassword',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
