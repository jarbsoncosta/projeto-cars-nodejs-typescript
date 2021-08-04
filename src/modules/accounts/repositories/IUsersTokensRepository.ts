import { ICreateUsersTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";


interface IUsersTokensRepository{
   create(data:ICreateUsersTokenDTO):Promise<UserToken>
}

export{IUsersTokensRepository}