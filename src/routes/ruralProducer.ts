import { Router } from "express";
import {
  createRuralProducer,
} from "../controllers";
import { IRequest, InputRuralProducer } from "../types";

const router = Router();

router
  .route("/")
  .get((req, res) => {
  })

  .post((req: IRequest<InputRuralProducer>, res) => {
    createRuralProducer(req.body)
      .then(() => {
        res.status(201).send();
      })
      .catch((err: Error) => {
        console.log("err", err.message);
        res.status(500).json({ error: err.message });
      });
  });

router
  .route("/:id")
  .get((req, res) => {
    
  })
  .patch((req, res) => {
    
  })

  .delete((req, res) => {
    
  });

export { router };
