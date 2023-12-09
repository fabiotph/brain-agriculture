import Joi from "joi";
import { customValidation } from "../customValidation";
import { InputFarm } from "../../types";
import { isValidState } from "../../utils/state";

const CreateFarmSchema = Joi.object<InputFarm>({
  name: Joi.string().required().messages(customValidation("farm.name")),
  city: Joi.string().required().messages(customValidation("city")),
  state: Joi.string()
    .min(2)
    .max(2)
    .required()
    .custom(isValidState)
    .messages(customValidation("state")),
  total_area: Joi.number().required().messages(customValidation("total_area")),
  agricultural_area: Joi.number()
    .required()
    .messages(customValidation("agricultural_area")),
  vegetation_area: Joi.number()
    .required()
    .messages(customValidation("vegetation_area")),
  resources: Joi.array().min(1).items(Joi.string()).required(),
  rural_producer_id: Joi.number()
    .required()
    .messages(customValidation("rural_producer_id")),
});

export { CreateFarmSchema };
