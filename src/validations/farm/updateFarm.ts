import Joi from "joi";
import { customValidation } from "../customValidation";
import { InputFarm } from "../../types";
import { isValidState } from "../../utils/state";

const UpdateFarmSchema = Joi.object<InputFarm>({
  name: Joi.string().messages(customValidation("farm.name")),
  city: Joi.string().messages(customValidation("city")),
  state: Joi.string()
    .min(2)
    .max(2)
    .custom(isValidState)
    .messages(customValidation("state")),
  total_area: Joi.number().messages(customValidation("total_area")),
  agricultural_area: Joi.number()
    .messages(customValidation("agricultural_area")),
  vegetation_area: Joi.number()
    .messages(customValidation("vegetation_area")),
  resources: Joi.array().min(1).items(Joi.string()),
  rural_producer_id: Joi.number()
    .messages(customValidation("rural_producer_id")),
});

export { UpdateFarmSchema };
