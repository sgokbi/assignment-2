import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// router.post('/create-user', userControllers.createUser);
router.post('/', UserControllers.createUser);

router.get('/', UserControllers.getAllUsers);

export const userRoutes = router;
