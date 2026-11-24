
import { getDb } from "../db/connect.js";
import {
  getAllTicketClasses as findAllTicketClasses,
  getTicketClassesForDay as findTicketClassesForDay,
} from "../models/ticket-classes.js";

const validDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export async function getAllTicketClasses(req, res) {
  try {
    const ticketClasses = await findAllTicketClasses();

    return res.status(200).json(ticketClasses);
  } catch (error) {
    console.error("Error fetching ticket classes:", error);

    return res.status(500).json({
      error: "Failed to fetch ticket classes",
    });
  }
}

export async function getTicketClassesForDay(req, res) {
  try {
    const day = req.query.day?.toLowerCase();

    if (!day || !validDays.includes(day)) {
      return res.status(400).json({
        error: "A valid weekday is required.",
      });
    }

    const ticketClasses = await findTicketClassesForDay(day);

    return res.status(200).json(ticketClasses);
  } catch (error) {
    console.error("Error fetching ticket classes for day:", error);

    return res.status(500).json({
      error: "Failed to fetch ticket classes",
    });
  }
}

// EJS controller for the booking page.
export async function bookingPage(req, res, next) {
  try {
    const { scheduleId } = req.params;
    const db = getDb();

    const schedule = await db.collection("schedules").findOne({
      id: Number(scheduleId),
    });

    if (!schedule) {
      return res.status(404).render("errors/404", {
        title: "Schedule Not Found",
      });
    }

    const trip = await db.collection("trips").findOne({
      id: schedule.tripId,
    });

    if (!trip) {
      return res.status(404).render("errors/404", {
        title: "Trip Not Found",
      });
    }

    const ticketClasses = await findAllTicketClasses();

    const ticketOptions = ticketClasses.map((ticketClass) => ({
      class: ticketClass.class,
      name: ticketClass.name,
      price: trip.distance * ticketClass.pricePerKm,
      pricePerKm: ticketClass.pricePerKm,
      amenities: ticketClass.amenities,
      description: ticketClass.description,
      availableDays: ticketClass.availableDays,
    }));

    return res.render("trips/book", {
      title: "Book Trip",
      schedule,
      ticketOptions,
      tripDistance: trip.distance,
    });
  } catch (error) {
    return next(error);
  }
}
