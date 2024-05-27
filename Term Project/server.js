const express = require('express')
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser'); 
const methodOverride = require('method-override');
const { ensureAuthenticated, ensureAdmin } = require('./middlewares/SessionAuth');
const FaceMakeup = require("./Models/FaceMakeup");
const session = require("express-session");
const EyeMakeup = require('./Models/EyeMakeup');


mongoose.connect("mongodb://localhost:27017/SemesterProject").then(() => {
        console.log('Connected to MongoDB');
    })

const app = express()
const port = 3000

app.use(session({ secret: 'Its a secret', resave: false, saveUninitialized: true }));
app.use(express.static("public"));
app.use(cookieParser()); 
app.use(methodOverride('_method')); 
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./middlewares/sMiddleware"));
app.use("/", require("./routes/site/auth"));
app.use("/", require("./routes/site/faceMakeup"));
app.use("/", require("./routes/site/eyeMakeup"));
app.use("/", require("./routes/site/checkOut"));
app.use("/", require("./routes/site/cartCheckout"));
app.use("/", require("./routes/site/admin"));
app.use("/api/products", require("./routes/api/products"));


app.get('/index.html', async (req, res) => {
  const faceproducts = await FaceMakeup.find().limit(4);
  const eyeproducts = await EyeMakeup.find().limit(4);

  res.render("index",{faceproducts,eyeproducts});
})
app.get('/admin/new', ensureAuthenticated, ensureAdmin, (req, res) => {
  res.render('new');
});

app.get('/admin/edit/:id', ensureAuthenticated, ensureAdmin, async (req, res) => {
  const product = await FaceMakeup.findById(req.params.id) || await EyeMakeup.findById(req.params.id);
  res.render('edit', { product });
});

// app.get('/EyeMakeup.html', (req, res) => {
//     res.render("EyeMakeup")
// })
app.get('/LipMakeup.html', (req, res) => {
    res.render("LipMakeup")
})
app.get('/Accesories.html', (req, res) => {
    res.render("Accesories")
})
app.get('/ContactUs.html',ensureAuthenticated ,(req, res) => {
    res.render("ContactUs")
})
app.get('/FAQs.html', (req, res) => {
    res.render("FAQs")
})









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})