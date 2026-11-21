
import TicketClass from "./schemas/ticket-classes.js";

export async function getAllTicketClasses() {
  return TicketClass.find({}).sort({ pricePerKm: 1 }).lean();
}

export async function getTicketClassesForDay(day) {
  const normalizedDay = day.trim().toLowerCase();

  return TicketClass.find({
    availableDays: normalizedDay,
  })
    .sort({ pricePerKm: 1 })
    .lean();
}
