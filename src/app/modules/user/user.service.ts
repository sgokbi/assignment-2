import { UserModel } from '../user.model';
import { User } from './user.interface';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  // const result = await UserModel.find();
  const result = await UserModel.aggregate([
    {
      $project: {
        _id: 0,
        username: 1,
        'fullName.firstName': 1,
        'fullName.lastName': 1,
        age: 1,
        email: 1,
        'address.street': 1,
        'address.city': 1,
        'address.country': 1,
      },
    },
  ]);
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });

  // const result = await UserModel.aggregate([
  //   {
  //     $project: {
  //       _id: 0,
  //       username: 1,
  //       'fullName.firstName': 1,
  //       'fullName.lastName': 1,
  //       age: 1,
  //       email: 1,
  //       'address.street': 1,
  //       'address.city': 1,
  //       'address.country': 1,
  //     },
  //   },
  // ]);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
