import express from "express";
import { dataController } from "../controller/dataController.js";

const dataRoutes = express.Router();

dataRoutes.post("/create/:type", dataController);

export default dataRoutes;
