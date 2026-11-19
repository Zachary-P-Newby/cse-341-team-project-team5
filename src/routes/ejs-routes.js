import { Router } from 'express';
import railTripsRouter from './trips.js';
import {trainsPage } from './trains.js';
import {register, login, logout} from '../controllers/users.js';

import { homePage, aboutPage, testErrorPage, registerPage, loginPage } from './index.js';

const router = Router();



// Home page
router.get('/', homePage);

// About page
router.get('/about', aboutPage);

// Trains page
router.get('/trains', trainsPage);


//register
router.get('/register', registerPage);
router.post("/register", register);

//login
router.get("/login", loginPage);
router.post("/login", login);

//logout
router.get("/logout", logout);


// Rail trips
router.use('/trips', railTripsRouter);

// Test 500 error page
router.get('/500', testErrorPage);

export default router;
