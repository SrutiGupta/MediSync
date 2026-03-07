import Patient from "../models/patient.model.js";

export const getQueue = async (req, res) => {
  try {

    const queue = await Patient.aggregate([
      
      //  Only waiting patients
      {
        $match: { status: "waiting" }
      },

      //  Convert priority to numeric value
      {
        $addFields: {
          priorityValue: {
            $switch: {
              branches: [
                { case: { $eq: ["$priority", "emergency"] }, then: 1 },
                { case: { $eq: ["$priority", "serious"] }, then: 2 },
                { case: { $eq: ["$priority", "normal"] }, then: 3 }
              ],
              default: 4
            }
          }
        }
      },

      //  Sort queue
      {
        $sort: {
          priorityValue: 1,
          arrivalTime: 1
        }
      },

      // 4 Clean response
      {
        $project: {
          name: 1,
          priority: 1,
          arrivalTime: 1,
          status: 1
        }
      }

    ]);

    res.json({
      queueLength: queue.length,
      patients: queue
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};