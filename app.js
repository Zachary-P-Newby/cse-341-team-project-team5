import express from 'express';
import Path from 'path';
import { fileURLToPath } from 'url';
import pkg from './package.json' with { type: 'json' };
import globalMiddleware from './src/middleware/global.js';
import routes from './src/routes/router.js'
import apiRoutes from './src/routes/api-routes.js'
import ejsRoutes from './src/routes/ejs-routes.js'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

const app = express();


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Add version info to res.locals for access in templates.
app.use((req, res, next) => {
    res.locals.appVersion = pkg.version;
    next();
});

// Configure static files and EJS templates.
app.use(express.static(Path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', Path.join(__dirname, 'src/views'));

// Parse JSON and URL-encoded request bodies.
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(globalMiddleware);
app.use('/', routes);
app.use('/', apiRoutes);
app.use('/', ejsRoutes);

// Connect mongoose to use mongoose schemaa
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch((err) => console.error('Database connection error:', err))

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
``