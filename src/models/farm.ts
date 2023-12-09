import { DataTypes } from "sequelize";
import { Postgres } from "../database";

const FarmModel = Postgres.getInstance()
  .getConnection()
  .define(
    "farm",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      total_area: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      agricultural_area: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      vegetation_area: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );

export { FarmModel };
