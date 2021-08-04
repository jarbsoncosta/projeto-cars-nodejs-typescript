
interface ICreateUsersTokenDTO{
    user_id: string;
    refresh_token: string;
    expires_data:Date
}

export{ICreateUsersTokenDTO}