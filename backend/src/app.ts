import cors from "cors";
import express from "express";

import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import clubEventsRoutes from "./routes/clubEvents.routes.js";
import healthRoutes from "./routes/health.routes.js";
import notificationsRoutes from "./routes/notifications.routes.js";
import organizationsRoutes from "./routes/organizations.routes.js";
import ownersRoutes from "./routes/owners.routes.js";
import reportsRoutes from "./routes/reports.routes.js";

const app = express();

app.disable("x-powered-by");

app.use(cors());

app.use(
  express.json({
    limit: "1mb",
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/owners", ownersRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/club-events", clubEventsRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/organizations", organizationsRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
