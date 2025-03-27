import express, { Application, Request, Response } from 'express';
import userRouter from './module/user/user.router';
import notFound from './app/middlewares/notFound';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import authRouter from './module/auth/auth.router';
import blogRouter from './module/blog/blog.router';

const app: Application = express();

app.use(express.json());

app.use('/api', userRouter);
app.use('/api/auth', authRouter);
app.use('/api', blogRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running 🚀🚀');
});

app.use(globalErrorHandler);

//Not found route
app.use(notFound);

export default app;