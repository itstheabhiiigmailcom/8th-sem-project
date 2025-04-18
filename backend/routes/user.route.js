import { Router } from 'express';
import {
  login,
  refreshTheToken,
  register,
} from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const appRouter = Router();

appRouter.post('/register', register);
appRouter.post('/login', login);
appRouter.post('/refresh-token', refreshTheToken);
appRouter.get('/me', verifyJWT);

export default appRouter;
