import express from "express";
import { getAllData } from "../controller/getAllData.js";
import { getDataByParams } from "../controller/getDataByParams.js";
export const router = express.Router();
router.get("", (req , res)=>getAllData(req ,res));
router.get("/:filed/:term", (req , res) => getDataByParams(req , res));
