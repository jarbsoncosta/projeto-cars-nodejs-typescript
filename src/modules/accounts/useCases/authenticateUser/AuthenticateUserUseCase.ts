import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import auth from '@config/auth';
import { IDateProvider } from '@shared/provider/DateProvider/IDateProvider';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token:string
}

@injectable()
class AuthenticateUseCase {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokensRepository,
        @inject("DayJsDateProvider")
        private dayJsDateProvider: IDateProvider
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const{expires_in_token,secret_refresh_token, secret_token,expires_in_refresh_token, expires_refresh_token_days }= auth

        // usuario exist
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Email ou password incorret!');
        }
        // senha é correta
        const passworMatch = await compare(password, user.password);
        if (!passworMatch) {
            throw new AppError('Email ou password incorret!');
        }
        // gerando token
        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token,
        });

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })

        const refresh_token_expires_date = this.dayJsDateProvider.addDays( expires_refresh_token_days)



        await this.usersTokenRepository.create({
            user_id: user.id,
            refresh_token,
            expires_data:refresh_token_expires_date
            

        })





        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
            refresh_token
        }

        return tokenReturn
    }
}

export { AuthenticateUseCase };
