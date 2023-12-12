import request from "supertest";
import { createApp } from "../../app";

const findAllMock = jest.fn();
const findOneMock = jest.fn();

jest.mock("../../models/", () => ({
  FarmModel: {
    findAll: (...values) => findAllMock(values),
    findOne: (...values) => findOneMock(values),
    create: () => ({
      save: jest.fn().mockResolvedValue({ id: 1 }),
    }),
    update: jest.fn().mockResolvedValue([1]),
    destroy: jest.fn().mockResolvedValue(1),
  },
  RuralProducerModel: {
    findOne: jest.fn().mockResolvedValue({ id: 1 }),
  },
  ResourceModel: {
    findOne: jest.fn().mockResolvedValue({ id: 1 }),
  },
  FarmResourceModel: {
    create: () => ({
      save: jest.fn(),
    }),
    destroy: jest.fn(),
  },
}));

const app = createApp();

const PREFIX = "/farm";

describe("Route /farm", () => {
  describe("Method GET", () => {
    it("Should return 200 in getFarm", async () => {
      const response = await request(app).get(`${PREFIX}`);
      expect(response.status).toBe(200);
    });

    it("Should return 200 in getFarm with id", async () => {
      const response = await request(app).get(`${PREFIX}/2`);
      expect(response.status).toBe(200);
    });

    it("Should call findAll in getFarm", async () => {
      const response = await request(app).get(`${PREFIX}`);
      expect(findAllMock).toHaveBeenCalled();
    });

    it("Should call findAll in getFarm with id", async () => {
      await request(app).get(`${PREFIX}/2`);
      expect(findOneMock).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining({ where: { id: 2 } })])
      );
    });
  });

  describe("Method POST", () => {
    it("Should return status 400 in createFarm with state not valid", async () => {
      const response = await request(app)
        .post(`${PREFIX}`)
        .send({
          name: "Teste",
          city: "São Paulo",
          state: "NT",
          total_area: 19.2,
          agricultural_area: 1,
          vegetation_area: 14.1,
          resources: ["cafe", "soja"],
          rural_producer_id: "2",
        });
      expect(response.status).toBe(400);
    });

    it("Should return status 400 in createFarm with resource not valid", async () => {
      const response = await request(app)
        .post(`${PREFIX}`)
        .send({
          name: "Teste",
          city: "São Paulo",
          state: "SP",
          total_area: 19.2,
          agricultural_area: 1,
          vegetation_area: 14.1,
          resources: ["leite", "soja"],
          rural_producer_id: "2",
        });
      expect(response.status).toBe(400);
    });

    it("Should return status 400 in createFarm with total area smaller than the other areas", async () => {
      const response = await request(app)
        .post(`${PREFIX}`)
        .send({
          name: "Teste",
          city: "São Paulo",
          state: "SP",
          total_area: 5,
          agricultural_area: 1,
          vegetation_area: 14.1,
          resources: ["cafe", "soja"],
          rural_producer_id: "2",
        });
      expect(response.status).toBe(400);
    });

    it("Should return status 201 in createFarm with input valid", async () => {
      const response = await request(app)
        .post(`${PREFIX}`)
        .send({
          name: "Teste",
          city: "São Paulo",
          state: "SP",
          total_area: 19.2,
          agricultural_area: 1,
          vegetation_area: 14.1,
          resources: ["cafe", "soja"],
          rural_producer_id: "2",
        });
      expect(response.status).toBe(201);
    });
  });

  describe("Method PATCH", () => {
    it("Should return status 400 in updateFarm with state not valid", async () => {
      const response = await request(app)
        .patch(`${PREFIX}/1`)
        .send({
          name: "Teste",
          city: "São Paulo",
          state: "NT",
          total_area: 19.2,
          agricultural_area: 1,
          vegetation_area: 14.1,
          resources: ["cafe", "soja"],
          rural_producer_id: "2",
        });
      expect(response.status).toBe(400);
    });

    it("Should return status 400 in updateFarm with resource not valid", async () => {
      const response = await request(app)
        .patch(`${PREFIX}/1`)
        .send({
          name: "Teste",
          city: "São Paulo",
          state: "SP",
          total_area: 19.2,
          agricultural_area: 1,
          vegetation_area: 14.1,
          resources: ["leite", "soja"],
          rural_producer_id: "2",
        });
      expect(response.status).toBe(400);
    });

    it("Should return status 400 in updateFarm with total area smaller than the other areas", async () => {
      const response = await request(app)
        .patch(`${PREFIX}/1`)
        .send({
          name: "Teste",
          city: "São Paulo",
          state: "SP",
          total_area: 5,
          agricultural_area: 1,
          vegetation_area: 14.1,
          resources: ["cafe", "soja"],
          rural_producer_id: "2",
        });
      expect(response.status).toBe(400);
    });

    it("Should return status 204 in updateFarm with input valid", async () => {
      const response = await request(app)
        .patch(`${PREFIX}/1`)
        .send({
          name: "Teste",
          city: "São Paulo",
          state: "SP",
          total_area: 19.2,
          agricultural_area: 1,
          vegetation_area: 14.1,
          resources: ["cafe", "soja"],
          rural_producer_id: "2",
        });
      expect(response.status).toBe(204);
    });
  });

  describe("Method DELETE", () => {
    it("Should return status 204 in deleteRuralProducer", async () => {
      const response = await request(app).delete(`${PREFIX}/1`);
      expect(response.status).toBe(204);
    });
  });
});
