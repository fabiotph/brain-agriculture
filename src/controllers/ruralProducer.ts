import { RuralProducerModel } from "../models";
import { InputRuralProducer } from "../types";

const createRuralProducer = async (input: InputRuralProducer) => {

  const { cpf, cnpj, name } = input;

  await (
    await RuralProducerModel.create({
      cpf,
      cnpj,
      name,
    })
  ).save();
};



export { createRuralProducer };
