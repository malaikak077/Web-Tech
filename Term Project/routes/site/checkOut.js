const express = require("express");
let router = express.Router();
let FaceMakeup = require("../../Models/FaceMakeup");
const Order = require("../../Models/Orders");
const EyeMakeup = require("../../Models/EyeMakeup");



router.get('/CheckOut/:productId', async (req, res) => {
    try {
    const productId = req.params.productId;
    const prod = await FaceMakeup.findById(productId) || await EyeMakeup.findById(productId); 
    
    // const eyeprod = await EyeMakeup.findById(productId);
    
    if (!prod) {
      return res.status(404).send('Product not found');
    }
    res.render('CheckOut', { prod });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Internal Server Error');
  }
  });
  router.post('/CheckOut/:productId', async (req, res) => {
    const { email, fname, lname, address, city, PostalCode, phone, items, totalAmount } = req.body;
    const itemsArray = JSON.parse(items);

    const newOrder = new Order({
        email,
        fname,
        lname,
        address,
        city,
        PostalCode: parseInt(PostalCode),
        phone: parseInt(phone),
        items: itemsArray,
        totalAmount: parseFloat(totalAmount)
    });

    try {
        await newOrder.save();
        res.redirect('/index.html');
    } catch (err) {
        res.status(500).send(err.message);
    }
});


module.exports = router;