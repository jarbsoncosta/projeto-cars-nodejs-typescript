import { Router } from 'express'
import {AuthenticateUserController} from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController'


const autenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()


autenticateRoutes.post('/sessions', authenticateUserController.handle)

export default autenticateRoutes