import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import AppError from "@shared/errors/AppError";
import { IDateProvider } from "@shared/provider/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from 'uuid'
import {EtherealMailProvider} from '@shared/provider/MailProvider/implementations/EtherealMailProvider'


@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository,
        @inject("UsersTokenRepository")
        private usersTokenRepository: UsersTokenRepository,    
        @inject("DayJsDateProvider")
        private dateProvider : IDateProvider

    ){}
    async execute(email: string) {

        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError("User does not exists");
            
        }

        const token = uuidv4()

        const expires_data = this.dateProvider.addHours(3) //token de recuperação de senha expira em 3 horas


        await this.usersTokenRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_data
        })


        
    }
}

export {SendForgotPasswordMailUseCase}