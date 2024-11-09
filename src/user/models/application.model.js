import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, "Name should be at least 2 characters long"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Please provide a valid email address"],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true
});

const ApplicationModel = mongoose.model("Application", applicationSchema);
export default ApplicationModel;
