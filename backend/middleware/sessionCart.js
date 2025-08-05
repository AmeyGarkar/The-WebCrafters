// middleware/sessionCart.js
module.exports = (req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  next();
};
