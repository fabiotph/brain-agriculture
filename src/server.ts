import config from "./config";
import express from "express";

const app = express();

app.listen(config.port, () => {
  console.log(
    `\n Running into: PORT: ${config.port} | ENV: ${config.environment}`
  );
});
