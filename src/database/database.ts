import { Dialect, Sequelize } from "sequelize";
import config from "../config";

class DatabaseSingleton {
  protected static instance: DatabaseSingleton | null = null;
  protected connection: Sequelize | null = null;

  protected constructor() {
    this.connection = this.createDatabaseConnection();
  }

  protected createDatabaseConnection() {
    const { dialect, host, name, password, user } = config.db;
    const sequelize = new Sequelize(name, user, password, {
      host,
      dialect: dialect as Dialect,
    });

    return sequelize;
  }

  public static getInstance() {
    if (!this.instance) this.instance = new DatabaseSingleton();
    return this.instance;
  }

  public getConnection() {
    return this.connection as Sequelize;
  }
}

export { DatabaseSingleton };
