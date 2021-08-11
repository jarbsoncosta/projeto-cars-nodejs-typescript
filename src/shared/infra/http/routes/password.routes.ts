import { SendForgotPasswordMailController } from '@modules/accounts/useCases/senForgotPasswordMail/SenForgotPasswordMailController'
import { Router } from 'express'



const passwordRouter = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()


passwordRouter.post("/forgot", sendForgotPasswordMailController.handle )


export{passwordRouter}