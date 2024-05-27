const mongoose = require("mongoose");


let AccesoriesSchema = mongoose.Schema({
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
let Accesories = mongoose.model("Accesories", AccesoriesSchema);
module.exports = Accesories;
