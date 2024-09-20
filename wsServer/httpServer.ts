import express from "express";
import compression from "compression";
import morgan from "morgan";
import { logger } from "./index";

export function setupExpress(app: express.Application) {
  app.use(compression());
  app.disable("x-powered-by");
  app.use(morgan("dev"));

  // Add any additional middleware or routes here
  app.get("/", (req, res) => {
    res.send("Server is running");
  });

  logger.info("server", "Express setup completed");
}
