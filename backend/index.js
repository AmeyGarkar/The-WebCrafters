const express = require('express'); 
const mongoose = require('mongoose');
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


const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));


app.get("/signup" ,(req,res) => {
    res.render("signup.ejs");
});

app.post("/signup",async (req,res) =>{
    const{ name, email, password } = req.body;
    try{
        const newUser = new User({name,email,password});
        await newUser.save();
        res.redirect("/user");       
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
    
        res.redirect("/user");       
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.get("/user", (req, res) => {
  res.render("index");
});


app.listen(8000, () => {
    console.log(`Server is running at http://localhost:8000/login`);
});