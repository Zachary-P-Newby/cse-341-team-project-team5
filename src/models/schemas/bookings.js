import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    id: {
        type: String,
        required: true,
        unique: true,
    },
    createAt: {
        type: String,
        required: true
    },
    passengerFirstName:{
        type: String,
        required: true,
        trim: true
    },
    passengerLastName:{
        type: String,
        required: true,
        trim: true
    },
    passengerEmail:{
        type: String,
        required: true,
    },

    passengerPhone:{
        type: String,
        required: true,
    },

});


const booking = mongoose.model("Booking", bookingSchema);

export default booking;