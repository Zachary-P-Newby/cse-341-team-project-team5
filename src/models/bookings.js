
import Booking from "./schemas/bookings.js";

export async function createBooking(book) {
  return Booking.create(book);
}

export async function getAllBookings() {
  return Booking.find({}).lean();
}

export async function getBookingById(bookingId) {
  return Booking.findOne({ id: bookingId }).lean();
}

export async function getPaginatedBookings({
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "desc",
  filters = {},
}) {
  const skip = (page - 1) * limit;

  const allowedSortFields = ["createdAt", "id"];

  if (!allowedSortFields.includes(sort)) {
    throw new Error("Invalid sort field");
  }

  const sortDirection = order === "asc" ? 1 : -1;

  const query = {};

  if (filters.ticketClass) {
    query.ticketClass = filters.ticketClass;
  }

  if (filters.startDate || filters.endDate) {
    query.createdAt = {};

    if (filters.startDate) {
      query.createdAt.$gte = new Date(filters.startDate);
    }

    if (filters.endDate) {
      const end = new Date(filters.endDate);
      end.setUTCHours(23, 59, 59, 999);
      query.createdAt.$lte = end;
    }
  }

  const [data, totalItems] = await Promise.all([
    Booking.find(query)
      .sort({ [sort]: sortDirection })
      .skip(skip)
      .limit(limit)
      .lean(),

    Booking.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  return {
    data,
    totalItems,
    totalPages,
  };
}
