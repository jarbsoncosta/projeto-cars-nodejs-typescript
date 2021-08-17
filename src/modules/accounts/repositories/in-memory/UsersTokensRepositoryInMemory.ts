import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { UserToken} from "@modules/accounts/infra/typeorm/entities/UserToken";
import { IUsersTokensRepository } from "../IUsersTokensRepository";



class UsersTokensRepositoryInMemory implements IUsersTokensRepository{
     usersTokens: UserToken[] =[]
   async create({ expires_data, refresh_token, user_id }: ICreateUsersTokenDTO): Promise<UserToken> {
        const userToken = new UserToken()

        Object.assign(userToken, {
            expires_data,
            refresh_token,
            user_id
        })
       this.usersTokens.push(userToken)
       
       return userToken
        
        
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {

        const userToken = this.usersTokens.find((ut) => ut.user_id === user_id && ut.refresh_token === refresh_token)
        return userToken
        
    }
    async deleteById(id: string): Promise<void> {
        const userToken = this.usersTokens.find((ut)=>ut.id === id)
     this.usersTokens.slice(this.usersTokens.indexOf(userToken))
        
    }
    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const userToken = this.usersTokens.find((ut)=> ut.refresh_token === refresh_token)
        return userToken
    }

   

}
export{UsersTokensRepositoryInMemory}