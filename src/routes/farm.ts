import { Router } from "express";
import { IRequest, InputFarm } from "../types";
import {
  createFarm,
  deleteFarm,
  getFarm,
  updateFarm,
} from "../controllers/farm";

const router = Router();

router
  .route("/")
  .get((req, res) => {
    getFarm()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err: Error) => {
        console.log("err", err.message);
        res.status(400).json({ error: err.message });
      });
  })
  .post((req: IRequest<InputFarm>, res) => {
    createFarm(req.body)
      .then(() => {
        res.status(201).send();
      })
      .catch((err: Error) => {
        console.log("err", err.message);
        res.status(400).json({ error: err.message });
      });
  });

router
  .route("/:id")
  .get((req, res) => {
    const id = req.params["id"];
    getFarm(id)
      .then((data) => {
        res.status(200).json(data ?? id ? {} : []);
      })
      .catch((err: Error) => {
        console.log("err", err.message);
        res.status(400).json({ error: err.message });
      });
  })

  .patch((req: IRequest<InputFarm>, res) => {
    const id = req.params["id"];
    updateFarm(id, req.body)
      .then(() => {
        res.status(204).send();
      })
      .catch((err: Error) => {
        console.log("err", err.message);
        res.status(400).json({ error: err.message });
      });
  })

  .delete((req, res) => {
    const id = req.params["id"];
    deleteFarm(id)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        console.log("err", err.message);
        res.status(400).json({ error: err.message });
      });
  });

export { router };
