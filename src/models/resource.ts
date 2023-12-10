import { DataTypes, Model } from "sequelize";
import { Postgres } from "../database";

class ResourceModel extends Model {}

ResourceModel.init(
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: Postgres.getInstance().getConnection(),
    modelName: "resource",
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
