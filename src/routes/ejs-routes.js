import { Router } from 'express';
import { renderTripsListPage, renderTripDetailsPage } from '../controllers/trips.js';

const router = Router();

// List all trips
router.get('/trips', renderTripsListPage);

// Trip details page
router.get('/trips/:id', renderTripDetailsPage);

export default router;