import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import { UsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokenRepository';
import auth from '@config/auth';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const autheHeader = request.headers.authorization;
    const usersTokenRepository = new UsersTokenRepository()

    if (!autheHeader) {
        throw new AppError('Token missing', 401);
    }
    // [0] = Bearer
    // [1] = token
    const [, token] = autheHeader.split(' ');

    try {
        // verifica se existe um token
        const { sub: user_id } = verify(
            token,
            auth.secret_refresh_token,
        ) as IPayload;
       
       //pegando o usuario e o refresh token
        const user = await usersTokenRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        );
        if (!user) {
            throw new AppError('User does not exists!', 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError('Invalid token', 401);
    }
}
