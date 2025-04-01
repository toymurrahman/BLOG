import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import User from './user.model';

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

// Block User Service
const blockUser = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // Block the user by setting the isBlocked flag to true
  user.isBlocked = true;

  // Save the user after blocking
  await user.save();
  return user;
};

export const UserService = {
  getAllUser,
  blockUser,
};