import { FarmModel, ResourceModel, RuralProducerModel } from "../models";
import { InputRuralProducer } from "../types";
import { CreateRuralProducerSchema } from "../validations/ruralProducer/createRuralProducer";
import { UpdateRuralProducerSchema } from "../validations/ruralProducer/updateRuralProducer";

const createRuralProducer = async (input: InputRuralProducer) => {
  const validation = CreateRuralProducerSchema.validate(input);

  if (validation.error) throw Error(`${validation.error}`);

  const { cpf, cnpj, name } = input;

  await (
    await RuralProducerModel.create({
      cpf,
      cnpj,
      name,
    })
  ).save();
};

const getProducer = async (id?: string) => {
  const include = [
    {
      model: FarmModel,
      attributes: { exclude: ["rural_producer_id", "deletedAt"] },
      include: [
        {
          model: ResourceModel,
          attributes: ["type"],
          through: {
            attributes: [],
          },
        },
      ],
    },
  ];

  const attributes = { exclude: ["deletedAt"] };

  return id
    ? RuralProducerModel.findOne({
        where: { id: parseInt(id) },
        include,
        attributes,
      })
    : RuralProducerModel.findAll({ include, attributes });
};

const updateRuralProducer = async (id: string, input: InputRuralProducer) => {
  const validation = UpdateRuralProducerSchema.validate(input);

  if (validation.error) throw Error(`${validation.error}`);

  const { cpf, cnpj, name } = input;

  const [affectedRows] = await RuralProducerModel.update(input, {
    where: { id: parseInt(id) },
  });

  if(!affectedRows)
    throw Error('RuralProducer not registred');
};

const deleteRuralProducer = async (id: string) => {
  const affectedRows = await RuralProducerModel.destroy({ where: { id: parseInt(id) } });
  if (!affectedRows) throw Error("RuralProducer not found");
};

export { createRuralProducer, updateRuralProducer, getProducer, deleteRuralProducer };
