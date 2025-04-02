import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import handleCatchAsync from '../../utils/handleCatchAsync';
import { UserService } from './user.service';
import AppError from '../../errors/AppError';
import { Request, Response } from 'express';

// Get User
const getAllUser = handleCatchAsync(async (req, res) => {
  const result = await UserService.getAllUser();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Users getting successfully',
    data: result,
  });
});

// Block User
const blockUser = handleCatchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (req.user.role !== 'admin') {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to block users',
    );
  }

  const blockedUser = await UserService.blockUser(userId);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
    data: {
      _id: blockedUser._id,
      name: blockedUser.name,
      email: blockedUser.email,
      isBlocked: blockedUser.isBlocked,
    },
  });
});

export const userController = {
  getAllUser,
  blockUser,
};