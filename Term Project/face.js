const mongoose = require('mongoose');
const FaceMakeup = require("./Models/FaceMakeup");

mongoose.connect("mongodb://localhost:27017/SemesterProject");

// Sample product data
const products = [
    {
        title: 'Silk Foundation',
        imageUrl: 'Images/FACE/1.webp',
        price: 120
    },
    {
        title: 'Loose Powder',
        imageUrl: 'Images/FACE/2.webp',
        price: 130
    },
    {
        title: 'Single Highlighter',
        imageUrl: 'Images/FACE/4.webp',
        price: 140
    },
    {
        title: 'Foundation Primer',
        imageUrl: 'Images/FACE/3.webp',
        price: 150
    },
    {
        title: 'Rose Loose powder',
        imageUrl: 'Images/FACE/5.webp',
        price: 170
    },
    {
        title: 'Full Coverage Foundation',
        imageUrl: 'Images/FACE/6.webp',
        price: 150
    },
    {
        title: 'Compact Powder',
        imageUrl: 'Images/FACE/7.webp',
        price: 190
    },
    {
        title: 'Baby Primer',
        imageUrl: 'Images/FACE/8.webp',
        price: 120
    },
    {
        title: 'Blush Palette',
        imageUrl: 'Images/FACE/9.webp',
        price: 160
    },
    {
        title: 'Light Coverage Foundation',
        imageUrl: 'Images/FACE/10.webp',
        price: 200
    },
    {
        title: 'Square Compact Powder',
        imageUrl: 'Images/FACE/11.webp',
        price: 140
    },
    {
        title: 'Single Blush',
        imageUrl: 'Images/FACE/12.webp',
        price: 180
    },
    {
        title: 'Eye Shadow Palette',
        imageUrl: 'Images/FACE/13.webp',
        price: 100
    },
    {
        title: 'Translucent Powder',
        imageUrl: 'Images/FACE/14.webp',
        price: 150
    },
    {
        title: 'Funky Vanity Box',
        imageUrl: 'Images/FACE/15.webp',
        price: 160
    },
    {
        title: 'Zig Zag Blush Palette',
        imageUrl: 'Images/FACE/16.webp',
        price: 210
    }











   
    
];

// Insert products into MongoDB
FaceMakeup.insertMany(products)
    .then(() => {
        console.log('Products inserted successfully');
    })
    .catch(err => {
        console.error('Error inserting products:', err);
    });
