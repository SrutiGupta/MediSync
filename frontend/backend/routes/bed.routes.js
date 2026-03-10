import express from "express";
import {
  createBed,
  getAllBeds,
  assignBed,
  releaseBed
} from "../controllers/bed.controller.js";

const router = express.Router();

router.post("/", createBed);
router.get("/", getAllBeds);
router.post("/assign", assignBed);
router.post("/release", releaseBed);

export default router;