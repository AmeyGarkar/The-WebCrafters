const User = require("../models/user");
const { setUser } = require("../service/auth");
const bcrypt = require("bcrypt");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  await User.create({
    name,
    email,
    password: hashedPassword, // Store hashed password
  });
  return res.redirect("/login");//ppppppp("/")
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); // Find by email only

  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password); // Compare hashed password
  if (!isMatch) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }

  // Create JWT token as sessionId
  const sessionId = setUser(user); // <-- FIXED LINE

  res.cookie("uid", sessionId);
  return res.redirect("/");
}

// If you ever need to send user data, exclude the password:
function sendUserWithoutPassword(res, user) {
  const { password, ...userWithoutPassword } = user.toObject();
  res.json(userWithoutPassword);
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};