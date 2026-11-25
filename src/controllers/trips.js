// used ai
import * as tripModel from '../models/trips.js';
import { getDb } from '../db/connect.js';
import { getStationById } from '../models/stations.js';


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
        const { id } = req.params;
        const trip = await tripModel.getTripById(id);
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

        const db = getDb();
        trip.schedules = await db.collection('schedules').find({ tripId }).toArray();

        let startStationDetails = await getStationById(trip.startStation);
        
        let endStationDetails = await getStationById(trip.endStation );

        if (!startStationDetails) {
            startStationDetails = {
                error: "Station Unavailable"
            }
        }

        if (!endStationDetails) {
            endStationDetails = {
                error: "Station Unavailable"
            }
        }

        return res.render('trips/details', {
            title: trip.name,
            trip,
            startStationDetails,
            endStationDetails
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
