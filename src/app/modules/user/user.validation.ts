import { z } from 'zod';

const UserFullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(50)
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name must be in capitalize format.',
      },
    ),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(50)
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'Last name must be in capitalize format.',
      },
    ),
});

const UserAddressValidationSchema = z.object({
  street: z.string().min(1, { message: 'Street name is required' }).max(100),
  city: z.string().min(1, { message: 'City name is required' }).max(50),
  country: z.string().min(1, { message: 'Country name is required' }).max(50),
});

const UserOrderValidationSchema = z.object({
  productName: z.string().min(1).max(100),
  price: z.number(),
  quantity: z.number(),
});

export const UserValidationSchema = z.object({
  userId: z.number().min(1, { message: 'User Id is required' }),
  username: z.string().min(1, { message: 'User Name is required' }).max(50),
  fullName: UserFullNameValidationSchema,
  age: z.number().min(1, { message: 'User age is required' }),
  email: z.string().email({ message: 'User valid email is required' }),
  isActive: z.boolean(),
  hobbies: z.array(
    z.string().min(1, { message: 'User hobbies is required' }).max(50),
  ),
  address: UserAddressValidationSchema,
  orders: z.array(UserOrderValidationSchema),
});

export default UserValidationSchema;
