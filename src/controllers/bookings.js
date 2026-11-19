import {
    getAllBookings as findAllBookings,
    createBooking
} from "../models/bookings.js";

import { generateBookingCode } from '../includes/helpers.js';


const getAllBookings = async (req, res) => {

    try {
        const Allbookings = await findAllBookings();
        return res.status(200).json(Allbookings);
    } catch (error) {
        console.log("Error fetching bookings:", error);

        return res.status(500).json(
            { message: "Unable to fetch bookings" }
        );
    }
};


const processBookingRequest = async (req, res) => {
   try {
     const booking = {
        id: generateBookingCode(),
        createdAt: new Date().toISOString(),
        ...req.body
    };
    const createdBooking = await createBooking(booking);

    res.redirect(`/trips/confirmation/${createdBooking.id}`);
   }catch (error) {
    console.error("Error processing booking request:", error);
    return res.status(500).json({ message: "Unable to process booking request" });
   }
};


const bookingPage = async (req, res) => {
    const { scheduleId } = req.params;

    const db = getDb();
    const schedule = await db.collection('schedules').findOne({ id: Number(scheduleId) });
    const trip = await db.collection('trips').findOne({ id: schedule.tripId });
    const ticketClasses = await db.collection('ticketClasses').find({}).toArray();
    const ticketOptions = ticketClasses.map((ticketClass) => ({
        class: ticketClass.class,
        name: ticketClass.name,
        price: trip.distance * ticketClass.pricePerKm,
        amenities: ticketClass.amenities,
        description: ticketClass.description
    }));

    res.render('trips/book', {
        title: 'Book Trip',
        schedule,
        ticketOptions
    });
};


export {
    getAllBookings,
    processBookingRequest,
    bookingPage
}
