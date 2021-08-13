
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import AppError from "@shared/errors/AppError";
import { DayJsDateProvider } from "@shared/provider/DateProvider/implementations/DayJsDateProvider";
import { inject, injectable } from "tsyringe";
import { hash } from 'bcryptjs'


interface IRequest {
    token: string,
    password: string
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokenRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayJsDateProvider")
        private dateProvider: DayJsDateProvider,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository

    ) { }
    async execute({ token, password }: IRequest) {

        //verificando se o token existe
        const userToken = await this.usersTokensRepository.findByRefreshToken(token)
        if (!userToken) {
            throw new AppError("Token Invalid");

        }
        //verifica se o token ainda é válido
        if (this.dateProvider.compareIfBefore(userToken.expires_data, this.dateProvider.dateNow())) {
            throw new AppError("Token expired");

        }
        //pegando o id do usúario e criptografnado
        const user = await this.usersRepository.findById(userToken.user_id)
        user.password = await hash(password, 8)

        await this.usersRepository.create(user)
        await this.usersTokensRepository.deleteById(userToken.id)

    }
}

export { ResetPasswordUserUseCase }