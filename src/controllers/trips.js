// used ai
import * as tripModel from '../models/trips.js';

// get /api/trips returns as a json array
const getAllTrips = async (req, res) => {
    try {
        const trips = await tripModel.getAllTrips();
        return res.status(200).json(trips);
    } catch (error) {
        console.error('Error fetching all trips:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /api/trips/:id returns a json object
const getTripById = async (req, res) => {
    try {
        console.log('gettripbyid');
    const { id } = req.params;
    const trip = await tripModel.getTripById(id);
      console.log("trip", trip);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(200).json(trip);
  } catch (error) {
    console.error(`Error fetching trip with id "${req.params.id}":`, error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const renderTripDetailsPage = async (req, res, next) => {
    try {
        const tripId = req.params.id;
        const trip = await tripModel.getTripById(tripId);

        if (!trip) {
            const err = new Error('Trip not found');
            err.status = 404;
            return next(err);
            // Alternatively, if your app renders 404s directly instead of using error middleware:
            // return res.status(404).render('errors/404', { title: 'Trip Not Found' });
        }

        return res.render('trips/details', {
            title: trip.name,
            trip
        });
    } catch (error) {
        return next(error);
    }
};

const renderTripsListPage = (req, res) => {
    res.render('trips/list', {
        title: 'Scenic Train Trips'
    });
};

export { getAllTrips, getTripById, renderTripDetailsPage, renderTripsListPage}