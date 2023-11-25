import { User } from '../user.model';
import { TUser } from './user.interface';

const createUserIntoDB = async (userData: TUser) => {
  // new user by instance method
  const user = new User(userData);

  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }

  // using built in instance method
  const result = await user.save();
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.aggregate([
    {
      $project: {
        _id: 0,
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.aggregate([
    { $match: { userId } },
    {
      $project: {
        _id: 0,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

const updateUserIntoDB = async (userId: number, userData: TUser) => {
  const result = await User.findOneAndUpdate(
    { userId: userId },
    { $set: userData },
    { new: true, projection: { projection: 0 } },
  );
  return result;
};

const deleteSingleUserFromDB = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateUserIntoDB,
};
