import express, { Application } from 'express';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

export default app;
