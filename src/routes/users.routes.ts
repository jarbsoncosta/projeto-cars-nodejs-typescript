import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import CreateUserController from '../modules/accounts/useCases/createUser/CreateUserController';
import UpdateAvatarUserController from '../modules/accounts/useCases/updateUserAvatar/UpadateAvatarUserController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateAvatarUserController = new UpdateAvatarUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    uploadAvatar.single('avatar'),
    updateAvatarUserController.handle,
);

export default usersRoutes;
