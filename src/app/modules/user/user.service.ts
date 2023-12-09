import { User } from './user.model';
import { TUser } from './user.interface';

// NEW USER CREATE
const createUserIntoDB = async (userData: TUser) => {
  // new user created by instance method
  const user = new User(userData);

  // custom instance method to check if the user is exists
  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }

  // built in instance method
  const result = await user.save();
  return result;
};

// TO GET ALL USERS
const getAllUsersFromDB = async () => {
  const result = await User.find({}).exec();

  if (result.length === 0) {
    throw new Error('Users not found');
  }

  return result;
};

// T0 GET SINGLE USER
const getSingleUserFromDB = async (userId: number) => {
  // new user created by instance method
  const user = new User({ userId });

  // custom instance method to get specific property by
  const userData = await user.getUserData(userId);
  return userData;
};

// To update a single user from database by using userId
const updateUserIntoDB = async (userId: number, userData: TUser) => {
  const user = new User({ userId });
  const updatedUser = await user.updateUser(userId, userData);
  return updatedUser;
};

// DELETE A SINGLE DATA FROM DATABASE
const deleteSingleUserFromDB = async (userId: number) => {
  // new user created by instance method
  const user = new User({ userId });

  // custom instance method for delete a single user from database
  const userData = await user.deleteUser(userId);
  return userData;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateUserIntoDB,
};
