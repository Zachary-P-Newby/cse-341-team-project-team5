// src/routes/router.js
import { Router } from "express";
import apiRoutes from "./api-routes.js";
import ejsRoutes from "./ejs-routes.js";

const router = Router();

router.use("/api", apiRoutes); // e.g. GET /api/status
router.use("/", ejsRoutes);    // e.g. GET /

export default router;