import {
  FarmModel,
  FarmResourceModel,
  ResourceModel,
  RuralProducerModel,
} from "../models";
import { InputFarm } from "../types";
import { sanitizeAndValidateResources } from "../utils/resource";
import { CreateFarmSchema } from "../validations/farm/createFarm";
import { UpdateFarmSchema } from "../validations/farm/updateFarm";

const createFarm = async (input: InputFarm) => {
  const validation = CreateFarmSchema.validate(input);
  if (validation.error) throw Error(`${validation.error}`);

  const { isValid: isValidResource, data: resourcesHandled } =
    sanitizeAndValidateResources(input.resources);
  if (!isValidResource) throw Error("ValidationError: resource is invalid");

  const {
    name,
    city,
    state,
    total_area,
    agricultural_area,
    vegetation_area,
    rural_producer_id,
  } = input;

  if (agricultural_area + vegetation_area > total_area)
    throw Error("ValidationError: total_area smaller than the other areas");

  const ruralProducerStored = await RuralProducerModel.findOne({
    where: { id: rural_producer_id },
  });

  if (!ruralProducerStored) throw Error("Rural producer not registred");

  const newFarm = await (
    await FarmModel.create({
      name,
      city,
      state: state.toUpperCase(),
      total_area,
      agricultural_area,
      vegetation_area,
      rural_producer_id: ruralProducerStored["id"],
    })
  ).save();

  for (const res of resourcesHandled) {
    const resourceStored = await ResourceModel.findOne({
      where: { type: res },
    });
    if (resourceStored)
      await (
        await FarmResourceModel.create({
          farm_id: newFarm["id"],
          resource_id: resourceStored["id"],
        })
      ).save();
  }
};

const getFarm = async (id?: string) => {
  const include = [
    {
      model: ResourceModel,
      attributes: ["type"],
      through: {
        attributes: [],
      },
    },
    {
      model: RuralProducerModel,
      attributes: { exclude: ["deletedAt"] },
    },
  ];
  const attributes = { exclude: ["deletedAt", "rural_producer_id"] };
  return id
    ? FarmModel.findOne({
        where: { id: parseInt(id) },
        include,
        attributes,
      })
    : FarmModel.findAll({ include, attributes });
};

const updateFarm = async (id: string, input: InputFarm) => {
  const validation = UpdateFarmSchema.validate(input);

  if (validation.error) throw Error(`${validation.error}`);

  const { isValid: isValidResource, data: resourcesHandled } =
    sanitizeAndValidateResources(input.resources ?? []);
  if (!isValidResource) throw Error("ValidationError: resource is invalid");

  const {
    name,
    city,
    state,
    total_area,
    agricultural_area,
    vegetation_area,
    rural_producer_id,
  } = input;

  if (agricultural_area + vegetation_area > total_area)
    throw Error("ValidationError: total_area smaller than the other areas");

  const ruralProducerStoredId = rural_producer_id
    ? (
        await RuralProducerModel.findOne({
          where: { id: rural_producer_id },
        })
      )?.["id"]
    : undefined;

  if (rural_producer_id && !ruralProducerStoredId)
    throw Error("Rural producer not registred");

  const [affectedRows] = await FarmModel.update(
    {
      name,
      city,
      state: state?.toUpperCase(),
      total_area,
      agricultural_area,
      vegetation_area,
      rural_producer_id: ruralProducerStoredId,
    },
    {
      where: { id: parseInt(id) },
    }
  );

  if (!affectedRows) throw Error("Farm not registred");
  else if (!input.resources) return;

  FarmResourceModel.destroy({ where: { farm_id: id } });

  for (const res of resourcesHandled) {
    const resourceStored = await ResourceModel.findOne({
      where: { type: res },
    });
   
    if (resourceStored)
      await (
        await FarmResourceModel.create({
          farm_id: id,
          resource_id: resourceStored["id"],
        })
      ).save();
  }

  return;
};

const deleteFarm = async (id: string) => {
  const affectedRows = await FarmModel.destroy({ where: { id: parseInt(id) } });
  if (!affectedRows) throw Error("Farm not registred");
};

export { createFarm, getFarm, updateFarm, deleteFarm };
