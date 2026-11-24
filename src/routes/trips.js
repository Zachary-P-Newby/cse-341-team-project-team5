import { bookingPage, processBookingRequest } from '../controllers/bookings.js';
import confirmationPage from './confirm.js';
import listTripsPage from './ejs-routes.js';
import tripDetailsPage from './details.js';
import { Router } from 'express';
// cant use bookingPage twice.  If it is still needed, it needs to be called something else. Also there is o bookingPage in ticket-class
// import { bookingPage } from "../controllers/ticket-classes.js";


const router = Router();

// List all trips
router.get('/', listTripsPage);

// Trip details page
router.get('/:tripId', tripDetailsPage);

// Book ticket 
router.get('/booking/:scheduleId', bookingPage);
router.post('/book', processBookingRequest);

// Booking confirmation page
router.get('/confirmation/:confirmationId', confirmationPage);

export default router;
