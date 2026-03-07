import express from "express";
import { getQueue } from "../controllers/queue.controller.js";

const router = express.Router();

router.get("/", getQueue);

export default router;