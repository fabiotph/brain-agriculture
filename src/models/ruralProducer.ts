import { DataTypes, Model } from "sequelize";
import { Postgres } from "../database";

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
    }
  );

export { RuralProducerModel };
