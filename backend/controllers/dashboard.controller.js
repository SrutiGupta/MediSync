import Patient from "../models/patient.model.js";
import Bed from "../models/bed.model.js";

export const getDashboardStats = async (req, res) => {
  try {

    // PATIENT STATS USING AGGREGATION
    const patientStats = await Patient.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert aggregation result to object
    const patientData = {
      waiting: 0,
      admitted: 0,
      discharged: 0
    };

    patientStats.forEach(item => {
      patientData[item._id] = item.count;
    });


    // BED STATS USING AGGREGATION
    const bedStats = await Bed.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const bedData = {
      available: 0,
      occupied: 0
    };

    bedStats.forEach(item => {
      bedData[item._id] = item.count;
    });


    // TOTAL PATIENTS
    const totalPatients = await Patient.countDocuments();


    res.json({
      totalPatients,
      waitingPatients: patientData.waiting,
      admittedPatients: patientData.admitted,
      dischargedPatients: patientData.discharged,
      availableBeds: bedData.available,
      occupiedBeds: bedData.occupied
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};