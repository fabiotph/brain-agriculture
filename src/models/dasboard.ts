import { Postgres } from "../database";

class DashboardModel {
  public static countResource(ids?: number[]) {
    const innerJoin =
      ids && ids.length
        ? `INNER JOIN farms as farm ON farm.id = farm_resource.farm_id WHERE farm.id IN (${ids.toString()})`
        : "";
    return Postgres.getInstance()
      .getConnection()
      .query(
        `SELECT resource.type, count(farm_resource.resource_id) from
            farm_resources as farm_resource INNER JOIN resources as resource
            ON resource.id = farm_resource.resource_id ${innerJoin} GROUP BY resource.id`
      );
  }

  public static getAllFarmIDsFromRuralProducerID(id: string) {
    return Postgres.getInstance()
      .getConnection()
      .query(
        `SELECT farm.id from farms as farm INNER JOIN rural_producers as rural_producer
            ON rural_producer.id = farm.rural_producer_id WHERE rural_producer.id = ${id}`
      );
  }
}

export { DashboardModel };
