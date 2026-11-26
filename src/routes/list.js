// Don't add things to this file.  It was deleted and then came back.  It should not be here. If you want to, you can move the code to ejs-routes
import { getDb } from '../db/connect.js';

export default async (req, res) => {
    const db = getDb();
    const [regions, trips, seasons] = await Promise.all([
        db.collection('trips').distinct('region'),
        db.collection('trips').find({}).toArray(),
        db.collection('trips').distinct('bestSeason')
    ]);

    res.render('trips/list', {
        title: 'Scenic Train Trips',
        regions,
        trips,
        seasons
    });
};
