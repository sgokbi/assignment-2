import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('hello');
};

app.get('/', getAController);

export default app;
