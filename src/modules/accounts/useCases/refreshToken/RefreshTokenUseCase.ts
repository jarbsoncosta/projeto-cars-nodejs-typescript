import auth from '@config/auth'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import AppError from '@shared/errors/AppError'
import {sign, verify} from 'jsonwebtoken'

interface IPayload{
    sub: string,
    email:string
}


class RefreshTokenUseCase{
    constructor(
        private usersTokenRepository: IUsersTokensRepository

    ){}
    async execute(token: string) {
        const {secret_refresh_token, expires_in_refresh_token} = auth

        const {email, sub} = verify(token, auth.secret_refresh_token) as IPayload
        const user_id = sub

        const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        )

        if (!userToken) {
            throw new AppError("Refresh token does not exists!");
            
        }
        await this.usersTokenRepository.deleteById(userToken.id)

          const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })


         
        
    }
}

export {RefreshTokenUseCase}