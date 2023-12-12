import request from "supertest";
import { createApp } from "../../app";

const findAllMock = jest.fn();
const findOneMock = jest.fn();

jest.mock("../../models/", () => ({
  RuralProducerModel: {
    findAll: (...values) => findAllMock(values),
    findOne: (...values) => findOneMock(values),
    create: () => ({
      save: jest.fn(),
    }),
    update: jest.fn().mockResolvedValue([1]),
    destroy: jest.fn().mockResolvedValue(1),
  },
}));

const app = createApp();

const PREFIX = "/ruralProducer";

describe("Route /ruralProducer", () => {
  describe("Method GET", () => {
    it("Should return 200 in getRuralProducer", async () => {
      const response = await request(app).get(`${PREFIX}`);
      expect(response.status).toBe(200);
    });

    it("Should return 200 in getRuralProducer with id", async () => {
      const response = await request(app).get(`${PREFIX}/2`);
      expect(response.status).toBe(200);
    });

    it("Should call findAll in getRuralProducer", async () => {
      const response = await request(app).get(`${PREFIX}`);
      expect(findAllMock).toHaveBeenCalled();
    });

    it("Should call findAll in getRuralProducer with id", async () => {
      await request(app).get(`${PREFIX}/2`);
      expect(findOneMock).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining({ where: { id: 2 } })])
      );
    });
  });

  describe("Method POST", () => {
    it("Should return status 400 in createRuralProducer with cpf not valid", async () => {
      const response = await request(app)
        .post(`${PREFIX}`)
        .send({ cpf: "12345678911", name: "Sandra silva" });
      expect(response.status).toBe(400);
    });

    it("Should return status 201 in createRuralProducer with cpf valid", async () => {
      const response = await request(app)
        .post(`${PREFIX}`)
        .send({ cpf: "03970606020", name: "Sandra silva" });
      expect(response.status).toBe(201);
    });

    it("Should return status 400 in createRuralProducer with cnpj not valid", async () => {
      const response = await request(app)
        .post(`${PREFIX}`)
        .send({ cnpj: "12345678912345", name: "Sandra silva" });
      expect(response.status).toBe(400);
    });

    it("Should return status 201 in createRuralProducer with cnpj valid", async () => {
      const response = await request(app)
        .post(`${PREFIX}`)
        .send({ cnpj: "07019968000109", name: "Sandra silva" });
      expect(response.status).toBe(201);
    });
  });

  describe("Method PATCH", () => {
    it("Should return status 400 in updateRuralProducer with cpf not valid", async () => {
      const response = await request(app)
        .patch(`${PREFIX}/1`)
        .send({ cpf: "12345678911", name: "Sandra silva" });
      expect(response.status).toBe(400);
    });

    it("Should return status 201 in updateRuralProducer with cpf valid", async () => {
      const response = await request(app)
        .patch(`${PREFIX}/1`)
        .send({ cpf: "03970606020", name: "Sandra silva" });
      expect(response.status).toBe(204);
    });

    it("Should return status 400 in updateRuralProducer with cnpj not valid", async () => {
      const response = await request(app)
        .patch(`${PREFIX}/1`)
        .send({ cnpj: "12345678912345", name: "Sandra silva" });
      expect(response.status).toBe(400);
    });

    it("Should return status 201 in updateRuralProducer with cnpj valid", async () => {
      const response = await request(app)
        .patch(`${PREFIX}/1`)
        .send({ cnpj: "07019968000109", name: "Sandra silva" });
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
