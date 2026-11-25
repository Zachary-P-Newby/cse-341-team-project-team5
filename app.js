import express from 'express';
import Path from 'path';
import { fileURLToPath } from 'url';
import pkg from './package.json' with { type: 'json' };
import globalMiddleware from './src/middleware/global.js';
import routes from './src/routes/router.js'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };
import mongoose from 'mongoose';
import session from 'express-session';
import { loadSessionUser } from './src/middleware/auth.js';
import flash from './src/middleware/flash.js';
import { connectToMongoose } from './src/db/connect.js';

const SESSION_SECRET = process.env.SESSION_SECRET;

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);


const app = express();


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Add version info to res.locals for access in templates.
app.use((req, res, next) => {
    res.locals.appVersion = pkg.version;
    next();
});

//set up session management
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {maxAge: 60 * 60 * 1000} //session expires after 1 hour of inactivity
}));

// Make login information available to all EJS views.
app.use((req, res, next) => {
    res.locals.isUserLoggedIn = Boolean(req.session?.user);
    res.locals.currentUser = req.session?.user || null;

    next();
});


app.use(loadSessionUser);

//set up res.locals values for isLoggedIn
app.use((req,res, next) => {
  res.locals.isUserLoggedIn = false;
  if (req.session && req.session.user){
    res.locals.isUserLoggedIn = true;

    res.locals.user = req.session.user;
  }
  else{
     res.locals.user = null;
  }

  next();
})


//set up flash
app.use(flash);

// Configure static files and EJS templates.
app.use(express.static(Path.join(__dirname, 'public'))); //set path to public files
app.set('view engine', 'ejs'); //set what view engine to use
app.set('views', Path.join(__dirname, 'src/views')); //set directory to views folder

// Parse JSON and URL-encoded request bodies.
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(globalMiddleware);
app.use('/', routes);


// Connect mongoose to use mongoose schemas.
try {
  await connectToMongoose();
  console.log('Connected to MongoDB');
  app.listen(3000, () => console.log('Server running on port 3000'));
} catch (err) {
  console.error('Database connection error:', err);
}


// Catch requests that did not match a route.
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// Render the appropriate error page.
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };

    return res.status(status).render(`errors/${template}`, context);
});

export default app;
