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

export { getAllTrips, getTripsById}