import auth from '@config/auth'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import AppError from '@shared/errors/AppError'
import { IDateProvider } from '@shared/provider/DateProvider/IDateProvider'
import {sign, verify} from 'jsonwebtoken'
import { inject } from 'tsyringe'

interface IPayload{
    sub: string,
    email:string
}


class RefreshTokenUseCase{
    constructor(
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokensRepository,
        @inject("DayJsDateProvider")
        private dayJsDateProvider: IDateProvider

    ){}
    async execute(token: string):Promise<string> {
        const { secret_refresh_token, expires_in_refresh_token, expires_refresh_token_days } = auth
        
        //recebendo as informações do token e verificando se ele existe
        const {email, sub} = verify(token, auth.secret_refresh_token) as IPayload
        const user_id = sub

        const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        )

        if (!userToken) {
            throw new AppError("Refresh token does not exists!");
            
        }
        // remove o token existente da base de dados
        await this.usersTokenRepository.deleteById(userToken.id)

       
        //faz o refresh do token
          const refresh_token = sign({ email }, secret_refresh_token, {
            subject: sub,
            expiresIn: expires_in_refresh_token
          })
        
        const refresh_token_expires_date = this.dayJsDateProvider.addDays(expires_refresh_token_days)
        
        await this.usersTokenRepository.create({
            expires_data:refresh_token_expires_date,
            refresh_token,
            user_id
        })
        
        return refresh_token


         
        
    }
}

export {RefreshTokenUseCase}