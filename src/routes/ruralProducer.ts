import { Router } from "express";

const router = Router();

router
  .route("/")
  .get((req, res) => {})
  .post((req, res) => {})
  .patch((req, res) => {})
  .delete((req, res) => {});

export { router };