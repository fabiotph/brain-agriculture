import { Router } from "express";
import { getAllStatistics } from "../controllers";

const router = Router();

router.route("/").get((req, res) => {
  getAllStatistics()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err });
    });
});

router.route("/:rural_producer_id").get((req, res) => {
  const ruralProducerId = req.params.rural_producer_id;
  getAllStatistics(ruralProducerId).then((data) => {
    res.status(200).json(data);
  }).catch((err: Error) => {
    res.status(500).json({ error: err });
  });
});

export { router };
