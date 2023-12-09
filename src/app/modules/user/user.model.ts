import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAddress,
  TUserFullName,
  UserMethods,
  UserModel,
  TUserOrder,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userFullNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
});

const userAddressSchema = new Schema<TUserAddress>({
  street: {
    type: String,
    required: [true, 'Street name is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City name is required'],
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'Country name is required'],
    trim: true,
  },
});

const userOrderSchema = new Schema<TUserOrder>({
  productName: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
  },
  quantity: {
    type: Number,
    trim: true,
  },
});

const userSchema = new Schema<TUser, UserModel, UserMethods>({
  userId: {
    type: Number,
    required: [true, 'User Id is required'],
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'User name is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Password is required'],
  },
  fullName: {
    type: userFullNameSchema,
    required: [true, 'User full name is required'],
    _id: false,
  },
  age: {
    type: Number,
    required: [true, 'User age is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'User Email is required'],
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  hobbies: [
    {
      type: String,
      required: [true, 'User hobbies are required'],
    },
  ],
  address: {
    type: userAddressSchema,
    required: [true, 'User address is required'],
    _id: false,
  },
  orders: [
    {
      type: userOrderSchema,
      _id: false,
    },
  ],
});

// Pre save middleware / hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Hiding password when returning response
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Custom instance method to check if the user is exists
userSchema.methods.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

// Fetch filtered data if the user is exists by id by using instance method
userSchema.methods.getUserData = async function (userId: number) {
  const user = await User.findOne({ userId }).select('-orders').exec();

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

// delete a user from database by userId by using custom instance method
userSchema.methods.deleteUser = async function (userId: number) {
  const user = await User.findOneAndDelete({ userId });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

// delete a user from database by userId by using custom instance method

userSchema.methods.updateUser = async function (
  userId: number,
  userData: TUser,
) {
  const user = await User.findOneAndUpdate(
    { userId: userId },
    { $set: userData },
    { new: true, projection: { projection: 0 } },
  );

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const User = model<TUser, UserModel>('User', userSchema);
