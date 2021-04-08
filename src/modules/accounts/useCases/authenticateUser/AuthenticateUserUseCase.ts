import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

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
}

@injectable()
class AuthenticateUseCase {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
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
        // segendo token
        const token = sign({}, 'd41d8cd98f00b204e9800998ecf8427e', {
            subject: user.id,
            expiresIn: '1d',
        });
        return {
            user,
            token,
        };
    }
}

export { AuthenticateUseCase };
