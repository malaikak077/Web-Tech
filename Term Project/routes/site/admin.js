const express = require('express');
const { ensureAuthenticated, ensureAdmin } = require('../../middlewares/SessionAuth');
const FaceMakeup = require('../../Models/FaceMakeup');
const EyeMakeup = require('../../Models/EyeMakeup');
const router = express.Router();

router.get('/dashboard', ensureAuthenticated, ensureAdmin,async (req, res) => {
  try {
    
    const faceproducts =  await FaceMakeup.find() 
    const eyeproducts = await EyeMakeup.find();
  

    res.render('dashboard', { eyeproducts, faceproducts});
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

