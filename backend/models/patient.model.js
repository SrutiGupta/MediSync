import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  disease: {
    type: String,
    required: true
  },

  doctorAssigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  bedAssigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bed"
  },

  status: {
    type: String,
    enum: ["waiting", "admitted", "discharged"],
    default: "waiting"
  },

  admittedAt: {
    type: Date
  }

}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;