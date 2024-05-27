const mongoose = require("mongoose");

// Define the schema for Order
const orderSchema = new mongoose.Schema({
   
    email: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    PostalCode: { type: Number, required: true },
    phone: { type: Number, required: true },
    items: [{ 
        title: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true }
    
});

// Create the Order model based on the schema
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
