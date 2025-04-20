import { Router } from 'express';
import { createPlant, getPlantById } from '../controllers/plant.controller.js';
import { upload } from '../middlewares/multer.js';

const plantRouter = Router();

plantRouter.post('/plant', upload.single('image'), createPlant);
plantRouter.get('/plant/:plant_id', getPlantById);

export default plantRouter;
