const express = require("express");
let router = express.Router();
const Order = require("../../Models/Orders");



router.get('/Check/Cart', async (req, res) => {
  
    res.render('CheckOutCart');
  

  });
  router.post("/Check/Cart", async (req, res) => {
    const { email, fname, lname, address, city, PostalCode, phone, items, totalAmount } = req.body;
    const itemsArray = JSON.parse(items);

    const newOrder = new Order({
        email,
        fname,
        lname,
        address,
        city,
        PostalCode: PostalCode,
        phone,
        items: itemsArray,
        totalAmount: Number(totalAmount)
    });
    await newOrder.save();
    return res.redirect("/index.html");
  
  });
 

  module.exports = router;