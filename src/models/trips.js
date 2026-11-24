// used ai
import Trip from './schemas/trips.js';


// gets all trips from database
// returns an array 
const getAllTrips = async () => {
  return await Trip.find({});
};


// returns a single trip 
const getTripById = async (id) => {
  if (!id || typeof id !== 'string')
    return null;
  

  return await Trip.findOne({ id: id.trim() });
};

export {getAllTrips, getTripById}