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

        await this.repository.save(userToken)

        return userToken
        
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token:string): Promise<UserToken> {
        const usersToken = await this.repository.findOne({
            user_id,
            refresh_token
        })
        return usersToken
    }
     async deleteById(id: string): Promise<void> {
        await this.repository.delete({id})
     }
    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const userToken = await this.repository.findOne({refresh_token})
        return userToken
             
    }   
    
}
export{UsersTokenRepository}