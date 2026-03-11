import mongoose from "mongoose";

const bedSchema = new mongoose.Schema({

  bedNumber: {
    type: String,
    required: true,
    unique: true
  },

  ward: {
    type: String,
    enum: ["general", "ICU", "emergency"],
    required: true
  },

  status: {
    type: String,
    enum: ["available", "occupied", "maintenance"],
    default: "available"
  },

  assignedPatient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    default: null
  }

}, { timestamps: true });

const Bed = mongoose.model("Bed", bedSchema);

export default Bed;