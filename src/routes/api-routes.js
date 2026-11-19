import express from "express";

import { 
    getAllBookings

 } from "../controllers/bookings.js";

const router = express.Router();

/**
 * @openapi
 * /api/bookings:
 *   get:
 *     summary: Retrieve all bookings
 *     tags:
 *       - Bookings
 *     responses:
 *       200:
 *         description: Bookings retrieved successfully
 *       500:
 *         description: Unable to retrieve bookings
 */
router.get("/bookings", getAllBookings);


export default router;



