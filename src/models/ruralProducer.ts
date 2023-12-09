import { DataTypes } from "sequelize";
import { Postgres } from "../database";
import { FarmModel } from "./farm";

const RuralProducerModel = Postgres.getInstance()
  .getConnection()
  .define(
    "rural_producer",
    {
      cpf: DataTypes.CHAR(11),
      cnpj: DataTypes.CHAR(14),
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["cpf"],
          where: {
            deletedAt: null,
          },
        },
        {
          unique: true,
          fields: ["cnpj"],
          where: {
            deletedAt: null,
          },
        },
      ],
    }
  );
RuralProducerModel.hasMany(FarmModel, {
  foreignKey: "rural_producer_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});
FarmModel.belongsTo(RuralProducerModel, {
  foreignKey: "rural_producer_id",
  onDelete: "cascade",
  onUpdate: "cascade",
});

export { RuralProducerModel };
