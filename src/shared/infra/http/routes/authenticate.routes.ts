import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';

const autenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController()

autenticateRoutes.post('/sessions', authenticateUserController.handle);
autenticateRoutes.post('/refresh-token', refreshTokenController.handle);
export default autenticateRoutes;
