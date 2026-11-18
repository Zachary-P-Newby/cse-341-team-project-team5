import { getDb } from '../db/connect.js';

const tripsPage = (req, res) => {
    res.render('trips', { title: 'Trips' });
};

const tripsApi = async (req, res, next) => {
    try {
        const trips = await getDb().collection('trips').find({}).toArray();
        return res.json({ trips });
    } catch (error) {
        return next(error);
    }
};

export { tripsApi, tripsPage };
