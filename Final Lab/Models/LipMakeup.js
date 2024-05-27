const mongoose = require("mongoose");


let LipMakeupSchema = mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
},
  title:  {
    type: String,
    required: true
},
  price: {
    type: Number,
    required: true
},
});
let LipMakeup = mongoose.model("LipMakeup", LipMakeupSchema);
module.exports = LipMakeup;
