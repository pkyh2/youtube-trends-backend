import express, { Application, Request, Response } from "express";
import cors from "cors";
import trendsRoutes from "./routes/trends.routes";
import testRoutes from "./routes/test.routes";
import categoryRoutes from "./routes/category.routes";
import passiveRoutes from "./routes/passive.routes";
import adminRoutes from "./routes/admin.routes";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/trends", trendsRoutes);
app.use("/api/test", testRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/passive", passiveRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    path: req.path,
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

export default app;
