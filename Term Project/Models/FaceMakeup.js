const mongoose = require("mongoose");

// Define the schema for FaceMakeup
const faceMakeupSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Create the FaceMakeup model based on the schema
const FaceMakeup = mongoose.model("FaceMakeup", faceMakeupSchema);

module.exports = FaceMakeup;
