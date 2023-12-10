import { CountOptions, Model, Op } from "sequelize";
import { FarmModel, FarmResourceModel, ResourceModel } from "../models";
import { calculatePercentage } from "../utils/number";
import { Postgres } from "../database";
import { DashboardModel } from "../models/dasboard";

const getFarmLandUse = async (totalArea, farmOptions: CountOptions) => {
  const totalAgriculturalArea = parseFloat(
    ((await FarmModel.sum("agricultural_area", farmOptions)) ?? 0).toFixed(2)
  );
  const totalVegetationArea = parseFloat(
    ((await FarmModel.sum("vegetation_area", farmOptions)) ?? 0).toFixed(2)
  );

  const total_unused_area = parseFloat(
    (totalArea - totalAgriculturalArea - totalVegetationArea).toFixed(2)
  );

  return {
    agricultural_area: {
      total: totalAgriculturalArea,
      percentage: calculatePercentage(totalAgriculturalArea, totalArea),
    },
    vegetation_area: {
      total: totalVegetationArea,
      percentage: calculatePercentage(totalVegetationArea, totalArea),
    },
    unused_area: {
      total: total_unused_area,
      percentage: calculatePercentage(total_unused_area, totalArea),
    },
  };
};

const getTotalState = async (totalFarm, farmOptions: CountOptions) => {
  const sequelize = Postgres.getInstance().getConnection();
  const countStates = await FarmModel.findAll({
    ...farmOptions,
    attributes: ["state", [sequelize.fn("count", "id"), "total"]],
    group: "state",
  });

  return countStates.map((state) => {
    const total = parseInt(state.dataValues["total"]);
    return {
      ...state.dataValues,
      total,
      percentage: calculatePercentage(total, totalFarm),
    };
  });
};

const getFarmIDs = async (ruralProducerID?: string) => {
  return ruralProducerID
    ? (
        await DashboardModel.getAllFarmIDsFromRuralProducerID(ruralProducerID)
      )[0].map((farm: any) => farm?.id as number)
    : [];
};

const getTotalResource = async (
  farmIDs: never[] | number[],
  farmResourceOptions: CountOptions
) => {
  const totalFarmResourceCount = await FarmResourceModel.count(
    farmResourceOptions
  );

  const [countResource] = await DashboardModel.countResource(
    farmIDs.length ? farmIDs : undefined
  );

  const countStatesWithPercentage = countResource.map((resource: any) => {
    const total = parseInt(resource.count);
    return {
      type: resource.type,
      total,
      percentage: calculatePercentage(total, totalFarmResourceCount),
    };
  });

  return countStatesWithPercentage;
};

const getAllStatistics = async (id?: string) => {
  const farmOptions = id ? { where: { rural_producer_id: parseInt(id) } } : {};
  const totalFarmCount = await FarmModel.count(farmOptions);

  const farmIDs = await getFarmIDs(id);

  const farmResourceOptions =
    id && farmIDs.length ? { where: { farm_id: { [Op.or]: farmIDs } } } : {};

  const totalArea = parseFloat(
    ((await FarmModel.sum("total_area", farmOptions)) ?? 0).toFixed(2)
  );

  return {
    totalFarmCount,
    total_area: totalArea,
    total_state: await getTotalState(totalFarmCount, farmOptions),
    total_resource: await getTotalResource(farmIDs, farmResourceOptions),
    farm_land_use: await getFarmLandUse(totalArea, farmOptions),
  };
};

export { getAllStatistics };
