import booking from "./schemas/bookings.js";

const createBooking = (book) => { 
    return booking.create(book);
}

const getAllBookings = () => {
    return booking.find().lean();
}

const getBookingById = (bookingId) => {
    
    return booking.findById(bookingId).lean();
}

export { 
    createBooking,
    getAllBookings,
    getBookingById
 }