import { Router } from "express";
import {
  createRuralProducer,
  deleteRuralProducer,
  getProducer,
  updateRuralProducer,
} from "../controllers";
import { IRequest, InputRuralProducer } from "../types";

const router = Router();

router
  .route("/")
  .get((req, res) => {
    getProducer()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err: Error) => {
        console.log("err", err.message);
        res.status(400).json({ error: err.message });
      });
  })

  .post((req: IRequest<InputRuralProducer>, res) => {
    createRuralProducer(req.body)
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
    getProducer(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err: Error) => {
        console.log("err", err.message);
        res.status(400).json({ error: err.message });
      });
  })
  .patch((req: IRequest<InputRuralProducer>, res) => {
    const id = req.params["id"];
    updateRuralProducer(id, req.body)
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
    deleteRuralProducer(id).then(()=>{
      res.status(204).send();
    }).catch((err) => {
      console.log("err", err.message);
      res.status(400).json({ error: err.message });
    });
  });

export { router };
