import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);

router.get('/', UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getSingleUser);

router.delete('/:userId', UserControllers.deleteSingleUser);

router.put('/:userId', UserControllers.updateUser);

export const userRoutes = router;
