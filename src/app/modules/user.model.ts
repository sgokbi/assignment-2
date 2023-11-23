import { Schema, model, connect } from 'mongoose';
import {
  User,
  User,
  UserAddress,
  UserFullName,
  UserOrder,
} from './user/user.interface';

const userFullNameSchema = new Schema<UserFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
});

const userAddressSchema = new Schema<UserAddress>({
  street: {
    type: String,
    required: [true, 'Street name is required'],
  },
  city: {
    type: String,
    required: [true, 'City name is required'],
  },
  country: {
    type: String,
    required: [true, 'Country name is required'],
  },
});

const userOrderSchema = new Schema<UserOrder>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

const userSchema = new Schema<User>({
  userId: {
    type: Number,
    required: [true, 'User Id is required'],
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  //   password: {
  //     type: String,
  //     required: [true, 'Password is required'],
  //     maxlength: [20, 'Password cannot be more than 20 characters'],
  //   },
  fullName: {
    type: userFullNameSchema,
    required: [true, 'User full name is required'],
  },
  age: {
    type: Number,
    required: [true, 'User age is required'],
  },
  email: {
    type: String,
    required: [true, 'User Email is required'],
    // unique: true,
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

export const UserModel = model<User>('User', userSchema);
