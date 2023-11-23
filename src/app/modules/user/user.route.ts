import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

// router.post('/create-user', userControllers.createUser);
router.post('/', userControllers.createUser);

export const userRoutes = router;
