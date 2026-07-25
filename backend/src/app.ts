import cors from "cors";
import express from "express";

import healthRoutes from "./routes/health.routes";
import ownersRoutes from "./routes/owners.routes";
import notificationsRoutes from "./routes/notifications.routes";
import clubEventsRoutes from "./routes/clubEvents.routes";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/health", healthRoutes);
app.use("/api/owners", ownersRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/club-events", clubEventsRoutes);

app.get("/api/test", (_req, res) => {
  res.json({ ok: true });
});

export default app;
