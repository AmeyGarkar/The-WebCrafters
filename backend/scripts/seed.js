// seed.js
const mongoose = require("mongoose");
const Product = require("./models/Product"); // Adjust path if needed

mongoose.connect("mongodb://localhost:27017/webcrafters", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  seedProducts();
}).catch(err => {
  console.error("Connection error", err);
});

async function seedProducts() {
  const products = [
    {
      name: "Wireless Earbuds",
      slug: "wireless-earbuds",
      description: "Comfortable and long-lasting audio device",
      images: [
        "https://images.unsplash.com/photo-1590650046871-92c887180603",
        "https://images.unsplash.com/photo-1606813902914-14d201d3b9a2"
      ],
      features: ["Bluetooth 5.0", "Noise Cancellation"],
      price: 1999,
      originalPrice: 2999,
      stock: 5
    },
    {
      name: "Bluetooth Headphones",
      slug: "bluetooth-headphones",
      description: "Over-ear headphones with high-quality sound",
      images: [
        "https://images.unsplash.com/photo-1585386959984-a4155224f7d2",
        "https://images.unsplash.com/photo-1602524203822-d0e1c1f39b59"
      ],
      features: ["40mm Drivers", "Long Battery Life"],
      price: 2499,
      originalPrice: 3499,
      stock: 10
    }
  ];

  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products seeded successfully");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding products", err);
  }
}
