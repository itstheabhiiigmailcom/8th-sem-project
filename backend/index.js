import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/index.js';
import appRouter from './routes/user.route.js';
import plantRouter from './routes/plant.route.js';

dotenv.config();

const app = express(); // initialize the express js
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use(express.json());
// Middleware to parse incoming requests with URL-encoded payloads
app.use(cookieParser());
app.use('/api/v1', appRouter);
app.use('/api/v1', plantRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('app is listening now');
    });
  })
  .catch((err) => {
    console.log(err, ': MongoDB connection Failed');
  });
