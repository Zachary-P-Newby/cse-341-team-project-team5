import { Router } from 'express';
import { trainsApi} from './trains.js';
import { requireApiLogin, requireApiRole } from '../middleware/auth.js';

const router = Router();


// Trains API
router.get('/trains', trainsApi);


router.get("/test-one", requireApiLogin, (req, res)=>{return res.json({ message: "Test successful" });});
router.get("/test-two", requireApiLogin, requireApiRole("admin"), (req, res)=>{return res.json({ message: "Test successful" });})

export default router;