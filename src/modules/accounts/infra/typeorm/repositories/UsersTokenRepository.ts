import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserToken } from "../entities/UserToken";



class UsersTokenRepository implements IUsersTokensRepository{

    private repository: Repository<UserToken>
    constructor() {
        this.repository = getRepository(UserToken)
    }
    async create({user_id, refresh_token,expires_data}:ICreateUsersTokenDTO): Promise<UserToken> {
        const userToken = this.repository.create({
            user_id,
            refresh_token,
            expires_data
        })

        return userToken
        
    }
    
}
export{UsersTokenRepository}