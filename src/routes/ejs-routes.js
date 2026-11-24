import { Router } from 'express';
// import { renderTripsListPage, renderTripDetailsPage } from '../controllers/trips.js';
import railTripsRouter from './trips.js';
import {trainsPage } from './trains.js';
import {processRegisterForm, processLoginForm, processLogout} from '../controllers/users.js';
import { adminDashboard, accountPage } from './accounts.js';
import { homePage, aboutPage, testErrorPage, registerPage, loginPage } from './index.js';
import { requirePageLogin, requirePageRole } from '../middleware/auth.js';

const router = Router();

// List all trips
//router.get('/trips', renderTripsListPage);

// Trip details page
//router.get('/trips/:id', renderTripDetailsPage);


// Optional: Middleware to protect dashboard routes so only logged-in users can view them
function requireAuth(req, res, next) {
  const user = req.session?.user || req.user;
  if (!user) {
    return res.redirect('/login');
  }
  return next();
}


// Standard User Dashboard -> GET /dashboard
router.get('/dashboard', (req, res) => {
  res.render('standard-user/dashboard', {
    user: req.session?.user || req.user || null,
  });
});

// Booking Admin Page -> GET /booking
router.get('/booking', (req, res) => {
  res.render('admin/booking', {
    user: req.session?.user || req.user || null,
  });
});

// User Admin Page -> GET /user
router.get('/user', (req, res) => {
  res.render('admin/user', {
    user: req.session?.user || req.user || null,
  });
});

// right after verifing password and saving user to the session
// Inside your POST /login handler after authentication succeeds:
router.post('/login', async (req, res) => {
  // ... your existing authentication/session logic ...

  if (user.role === 'admin' || user.isAdmin) {
    return res.redirect('/admin/dashboard');
  }

  return res.redirect('/dashboard');
});
export default router;




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

export default router;
