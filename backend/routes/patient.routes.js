import express from "express";
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
} from "../controllers/patient.controller.js";
import isAuth from "../middleware/isAuth.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", isAuth, authorizeRoles("receptionist","admin"), createPatient);

router.get("/", isAuth, authorizeRoles("doctor","admin"), getAllPatients);

router.get("/:id", isAuth, getPatientById);

router.put("/:id", isAuth, authorizeRoles("doctor","admin"), updatePatient);

router.delete("/:id", isAuth, authorizeRoles("admin"), deletePatient);

export default router;