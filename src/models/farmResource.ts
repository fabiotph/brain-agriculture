import { Postgres } from "../database";
import { FarmModel } from "./farm";
import { ResourceModel } from "./resource";

const FarmResourceModel = Postgres.getInstance()
  .getConnection()
  .define(
    "farm_resource",
    {},
    {
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["farm_id", "resource_id"],
          where: {
            deletedAt: null,
          },
        },
      ],
    }
  );

FarmResourceModel.removeAttribute("id");

FarmModel.belongsToMany(ResourceModel, {
  through: "farm_resource",
  foreignKey: "farm_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});
ResourceModel.belongsToMany(FarmModel, {
  through: "farm_resource",
  foreignKey: "resource_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});

export { FarmResourceModel };
