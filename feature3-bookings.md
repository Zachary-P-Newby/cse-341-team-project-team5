# Feature 3: Bookings Version 1

## Goal
Implement booking management by creating Mongoose schemas, model functions, API controllers, API routes, and a booking administration page.
## specs
- Rename collectiond `confirmations` to `bookings`
- Create mongoose schema `src/models/schemas/bookings.js`
- Create model functions in `src/models/bookings.js`:
    - createBooking: This function create new booking document
    - getAllBookings: This function retrieves array of all booking document from MongoDb
    - getBookingById: This function retrieves one booking object from MongoDb
- Create API controller function in `src/controllers/bookings.js`:
    - getAllBookings: This should send JSON responses with the appropriate status codes for success, failure, and so forth
- Create API route in `src/routes/api-routes.js`:
    - /api/bookings: returns all bookings. This route include swagger documentation

- Move `processBookingRequest` to `controllers/bookings.js` and refactor it to use the new booking model functions

- Move `bookingPage`  to `controllers/bookings.js` and refactor it to use the new booking model functions

- Update the routing logic for the existing booking routes  

- Create new booking admin page in `src/views/bookings.ejs` with an EJS controller in `src/controllers/bookings.js` and an EJS route that maps to `/bookings-admin`

## Swagger Documentation

- Every route must have a swagger document to explain what it does, the response body, parameters and status code

## Implementation note
- Book documents are store in 'bookings' colletions
=========================================================================================================

# Feature 3: Bookings Version 2

## Goal
Implement booking management by creating Mongoose schemas, model functions, API controllers, API routes, and a booking administration page.
## Specs
### Database and Model
- Rename the existing `confirmations` collection to `bookings`.
- Create the Mongoose schema in `src/models/schemas/bookings.js`.
- Create model functions in `src/models/bookings.js`:
    - createBooking: Creates a new booking document in MongoDB.
    - getAllBookings: Retrieves all booking documents from MongoDB.
    - getBookingById: Retrieves a single booking document by its ID.

### API Controllers
- Create `src/controllers/bookings.js` with the following controller functions:

 - `getAllBookings`:
        - Retrieves all bookings using the booking model.
        - Returns an appropriate JSON response.
        - Handles successful requests and potential errors using appropriate HTTP status codes:
            -200 code: For successfull retrieval
            - 500 code: Unexpected error

### API Routes
Create `src/routes/api-routes.js` with routes:

    - `GET /api/bookings` to retrieve all bookings and include Swagger documentation for the route.


### Refactor Existing Booking Logic
- Move `processBookingRequest` to `src/controllers/bookings.js` and refactor it to use the new booking model functions.
- Move `bookingPage` to `src/controllers/bookings.js` and refactor it to use the new booking model functions.
- Update the existing booking routes to use the new controller functions and booking model.

### Booking Administration Page
- Create a new EJS view at `src/views/bookings.ejs`.
- Create the corresponding EJS controller function in `src/controllers/bookings.js`.
- Create an EJS route that maps to `/bookings-admin`.
- The page should display booking information retrieved from MongoDB through the booking model.

### Swagger Documentation
Every API routes of this feature must include Swagger documentation describing:

- Route purpose and functionality.
- HTTP method and endpoint.
- Required parameters, if any.
- Expected request body, if applicable.
- Successful response body.
- Possible error responses and their HTTP status codes.

## Implementation Notes
- All booking documents must be stored in the MongoDB bookings collection.
- Use the booking model functions for database operations rather than querying MongoDB directly from controllers.

## Test plan:
- The `confirmations` collection has been renamed to `bookings`, with existing data preserved.
- The booking schema is implemented.
- createBooking, getAllBookings, and getBookingById model functions are implemented in `src/models/bookings.js`.
- The `GET /api/bookings` endpoint works and returns booking documents.
- API responses use appropriate HTTP status codes.
- Swagger documentation is available for all affected API routes.
- `processBookingRequest` uses the new booking model functions.
- `bookingPage` uses the new booking model functions.
- Existing booking routes are updated and continue working.
- The `src/views/bookings.ejs` page displays booking information.
- Database operations are handled through the booking model.