const express = require("express");
let router = express.Router();
let EyeMakeup = require("../../Models/EyeMakeup");



router.get('/Eye/:productId', async (req, res) => {
    const products = await EyeMakeup.find().limit(4); 
    try {
      const productId = req.params.productId;
      const prod = await EyeMakeup.findById(productId); 
      if (!prod) {
        return res.status(404).send('Product not found');
      }
      res.render('eyedynamic', { prod,products });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get("/EyeMakeup/:page?", async (req, res) => {
    let page = Number(req.params.page) ? Number(req.params.page) : 1;
    let pageSize = 8;
    let products = await EyeMakeup.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    let total = await EyeMakeup.countDocuments();
    let totalPages = Math.ceil(total / pageSize);
    res.render("EyeMakeup", {
      products,
      total,
      page,
      pageSize,
      totalPages,
    });
  });
  

  module.exports = router;