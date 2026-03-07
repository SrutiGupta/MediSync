import Patient from "../models/patient.model.js";

// Create patient
export const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate("doctorAssigned")
      .populate("bedAssigned");

    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single patient
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update patient
export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete patient
export const deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};