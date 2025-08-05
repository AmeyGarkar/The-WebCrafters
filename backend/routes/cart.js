// routes/cart.js
router.post('/add/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send('Product not found');

  req.session.cart.push({
    id: product._id,
    name: product.name,
    price: product.price,
    quantity: 1
  });

  res.redirect('/cart');
});

router.get('/', (req, res) => {
  res.render('cart', { cart: req.session.cart || [] });
});
