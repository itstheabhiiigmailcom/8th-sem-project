import { Router } from 'express';
import { createPlant, getPlantById } from '../controllers/plant.controller.js';

const plantRouter = Router();

plantRouter.post('/plant', createPlant);
plantRouter.get('/plant/:plant_id', getPlantById);

export default plantRouter;
