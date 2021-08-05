import { ICreateUsersTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";


interface IUsersTokensRepository{
   create(data: ICreateUsersTokenDTO): Promise<UserToken>
   findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken>
   deleteById(id:string):Promise<void>
}

export { IUsersTokensRepository }


       
