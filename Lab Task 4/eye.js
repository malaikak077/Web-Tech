const mongoose = require('mongoose');
const EyeMakeup = require("./Models/EyeMakeup");

mongoose.connect("mongodb://localhost:27017/SemesterProject");

// Sample product data
const products = [
    {
        title: 'Eye Concelar',
        imageUrl: 'https://missrosepakistanofficial.com/cdn/shop/files/MissRoseLiquidConcealer_3.jpg?v=1690983056&width=823',
        price: 130
    },
    {
        title: 'Eyelash Mascara',
        imageUrl: 'https://missrosepakistanofficial.com/cdn/shop/files/CurlingandLengtheningMascara_2_f81548b7-0d38-45ab-8b8f-82b787e4f5ea.jpg?v=1690996409&width=1426',
        price: 120
    },
    {
        title: 'Eye Liner',
        imageUrl: 'https://missrosepakistanofficial.com/cdn/shop/files/LiquidEyelinerGoldenPacking_1.jpg?v=1690995878&width=1426',
        price: 140
    },
    {
        title: 'Eye Pallete',
        imageUrl: 'https://missrosepakistanofficial.com/cdn/shop/files/MissRoseNudePalette-18Color_1.jpg?v=1687872178&width=1426',
        price: 150
    },
    {
        title: 'Professional Mascara',
        imageUrl: 'https://missrosepakistanofficial.com/cdn/shop/files/MissRoseProfessionalBlackMascara_2.jpg?v=1690995318&width=1426',
        price: 170
    },
    {
        title: 'Shimmer Pallete',
        imageUrl: 'https://missrosepakistanofficial.com/cdn/shop/files/MissRose32ColorMixEyeshadowPalette_2.jpg?v=1687859210&width=1426',
        price: 150
    },
    {
        title: 'Eyebrow Pencil',
        imageUrl: 'https://missrosepakistanofficial.com/cdn/shop/files/MissRoseLiquidEyebrowPen_4.jpg?v=1690997195&width=1426',
        price: 190
    },
    {
        title: 'Curl-Lash Mascara',
        imageUrl: 'https://missrosepakistanofficial.com/cdn/shop/files/AH1I0475a.jpg?v=1707744686&width=1426',
        price: 120
    },
    {
        title: 'Glitter Palette',
        imageUrl: 'Ihttps://missrosepakistanofficial.com/cdn/shop/files/MissRose18ColorFullGlitterPalette_3.jpg?v=1687871928&width=1426',
        price: 160
    },
    {
        title: 'Pen Liner',
        imageUrl: 'https://missrosepakistanofficial.com/cdn/shop/files/2-in-1-Eye-08-12-2023-06.jpg?v=1703662062&width=1426',
        price: 200
    },
    {
        title: 'Eyebrow Promade',
        imageUrl: 'https://missrosepakistanofficial.com/cdn/shop/files/EyebrowPromade_1.jpg?v=1690990202&width=1426',
        price: 140
    },
    {
        title: 'Gel Liner',
        imageUrl: 'https://missrosepakistanofficial.com/cdn/shop/files/GelLiner24Hours-2in1_2.jpg?v=1690995531&width=1426',
        price: 180
    },
    {
        title: 'Big Eye Liner',
        imageUrl: 'https://missrosepakistanofficial.com/cdn/shop/files/Untitled-2222-02.jpg?v=1712297962&width=1426p',
        price: 100
    },
    {
        title: 'Nude Pallete',
        imageUrl: 'https://missrosepakistanofficial.com/cdn/shop/files/MissRoseNudePalette-18Color_1.jpg?v=1687872178&width=1426',
        price: 150
    },
    {
        title: 'Cream Shadow Pallete',
        imageUrl: 'https://missrosepakistanofficial.com/cdn/shop/files/3in1eyebrowcreampalette_5.jpg?v=1698143315&width=1426',
        price: 160
    },
    {
        title: 'Color Corrector',
        imageUrl: 'https://missrosepakistanofficial.com/cdn/shop/files/MissRose4ColorConcealerandCorrectorPalette_5.jpg?v=1690983247&width=1426',
        price: 210
    }











   
    
];

// Insert products into MongoDB
EyeMakeup.insertMany(products)
    .then(() => {
        console.log('Products inserted successfully');
    })
    .catch(err => {
        console.error('Error inserting products:', err);
    });
