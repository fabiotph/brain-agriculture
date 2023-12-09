import Joi from "joi";

import { customValidation } from "../customValidation";
import { InputRuralProducer } from "../../types";
import { isValidCPF } from "../../utils/cpf";
import { isValidCNPJ } from "../../utils/cnpj";

const CreateRuralProducerSchema = Joi.object<InputRuralProducer>({
  cpf: Joi.string()
    .min(11)
    .max(11)
    .regex(/^\d+$/)
    .custom(isValidCPF)
    .messages(customValidation("cpf", "/^d+$/")),
  cnpj: Joi.string()
    .min(14)
    .max(14)
    .regex(/^\d+$/)
    .custom(isValidCNPJ)
    .messages(customValidation("cnpj")),
  name: Joi.string().required().messages(customValidation("name", "/^d+$/")),
}).or("cpf", "cnpj");

export { CreateRuralProducerSchema };
