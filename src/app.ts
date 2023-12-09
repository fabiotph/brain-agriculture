import express from "express";
import { farmRouter, ruralProducerRouter } from "./routes";
import { Postgres } from "./database";


export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const connectionDB = Postgres.getInstance().getConnection();

  connectionDB
    .authenticate()
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error: Error) => {
      console.error(`Database connection error: ${error.message}`);
    });

  app.use("/ruralProducer", ruralProducerRouter);

  app.use("/farm", farmRouter);

  return app;
};
