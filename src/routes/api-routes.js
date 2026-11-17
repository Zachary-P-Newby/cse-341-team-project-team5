
import { Router } from "express";
import {
  getAllTicketClasses,
  getTicketClassesForDay,
} from "../controllers/ticket-classes.js";

const router = Router();

/**
 * @openapi
 * /api/ticket-classes:
 *   get:
 *     summary: Get ticket classes
 *     tags:
 *       - Ticket Classes
 *     parameters:
 *       - in: query
 *         name: day
 *         required: false
 *         schema:
 *           type: string
 *           enum: [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
 *         description: Optional weekday used to filter available ticket classes
 *     responses:
 *       200:
 *         description: List of ticket classes
 *       400:
 *         description: Invalid weekday
 *       500:
 *         description: Failed to fetch ticket classes
 */
router.get("/ticket-classes", (req, res, next) => {
  if (req.query.day) {
    return getTicketClassesForDay(req, res, next);
  }

  return getAllTicketClasses(req, res, next);
});

export default router;

