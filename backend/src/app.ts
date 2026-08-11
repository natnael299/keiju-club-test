import cors from "cors";
import express from "express";

import healthRoutes from "./routes/health.routes.js";
import ownersRoutes from "./routes/owners.routes.js";
import notificationsRoutes from "./routes/notifications.routes.js";
import clubEventsRoutes from "./routes/clubEvents.routes.js";
import authRouter from "./routes/auth.routes.js";
import reportsRoutes from "./routes/reports.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/health", healthRoutes);
app.use("/api/owners", ownersRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/club-events", clubEventsRoutes);
app.use("/api/reports", reportsRoutes);
app.get("/api/test", (_req, res) => {
  res.json({ ok: true });
});

export default app;
