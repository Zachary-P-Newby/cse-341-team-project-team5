import { Router } from 'express';
// import { renderTripsListPage, renderTripDetailsPage } from '../controllers/trips.js';

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