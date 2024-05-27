const express = require("express");
let router = express.Router();
let FaceMakeup = require("../../Models/FaceMakeup");



router.get('/Face/:productId', async (req, res) => {
    const products = await FaceMakeup.find().limit(4); 
    try {
      const productId = req.params.productId;
      const prod = await FaceMakeup.findById(productId); 
      if (!prod) {
        return res.status(404).send('Product not found');
      }
      res.render('facedynamic', { prod,products });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get("/FaceMakeup/:page?", async (req, res) => {
    let page = Number(req.params.page) ? Number(req.params.page) : 1;
    let pageSize = 8;
    let products = await FaceMakeup.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    let total = await FaceMakeup.countDocuments();
    let totalPages = Math.ceil(total / pageSize);
    res.render("FaceMakeup", {
      products,
      total,
      page,
      pageSize,
      totalPages,
    });
  });
  

  module.exports = router;