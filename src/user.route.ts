import { Router } from 'express';
import { userController } from './user.controller';
import auth from '../../app/middlewares/auth';

const userRouter = Router();
userRouter.get('/users', auth('user', 'admin'), userController.getAllUser);
// Block User
userRouter.patch(
  '/admin/users/:userId/block',
  auth('admin'),
  userController.blockUser,
);

export default userRouter;