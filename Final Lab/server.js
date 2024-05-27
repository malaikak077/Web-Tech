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
app.use((req, res, next) => {
  if (!req.session.recentSearches) {
    req.session.recentSearches = [];
  }
  next();
});


app.get('/index.html', async (req, res) => {
  const faceproducts = await FaceMakeup.find().limit(4);
  const eyeproducts = await EyeMakeup.find().limit(4);

  res.render("index",{faceproducts,eyeproducts});
})
//ADMIN PANNEL
app.get('/admin/new', ensureAuthenticated, ensureAdmin, (req, res) => {
  res.render('new');
});

app.get('/admin/edit/:id', ensureAuthenticated, ensureAdmin, async (req, res) => {
  const product = await FaceMakeup.findById(req.params.id) || await EyeMakeup.findById(req.params.id);
  res.render('edit', { product });
});


//SEARCHING
app.get('/search/:page?', async (req, res) => {
  let page = Number(req.params.page) || 1;
  let pageSize = 2;
  const query = req.query.query;

  if (query && !req.session.recentSearches.includes(query)) {
    req.session.recentSearches.push(query);
  }

  try {
    const products = await FaceMakeup.find({ title: new RegExp(query, 'i') })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const total = await FaceMakeup.countDocuments({ title: new RegExp(query, 'i') });
    const totalPages = Math.ceil(total / pageSize);

    res.render('searchResults', {
      products,
      query,
      total,
      page,
      pageSize,
      totalPages,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to display recent searches
app.get('/recent-searches', (req, res) => {
  res.render('recentSearches', { recentSearches: req.session.recentSearches });
});


//Other Routes
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