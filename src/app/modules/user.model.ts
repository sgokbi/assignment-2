import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAddress,
  TUserFullName,
  UserMethods,
  UserModel,
  TUserOrder,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

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
    required: [true, 'Product name is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
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
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Password is required'],
    maxlength: [80, 'Password cannot be more than 20 characters'],
  },
  fullName: {
    type: userFullNameSchema,
    required: [true, 'User full name is required'],
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
    unique: true,
  },
  isActive: {
    type: Boolean,
    // required:[true, "isActive is required"],
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
  },
  orders: [
    {
      type: userOrderSchema,
    },
  ],
});

// pre save middleware / hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// pre save middleware / hook
// userSchema.post('findOne', function (doc, next) {
//   // doc.password = '';
//   // next();
//   if (doc) {
//     doc.password = undefined;
//   }
//   next();
// });

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

// custom instance method
userSchema.methods.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
