import { Router } from 'express';
import {
  login,
  refreshTheToken,
  register,
} from '../controllers/auth.controller.js';

const appRouter = Router();

appRouter.post('/register', register);
appRouter.post('/login', login);
appRouter.post('/refresh', refreshTheToken);

export default appRouter;
