import express from "express";
import { farmRouter, ruralProducerRouter } from "./routes";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/ruralProducer", ruralProducerRouter);

  app.use("/farm", farmRouter);

  return app;
};
