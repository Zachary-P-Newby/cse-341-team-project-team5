import { bookingPage, processBookingRequest } from '../controllers/bookings.js';
import confirmationPage from './confirm.js';
import listTripsPage from './list.js';
import { Router } from 'express';
import { renderTripDetailsPage } from '../controllers/trips.js';


const router = Router();

// List all trips
router.get('/', listTripsPage);

// Trip details page
router.get('/:id', renderTripDetailsPage );

// Book ticket 
router.get('/booking/:scheduleId', bookingPage);
router.post('/book', processBookingRequest);

// Booking confirmation page
router.get('/confirmation/:confirmationId', confirmationPage);

export default router;
