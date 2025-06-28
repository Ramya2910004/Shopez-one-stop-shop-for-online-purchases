import mongoose from "mongoose";
import dotenv from "dotenv";
import { Admin, Product, User } from "./Schema.js";
import bcrypt from "bcrypt";

dotenv.config();

const clearAndReseed = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB");

    // Clear all collections
    await Admin.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log("🗑️ Completely cleared all collections");

    // Categories
    const categories = [
      "Fashion", "Electronics", "Mobiles", "Groceries", "Sports Equipments"
    ];
    const admin = new Admin({
      banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
      categories,
      bannerImages: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80"
      ]
    });
    await admin.save();
    console.log("✅ Admin data created");

    // Sample products with proper gender categorization
    const sampleProducts = [
      // Fashion - Men's Products
      {
        title: "Men's Classic White T-Shirt",
        description: "Comfortable cotton t-shirt perfect for everyday wear",
        mainImg: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Fashion",
        sizes: ["S", "M", "L", "XL"],
        gender: "Male",
        price: 29.99,
        discount: 0
      },
      {
        title: "Men's Running Shoes",
        description: "Lightweight and comfortable running shoes for men.",
        mainImg: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Fashion",
        sizes: ["8", "9", "10", "11"],
        gender: "Male",
        price: 79.99,
        discount: 5
      },
      {
        title: "Men's Denim Jeans",
        description: "Classic blue denim jeans for men.",
        mainImg: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Fashion",
        sizes: ["S", "M", "L", "XL"],
        gender: "Male",
        price: 59.99,
        discount: 10
      },
      {
        title: "Men's Formal Shirt",
        description: "Professional formal shirt for office and events.",
        mainImg: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Fashion",
        sizes: ["S", "M", "L", "XL"],
        gender: "Male",
        price: 89.99,
        discount: 8
      },
      {
        title: "Men's Casual Jacket",
        description: "Stylish casual jacket for cool weather.",
        mainImg: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Fashion",
        sizes: ["S", "M", "L", "XL"],
        gender: "Male",
        price: 129.99,
        discount: 12
      },
      // Fashion - Women's Products
      {
        title: "Women's Elegant Evening Dress",
        description: "A beautiful evening dress for special occasions.",
        mainImg: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1469398715555-76331a6c7b29?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Fashion",
        sizes: ["S", "M", "L"],
        gender: "Female",
        price: 149.99,
        discount: 15
      },
      {
        title: "Women's Designer Handbag",
        description: "Premium leather handbag for everyday use.",
        mainImg: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Fashion",
        sizes: ["One Size"],
        gender: "Female",
        price: 249.99,
        discount: 20
      },
      {
        title: "Women's Summer Dress",
        description: "Light and comfortable summer dress.",
        mainImg: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Fashion",
        sizes: ["S", "M", "L"],
        gender: "Female",
        price: 79.99,
        discount: 10
      },
      {
        title: "Women's High Heels",
        description: "Elegant high heels for formal occasions.",
        mainImg: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Fashion",
        sizes: ["6", "7", "8", "9"],
        gender: "Female",
        price: 119.99,
        discount: 8
      },
      {
        title: "Women's Blouse",
        description: "Professional blouse for office wear.",
        mainImg: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Fashion",
        sizes: ["S", "M", "L"],
        gender: "Female",
        price: 69.99,
        discount: 5
      },
      // Fashion - Unisex Products
      {
        title: "Unisex Hoodie",
        description: "Comfortable hoodie for casual wear.",
        mainImg: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Fashion",
        sizes: ["S", "M", "L", "XL"],
        gender: "Unisex",
        price: 49.99,
        discount: 0
      },
      {
        title: "Unisex Sneakers",
        description: "Comfortable sneakers for everyday use.",
        mainImg: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Fashion",
        sizes: ["7", "8", "9", "10"],
        gender: "Unisex",
        price: 89.99,
        discount: 5
      },
      // Electronics
      {
        title: "Wireless Bluetooth Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        mainImg: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Electronics",
        sizes: ["One Size"],
        gender: "Unisex",
        price: 89.99,
        discount: 10
      },
      {
        title: "Noise Cancelling Earbuds",
        description: "Compact wireless earbuds with active noise cancellation.",
        mainImg: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Electronics",
        sizes: ["One Size"],
        gender: "Unisex",
        price: 59.99,
        discount: 8
      },
      {
        title: "Smart Fitness Watch",
        description: "Track your health and fitness with this smart watch.",
        mainImg: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Electronics",
        sizes: ["One Size"],
        gender: "Unisex",
        price: 129.99,
        discount: 12
      },
      {
        title: "Laptop Stand",
        description: "Ergonomic laptop stand for better posture.",
        mainImg: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Electronics",
        sizes: ["One Size"],
        gender: "Unisex",
        price: 29.99,
        discount: 5
      },
      {
        title: "Coffee Maker",
        description: "Automatic coffee maker for home and office.",
        mainImg: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Electronics",
        sizes: ["One Size"],
        gender: "Unisex",
        price: 79.99,
        discount: 7
      },
      // Mobiles
      {
        title: "Smartphone Pro Max",
        description: "Latest smartphone with advanced camera and performance",
        mainImg: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Mobiles",
        sizes: ["128GB", "256GB", "512GB"],
        gender: "Unisex",
        price: 999.99,
        discount: 5
      },
      {
        title: "Budget Android Phone",
        description: "Affordable Android smartphone with all essentials.",
        mainImg: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Mobiles",
        sizes: ["64GB", "128GB"],
        gender: "Unisex",
        price: 299.99,
        discount: 10
      },
      {
        title: "Flagship Android Phone",
        description: "High-end Android phone with best-in-class features.",
        mainImg: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Mobiles",
        sizes: ["128GB", "256GB"],
        gender: "Unisex",
        price: 799.99,
        discount: 8
      },
      {
        title: "Basic Feature Phone",
        description: "Simple and reliable feature phone for calls and texts.",
        mainImg: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Mobiles",
        sizes: ["8GB"],
        gender: "Unisex",
        price: 49.99,
        discount: 0
      },
      {
        title: "Midrange Android Phone",
        description: "Balanced Android phone for everyday use.",
        mainImg: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Mobiles",
        sizes: ["64GB", "128GB"],
        gender: "Unisex",
        price: 499.99,
        discount: 6
      },
      // Groceries
      {
        title: "Fresh Apples",
        description: "Crisp and juicy apples, perfect for snacking.",
        mainImg: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Groceries",
        sizes: ["1kg", "2kg"],
        gender: "Unisex",
        price: 3.99,
        discount: 0
      },
      {
        title: "Organic Bananas",
        description: "Sweet and healthy organic bananas.",
        mainImg: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Groceries",
        sizes: ["1kg"],
        gender: "Unisex",
        price: 2.49,
        discount: 0
      },
      {
        title: "Fresh Tomatoes",
        description: "Ripe and juicy tomatoes for salads and cooking.",
        mainImg: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Groceries",
        sizes: ["1kg"],
        gender: "Unisex",
        price: 1.99,
        discount: 0
      },
      {
        title: "Whole Wheat Bread",
        description: "Healthy whole wheat bread loaf.",
        mainImg: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Groceries",
        sizes: ["400g"],
        gender: "Unisex",
        price: 2.99,
        discount: 0
      },
      {
        title: "Fresh Milk",
        description: "Pure and fresh milk, 1 litre pack.",
        mainImg: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Groceries",
        sizes: ["1L"],
        gender: "Unisex",
        price: 1.49,
        discount: 0
      },
      // Sports Equipments
      {
        title: "Football",
        description: "Standard size football for matches and practice.",
        mainImg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["5"],
        gender: "Unisex",
        price: 19.99,
        discount: 0
      },
      {
        title: "Cricket Bat",
        description: "Professional cricket bat for all levels.",
        mainImg: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["Full"],
        gender: "Unisex",
        price: 49.99,
        discount: 0
      },
      {
        title: "Badminton Racket",
        description: "Lightweight badminton racket for fast play.",
        mainImg: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["Standard"],
        gender: "Unisex",
        price: 24.99,
        discount: 0
      },
      {
        title: "Tennis Ball Pack",
        description: "Pack of 3 tennis balls for practice and matches.",
        mainImg: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["Pack of 3"],
        gender: "Unisex",
        price: 9.99,
        discount: 0
      },
      {
        title: "Yoga Mat",
        description: "Non-slip yoga mat for all exercises.",
        mainImg: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["Standard"],
        gender: "Unisex",
        price: 34.99,
        discount: 0
      }
    ];

    for (const productData of sampleProducts) {
      const product = new Product(productData);
      await product.save();
    }
    console.log("✅ Sample products created");

    // Create sample users
    const hashedPassword = await bcrypt.hash("password123", 10);
    const users = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        phone: "1234567890",
        address: "123 Main St, City, State 12345"
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword,
        phone: "0987654321",
        address: "456 Oak Ave, Town, State 54321"
      },
      {
        name: "Mike Johnson",
        email: "mike@example.com",
        password: hashedPassword,
        phone: "5551234567",
        address: "789 Pine Rd, Village, State 67890"
      }
    ];

    for (const userData of users) {
      const username = userData.email.split('@')[0];
      const user = new User({
        username,
        password: userData.password,
        email: userData.email,
        usertype: 'user'
      });
      await user.save();
    }
    console.log("✅ Users created");

    console.log("🎉 Database completely cleared and reseeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

clearAndReseed(); 