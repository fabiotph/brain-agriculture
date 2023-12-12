import { DataTypes } from "sequelize";
import { Postgres } from "../database";

const ResourceModel = Postgres.getInstance()
  .getConnection()
  .define(
    "resource",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["type"],
          where: {
            deletedAt: null,
          },
        },
      ],
    }
  );

export { ResourceModel };
