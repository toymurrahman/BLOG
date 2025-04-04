import { Request, Response } from 'express';
import handleCatchAsync from '../../utils/handleCatchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service';

//Register User
const register = handleCatchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: {
      _id: result._id.toString(),
      name: result.name,
      email: result.email,
    },
  });
});

//Login User
const login = handleCatchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: StatusCodes.OK,
    data: {
      token: result.token,
    },
  });
});

export const AuthControllers = {
  register,
  login,
};