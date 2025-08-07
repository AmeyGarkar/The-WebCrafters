const express = require('express'); 
const mongoose = require('mongoose');
const session = require("express-session");
const MONGODB_URI = "mongodb://localhost:27017/webcrafters"; // Replace with your MongoDB URI

mongoose.connect(MONGODB_URI)
  .then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

const User = require("./models/user");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: "WeBcRaFtErS_SeCrEt",
  resave: false,
  saveUninitialized: true,
}));



const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));


// ✅ Make user available in all templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.get("/signup" ,(req,res) => {
    res.render("signup.ejs");
});

app.post("/signup",async (req,res) =>{
    const{ name, email, password } = req.body;
    try{
        const newUser = new User({name,email,password});
        await newUser.save();
         req.session.user = newUser; // ✅ save user in session after signup
        res.redirect("/");       
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.get("/login" ,(req,res) => {
    res.render("login.ejs");
});

app.post("/login",async (req,res) =>{
    const{ email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user || user.password  !== password) {
            return res.status(401).json({error: "Invalid email or password"});
        }
         req.session.user = user; // ✅ save user in session after login
        res.redirect("/");       
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
app.get("/user", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");  // Redirect to login if not authenticated       
    }
    res.render("user", { user: req.session.user }); // ✅ Pass `user` to EJS
});

app.use('/product', require('./routes/product'));

const Product = require('./models/Product'); // Make sure this is correct

app.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('index', { products }); // ✅ PASS products to index.ejs
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});




app.post('/buy/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product || product.stock <= 0) {
    return res.status(400).send("Product not available");
  }

  product.stock -= 1;
  await product.save();

  res.redirect(`/product/${product.slug}`);
});


app.use(express.static('public'));
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.get('/seed', async (req, res) => {
  const products = [
    {
      name: "Wireless Earbuds",
      slug: "wireless-earbuds",
      description: "Comfortable and long-lasting audio device",
      images: ["image1.jpg","image2.jpg"], // <-- Add your image filename here
      features: ["Bluetooth 5.0", "Noise Cancellation"],
      price: 1999,
      originalPrice: 2999,
      stock: 5
    },
    {
      name: "Bluetooth Headphones",
      slug: "bluetooth-headphones",
      description: "Over-ear headphones with high-quality sound",
      images: ["image2.jpg"], // <-- Add your image filename here
      features: ["40mm Drivers", "Long Battery Life"],
      price: 2499,
      originalPrice: 3499,
      stock: 10
    }
  ];

  await Product.deleteMany({});
  await Product.insertMany(products);
  res.send("Products seeded!");
});


const productRoutes = require('./routes/productRoutes');
app.use('/product', productRoutes);






app.listen(8000, () => {
    console.log(`Server is running at http://localhost:8000`);
});