// seed.js
const mongoose = require("mongoose");
const Product = require("../models/Product"); 

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
        "image1.jpg","image2.jpg","image4.jpg"
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
         "image1.jpg","image2.jpg","image4.jpg"
      ],
       inBox: ["Charging Case", "USB-C Cable", "User Manual"],
      features: ["40mm Drivers", "Long Battery Life"],
      price: 2499,
      originalPrice: 3499,
      stock: 10
    },

     {
      name: "Bluetooth Speakers",
      slug: "bluetooth-speakers",
      description: "Over-ear headphones with high-quality sound",
      images: [
         "image1.jpg","image2.jpg","image4.jpg"
      ],
       inBox: ["Charging Case", "USB-C Cable", "User Manual"],
      features: ["40mm Drivers", "Long Battery Life"],
      price: 2499,
      originalPrice: 3499,
      stock: 10
    },

     {
      name: "Neckband Headphones",
      slug: "neckband-headphones",
      description: "Over-ear headphones with high-quality sound",
      images: [
         "image1.jpg","image2.jpg","image4.jpg"
      ],
       inBox: ["Charging Case", "USB-C Cable", "User Manual"],
      features: ["40mm Drivers", "Long Battery Life"],
      price: 2499,
      originalPrice: 3499,
      stock: 10
    },

     {
      name: "Bluetooth Headphones",
      slug: "bluetooth-headphones",
      description: "Over-ear headphones with high-quality sound",
      images: [
         "image1.jpg","image2.jpg","image4.jpg"
      ],
       inBox: ["Charging Case", "USB-C Cable", "User Manual"],
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
