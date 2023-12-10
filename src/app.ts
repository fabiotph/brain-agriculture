import express from "express";
import { dashboardRouter, farmRouter, ruralProducerRouter } from "./routes";
import { Postgres } from "./database";
import config from "./config";
import {
  FarmModel,
  FarmResourceModel,
  ResourceModel,
  RuralProducerModel,
} from "./models";
import { mockData } from "./mockData";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const connectionDB = Postgres.getInstance().getConnection();

  connectionDB
    .authenticate()
    .then(() => {
      connectionDB.sync({ force: true });
      console.log("Connected to the database");
    })
    .catch((error: Error) => {
      console.error(`Database connection error: ${error.message}`);
    });

  app.use("/ruralProducer", ruralProducerRouter);

  app.use("/farm", farmRouter);

  app.use("/dashboard", dashboardRouter);

  return app;
};
