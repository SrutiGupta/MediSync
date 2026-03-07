import Bed from "../models/bed.model.js";
import Patient from "../models/patient.model.js";
export const createBed = async (req, res) => {
try{
    //create beds
    const {bedNumber,ward}=req.body;
    const bed=await Bed.create({
        bedNumber,ward
    });
    res.status(201).json({
      message: "Bed created successfully",
      bed
    });
}
catch(error)
{
    res.status(500).json({ message: error.message });
}
};
//get all beds
export const getAllBeds = async (req, res) => {
  try {

    const beds = await Bed.find().populate("assignedPatient");

    res.status(200).json(beds);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//vvimp:assign bed to patient 
export const assignBed = async (req, res) => {
  try {

    const { patientId, bedId } = req.body;

    const bed = await Bed.findById(bedId);

    if (!bed) {
      return res.status(404).json({ message: "Bed not found" });
    }

    if (bed.status === "occupied") {
      return res.status(400).json({ message: "Bed already occupied" });
    }

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // update bed
    bed.status = "occupied";
    bed.assignedPatient = patientId;
    await bed.save();

    // update patient
    patient.status = "admitted";
    patient.bedAssigned = bedId;
    patient.admittedAt = new Date();
    await patient.save();

    res.status(200).json({
      message: "Bed assigned successfully",
      bed
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//release bed means discharge patient
export const releaseBed = async (req, res) => {
  try {

    const { bedId } = req.body;

    const bed = await Bed.findById(bedId);

    if (!bed) {
      return res.status(404).json({ message: "Bed not found" });
    }

    const patientId = bed.assignedPatient;

    if (patientId) {

      await Patient.findByIdAndUpdate(patientId, {
        status: "discharged",
        bedAssigned: null
      });

    }

    bed.status = "available";
    bed.assignedPatient = null;

    await bed.save();

    res.status(200).json({
      message: "Bed released successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};