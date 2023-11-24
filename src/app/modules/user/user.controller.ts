import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { z } from 'zod';
import UserValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    // const userFullNameValidationSchema = z.object({
    //   firstName: z
    //     .string()
    //     .min(1)
    //     .max(30, { message: 'First name length should be under 30.' }),
    // });
    // const userValidationSchema = z.object({
    //   userId: z.number(),
    // });

    const { user: userData } = req.body;
    const zodParseData = UserValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
      // error: {
      //   code: err.code,
      //   description: err.message,
      // },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Users not found',
      error: {
        code: err.code,
        description: 'Users not found',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const userId = Number(id);

    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: err.code,
        description: 'User not found',
      },
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const userId = Number(id);

    const result = await UserServices.deleteSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: err.code,
        description: 'User not found',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
};
