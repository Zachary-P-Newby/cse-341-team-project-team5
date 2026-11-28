import { Router } from 'express';
import railTripsRouter from './trips.js';
import {trainsPage } from './trains.js';
import {processRegisterForm, processLoginForm, processLogout} from '../controllers/users.js';
import { adminDashboard, accountPage } from './accounts.js';
import { homePage, aboutPage, testErrorPage, registerPage, loginPage } from './index.js';
import { requirePageLogin, requirePageRole } from '../middleware/auth.js';
import { bookingsAdminPage } from "../controllers/bookings.js";

const router = Router();



// Home page
router.get('/', homePage);

// About page
router.get('/about', aboutPage);

// Trains page
router.get('/trains', trainsPage);


//register
router.get('/register', registerPage);
router.post("/register", processRegisterForm);

//login
router.get("/login", loginPage);
router.post("/login", processLoginForm);

//logout
router.get("/logout", processLogout);

//account
router.get("/account", requirePageLogin, accountPage)

//admin
router.get("/admin/dashboard", requirePageLogin, requirePageRole("admin"), adminDashboard);

// Rail trips
router.use('/trips', railTripsRouter);

// Test 500 error page
router.get('/500', testErrorPage);

// Booking administration page
router.get("/bookings", requirePageLogin, bookingsAdminPage);

// Keep the previous Week 03 URL working.
router.get("/bookings-admin", requirePageLogin, bookingsAdminPage);

export default router;
