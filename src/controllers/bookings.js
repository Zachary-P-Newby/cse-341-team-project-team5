import {
    getAllBookings as findAllBookings,
    createBooking
} from "../models/bookings.js";

import { getDb } from '../db/connect.js'; 

import { generateBookingCode } from '../includes/helpers.js';
import { getPaginatedBookings } from "../models/bookings.js";


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
    let passengers = req.body.passengers || [];

    // Normalize passengers in case the form submits an object.
    if (!Array.isArray(passengers)) {
      passengers = Object.values(passengers);
    }

    const booking = {
      id: generateBookingCode(),
      createdAt: new Date(),
      scheduleId: req.body.scheduleId,
      tripId: req.body.tripId,
      ticketClass: req.body.ticketClass,
      selectedDay: req.body.selectedDay,
      passengers,
    };

    const createdBooking = await createBooking(booking);

    return res.redirect(
      `/trips/confirmation/${createdBooking.id}`
    );
  } catch (error) {
    console.error("Error processing booking:", error);

    return res.status(500).send(
      "Unable to process booking request."
    );
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
    const tripDistance = trip.distance

    res.render('trips/book', {
        title: 'Book Trip',
        schedule,
        ticketOptions,
        tripDistance
    });
};


export async function getPaginatedBookingsController(req, res) {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    // Validate page.
    if (
      !Number.isInteger(page) ||
      page < 1
    ) {
      return res.status(400).json({
        message: "Page must be a positive integer.",
      });
    }

    // Validate limit.
    if (
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        message: "Limit must be between 1 and 100.",
      });
    }

    // Validate sorting.
    if (!["createdAt", "id"].includes(sort)) {
      return res.status(400).json({
        message: "Invalid sort field.",
      });
    }

    if (!["asc", "desc"].includes(order)) {
      return res.status(400).json({
        message: "Order must be asc or desc.",
      });
    }

    const result = await getPaginatedBookings({
      page,
      limit,
      sort,
      order,
    });

    return res.status(200).json({
      data: result.data,
      query: {
        sort,
        order,
      },
      pagination: {
        page,
        limit,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
        hasNextPage: page < result.totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error retrieving paginated bookings:", error);

    return res.status(500).json({
      message: "Unable to retrieve bookings.",
    });
  }
}

export function bookingsAdminPage(req, res) {
  return res.render("bookings", {
    title: "Bookings Administration",
  });
}


export {
    getAllBookings,
    processBookingRequest,
    bookingPage
}


