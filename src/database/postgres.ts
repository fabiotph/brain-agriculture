import { Dialect, Sequelize } from "sequelize";
import config from "../config";
import { DatabaseSingleton } from "./database";

class Postgres extends DatabaseSingleton {}

export { Postgres };
