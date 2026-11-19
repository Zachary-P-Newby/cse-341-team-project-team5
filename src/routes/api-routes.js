import { Router } from 'express';
import { trainsApi} from './trains.js';

const router = Router();


// Trains API
router.get('/trains', trainsApi);




export default router;