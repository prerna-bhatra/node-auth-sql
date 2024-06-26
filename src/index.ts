import 'reflect-metadata';
import express from 'express';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
