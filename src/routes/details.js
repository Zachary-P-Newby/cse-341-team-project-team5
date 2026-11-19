import { getDb } from '../db/connect.js';

export default async (req, res) => {
    const { tripId } = req.params;
    const db = getDb();
    const details = await db.collection('trips').findOne({ id: tripId });
    details.schedules = await db.collection('schedules').find({ tripId }).toArray();

    
    let startStationDetails = await db.collection('stations').findOne({id:details.startStation});
    
    let endStationDetails = await db.collection('stations').findOne({id:details.endStation});

    if(!startStationDetails){
        startStationDetails = {
        error: "Station Unavailible"
        }
    }

    if(!endStationDetails){
        endStationDetails = {
        error: "Station Unavailible"
        }
    }

    res.render('trips/details', {
        title: 'Trip Details',
        details,
        startStationDetails,
        endStationDetails
    });
};


