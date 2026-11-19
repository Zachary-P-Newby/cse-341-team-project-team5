import booking from "./schemas/bookings.js";

const createBooking = (booking) => { 
    return booking.create(booking);
}

const getAllBookings = () => {
    return booking.find();
}

const getBookingById = (bookingId) => {
    
    return booking.findById(bookingId);
}

export { 
    createBooking,
    getAllBookings,
    getBookingById
 }