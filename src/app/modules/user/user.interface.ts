import { Model } from 'mongoose';

export type TUserFullName = {
  firstName: string;
  lastName: string;
};

export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUserOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TUserAddress;
  orders?: TUserOrder[];
  // isDeleted: boolean;
};

export type UserMethods = {
  isUserExists(userId: number): Promise<TUser | null>;
  getUserData(userId: number): Promise<TUser | null>;
  deleteUser(userId: number): Promise<TUser | null>;
  updateUser(userId: number, userData: TUser): Promise<TUser | null>;
};

export type UserModel = Model<TUser, Record<string, never>, UserMethods>;
