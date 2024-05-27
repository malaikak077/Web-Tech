const express = require('express');
const { authenticateJWT, isAdmin } = require('../../middlewares/Authentication');
const FaceMakeup = require('../../Models/FaceMakeup');
const EyeMakeup = require('../../Models/EyeMakeup');
const router = express.Router();

// Create a new product
router.post('/', authenticateJWT, isAdmin, async (req, res) => {
  const { imageUrl, title, price, category } = req.body;

  try {
    let newProduct;

    if (category === 'FaceMakeup') {
      newProduct = new FaceMakeup({ imageUrl, title, price });
    } else if (category === 'EyeMakeup') {
      newProduct = new EyeMakeup({ imageUrl, title, price });
    } else {
      return res.status(400).json({ message: 'Invalid category' });
    }

    await newProduct.save();
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all products
router.get('/',authenticateJWT, isAdmin, async (req, res) => {
  try {
    const products = await FaceMakeup.find() && await EyeMakeup.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a product
router.put('/:id', authenticateJWT, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { imageUrl, title, price } = req.body;
  try {
    let result = await FaceMakeup.findByIdAndUpdate(id, { imageUrl, title, price });
    if (!result){
      result = await EyeMakeup.findByIdAndUpdate(id, { imageUrl, title, price });
    }
    if (result) {
      res.status(200).json({ message: 'Product updated successfully', data: result });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } 
 
  
  catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }


});
// Delete a product
router.delete('/:id', authenticateJWT, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    let result = await FaceMakeup.findByIdAndDelete(id);
    if (!result) {
      result = await EyeMakeup.findByIdAndDelete(id);
    }
    if (result) {
      res.status(200).json({ message: 'Product deleted successfully', data: result });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
