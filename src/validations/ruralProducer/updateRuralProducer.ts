import Joi from "joi";

import { customValidation } from "../customValidation";
import { InputRuralProducer } from "../../types";
import { isValidCPF } from "../../utils/cpf";
import { isValidCNPJ } from "../../utils/cnpj";

const UpdateRuralProducerSchema = Joi.object<InputRuralProducer>({
    cpf: Joi.string()
      .min(11)
      .max(14)
      .custom(isValidCPF)
      .messages(customValidation("cpf")),
    cnpj: Joi.string()
      .min(14)
      .max(18)
      .custom(isValidCNPJ)
      .messages(customValidation("cnpj")),
    name: Joi.string().messages(customValidation("name")),
  });

export { UpdateRuralProducerSchema };
