import express from "express";
import {
  createBed,
  getAllBeds,
  assignBed,
  releaseBed,
  updateBed,
  deleteBed,
} from "../controllers/bed.controller.js";

const router = express.Router();

router.post("/", createBed);
router.get("/", getAllBeds);
router.post("/assign", assignBed);
router.post("/release", releaseBed);
router.put("/:id", updateBed);
router.delete("/:id", deleteBed);

export default router;