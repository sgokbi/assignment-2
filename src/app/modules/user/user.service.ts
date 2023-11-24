import { User } from '../user.model';
import { TUser } from './user.interface';

const createUserIntoDB = async (userData: TUser) => {
  // const result = await UserModel.create(user);

  const user = new User(userData); // instance created
  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }

  const result = await user.save(); // using built in instance method
  return result;
};

const getAllUsersFromDB = async () => {
  // const result = await User.find();
  const result = await User.aggregate([
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
  // const result = await User.findOne({ userId });

  const result = await User.aggregate([
    { $match: { userId } },
    {
      $project: {
        _id: 0,
        'fullName._id': 0,
        'address._id': 0,
        orders: 0,
      },
    },
  ]);
  return result;
};

const deleteSingleUserFromDB = async (userId: number) => {
  const result = await User.updateOne({ userId }, { isDeleted: true });

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
};
