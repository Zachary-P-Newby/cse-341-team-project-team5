
import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    scheduleId: String,
    tripId: String,
    ticketClass: {
      type: String,
      enum: ["standard", "premium", "first"],
    },
    selectedDay: String,
    passengers: {
      type: [passengerSchema],
      default: [],
    },

    // Legacy fields: preserve compatibility with older records.
    passengerFirstName: String,
    passengerLastName: String,
    passengerEmail: String,
    passengerPhone: String,
  },
  {
    collection: "bookings",
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
