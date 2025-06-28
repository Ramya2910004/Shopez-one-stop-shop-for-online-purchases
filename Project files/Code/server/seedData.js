import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Admin, Product, User } from './Schema.js';
import bcrypt from 'bcrypt';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB for seeding");

    // Clear existing data
    await Admin.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log("🗑️ Cleared existing data");

    // Categories
    const categories = [
      "Fashion", "Electronics", "Mobiles", "Groceries", "Sports Equipments"
    ];
    const admin = new Admin({
      banner: "/images/home-banner1.png",
      categories,
      bannerImages: ["/images/home-banner1.png", "/images/home-banner-2.png"]
    });
    await admin.save();
    console.log("✅ Admin data created");

    // Sample products with valid Unsplash images
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
        mainImg: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=500&q=80"
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
      },
      // Additional Fashion Products
      {
        title: "Men's Winter Jacket",
        description: "Warm and stylish winter jacket for cold weather.",
        mainImg: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Fashion",
        sizes: ["S", "M", "L", "XL"],
        gender: "Male",
        price: 159.99,
        discount: 15
      },
      {
        title: "Women's Leather Jacket",
        description: "Classic leather jacket for a bold look.",
        mainImg: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Fashion",
        sizes: ["S", "M", "L"],
        gender: "Female",
        price: 199.99,
        discount: 20
      },
      {
        title: "Men's Polo Shirt",
        description: "Classic polo shirt for casual and semi-formal occasions.",
        mainImg: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Fashion",
        sizes: ["S", "M", "L", "XL"],
        gender: "Male",
        price: 39.99,
        discount: 5
      },
      {
        title: "Women's Cardigan",
        description: "Soft and comfortable cardigan for layering.",
        mainImg: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Fashion",
        sizes: ["S", "M", "L"],
        gender: "Female",
        price: 59.99,
        discount: 8
      },
      {
        title: "Unisex Winter Scarf",
        description: "Warm and stylish scarf for cold weather.",
        mainImg: "https://images.unsplash.com/photo-1520903920245-2d3c6c4c8c8c?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1520903920245-2d3c6c4c8c8c?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Fashion",
        sizes: ["One Size"],
        gender: "Unisex",
        price: 24.99,
        discount: 0
      },
      // Additional Electronics Products
      {
        title: "Wireless Gaming Mouse",
        description: "High-performance wireless gaming mouse with RGB lighting.",
        mainImg: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Electronics",
        sizes: ["One Size"],
        gender: "Unisex",
        price: 79.99,
        discount: 10
      },
      {
        title: "Mechanical Keyboard",
        description: "Premium mechanical keyboard with tactile switches.",
        mainImg: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Electronics",
        sizes: ["One Size"],
        gender: "Unisex",
        price: 129.99,
        discount: 15
      },
      {
        title: "Portable Bluetooth Speaker",
        description: "Waterproof portable speaker with 20-hour battery life.",
        mainImg: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Electronics",
        sizes: ["One Size"],
        gender: "Unisex",
        price: 89.99,
        discount: 12
      },
      {
        title: "4K Webcam",
        description: "High-quality 4K webcam for video calls and streaming.",
        mainImg: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Electronics",
        sizes: ["One Size"],
        gender: "Unisex",
        price: 149.99,
        discount: 8
      },
      {
        title: "Wireless Charging Pad",
        description: "Fast wireless charging pad for smartphones.",
        mainImg: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Electronics",
        sizes: ["One Size"],
        gender: "Unisex",
        price: 39.99,
        discount: 5
      },
      // Additional Mobile Products
      {
        title: "Phone Case - Premium",
        description: "Premium protective case for smartphones.",
        mainImg: "https://images.unsplash.com/photo-1603313011108-4f2d2c6c4c8c?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1603313011108-4f2d2c6c4c8c?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Mobiles",
        sizes: ["iPhone 13", "iPhone 14", "Samsung S21", "Samsung S22"],
        gender: "Unisex",
        price: 29.99,
        discount: 0
      },
      {
        title: "Phone Stand",
        description: "Adjustable phone stand for desk and bedside.",
        mainImg: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1603313011108-4f2d2c6c4c8c?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Mobiles",
        sizes: ["Universal"],
        gender: "Unisex",
        price: 19.99,
        discount: 0
      },
      {
        title: "Car Phone Mount",
        description: "Secure car phone mount for safe driving.",
        mainImg: "https://images.unsplash.com/photo-1603313011108-4f2d2c6c4c8c?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1603313011108-4f2d2c6c4c8c?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Mobiles",
        sizes: ["Universal"],
        gender: "Unisex",
        price: 24.99,
        discount: 5
      },
      // Additional Grocery Products
      {
        title: "Organic Honey",
        description: "Pure organic honey from local beekeepers.",
        mainImg: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Groceries",
        sizes: ["500g", "1kg"],
        gender: "Unisex",
        price: 8.99,
        discount: 0
      },
      {
        title: "Extra Virgin Olive Oil",
        description: "Premium extra virgin olive oil for cooking.",
        mainImg: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Groceries",
        sizes: ["500ml", "1L"],
        gender: "Unisex",
        price: 12.99,
        discount: 0
      },
      {
        title: "Organic Quinoa",
        description: "Nutritious organic quinoa for healthy meals.",
        mainImg: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Groceries",
        sizes: ["500g", "1kg"],
        gender: "Unisex",
        price: 6.99,
        discount: 0
      },
      {
        title: "Dark Chocolate",
        description: "Premium dark chocolate with 70% cocoa.",
        mainImg: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Groceries",
        sizes: ["100g", "200g"],
        gender: "Unisex",
        price: 4.99,
        discount: 0
      },
      {
        title: "Green Tea Bags",
        description: "Organic green tea bags for daily wellness.",
        mainImg: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Groceries",
        sizes: ["25 bags", "50 bags"],
        gender: "Unisex",
        price: 3.99,
        discount: 0
      },
      // Additional Sports Equipment
      {
        title: "Basketball",
        description: "Official size basketball for indoor and outdoor play.",
        mainImg: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["7"],
        gender: "Unisex",
        price: 34.99,
        discount: 0
      },
      {
        title: "Table Tennis Set",
        description: "Complete table tennis set with rackets and balls.",
        mainImg: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["Standard"],
        gender: "Unisex",
        price: 79.99,
        discount: 10
      },
      {
        title: "Dumbbells Set",
        description: "Adjustable dumbbells set for home workouts.",
        mainImg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["5kg", "10kg", "15kg"],
        gender: "Unisex",
        price: 89.99,
        discount: 15
      },
      {
        title: "Resistance Bands Set",
        description: "Complete set of resistance bands for strength training.",
        mainImg: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["Set of 5"],
        gender: "Unisex",
        price: 24.99,
        discount: 0
      },
      {
        title: "Jump Rope",
        description: "Adjustable jump rope for cardio workouts.",
        mainImg: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["Adjustable"],
        gender: "Unisex",
        price: 14.99,
        discount: 0
      },
      // Additional Mobile Phones
      {
        title: "iPhone 15 Pro",
        description: "Latest iPhone with titanium design and advanced camera system.",
        mainImg: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Mobiles",
        sizes: ["128GB", "256GB", "512GB", "1TB"],
        gender: "Unisex",
        price: 1199.99,
        discount: 0
      },
      {
        title: "Samsung Galaxy S24",
        description: "Flagship Samsung phone with AI features and stunning display.",
        mainImg: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Mobiles",
        sizes: ["128GB", "256GB", "512GB"],
        gender: "Unisex",
        price: 1099.99,
        discount: 5
      },
      {
        title: "Google Pixel 8",
        description: "Google's flagship with exceptional camera and AI capabilities.",
        mainImg: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Mobiles",
        sizes: ["128GB", "256GB"],
        gender: "Unisex",
        price: 899.99,
        discount: 8
      },
      {
        title: "OnePlus 12",
        description: "Fast performance with Hasselblad camera system.",
        mainImg: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Mobiles",
        sizes: ["128GB", "256GB", "512GB"],
        gender: "Unisex",
        price: 799.99,
        discount: 10
      },
      {
        title: "Xiaomi Redmi Note 13",
        description: "Budget-friendly phone with great camera and battery life.",
        mainImg: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Mobiles",
        sizes: ["64GB", "128GB"],
        gender: "Unisex",
        price: 249.99,
        discount: 15
      },
      {
        title: "Motorola Edge 40",
        description: "Mid-range phone with premium features and design.",
        mainImg: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Mobiles",
        sizes: ["128GB", "256GB"],
        gender: "Unisex",
        price: 399.99,
        discount: 12
      },
      {
        title: "Nothing Phone 2",
        description: "Unique design with Glyph interface and clean Android experience.",
        mainImg: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Mobiles",
        sizes: ["128GB", "256GB"],
        gender: "Unisex",
        price: 599.99,
        discount: 8
      },
      // Additional Sports Equipment
      {
        title: "Treadmill",
        description: "Electric treadmill for home cardio workouts.",
        mainImg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["Standard"],
        gender: "Unisex",
        price: 899.99,
        discount: 20
      },
      {
        title: "Weight Bench",
        description: "Adjustable weight bench for strength training.",
        mainImg: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["Standard"],
        gender: "Unisex",
        price: 199.99,
        discount: 10
      },
      {
        title: "Pull-up Bar",
        description: "Doorway pull-up bar for upper body strength.",
        mainImg: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["Universal"],
        gender: "Unisex",
        price: 39.99,
        discount: 0
      },
      {
        title: "Foam Roller",
        description: "High-density foam roller for muscle recovery.",
        mainImg: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["Standard"],
        gender: "Unisex",
        price: 19.99,
        discount: 0
      },
      {
        title: "Medicine Ball",
        description: "Weighted medicine ball for functional training.",
        mainImg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["4kg", "6kg", "8kg"],
        gender: "Unisex",
        price: 29.99,
        discount: 5
      },
      {
        title: "Kettlebell Set",
        description: "Complete kettlebell set for strength and conditioning.",
        mainImg: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["Set of 3"],
        gender: "Unisex",
        price: 149.99,
        discount: 15
      },
      {
        title: "Swimming Goggles",
        description: "Anti-fog swimming goggles for pool workouts.",
        mainImg: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["Universal"],
        gender: "Unisex",
        price: 24.99,
        discount: 0
      },
      {
        title: "Cycling Helmet",
        description: "Lightweight cycling helmet for safety and comfort.",
        mainImg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["S", "M", "L"],
        gender: "Unisex",
        price: 59.99,
        discount: 8
      },
      {
        title: "Tennis Racket",
        description: "Professional tennis racket for all skill levels.",
        mainImg: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["Standard"],
        gender: "Unisex",
        price: 89.99,
        discount: 10
      },
      {
        title: "Golf Club Set",
        description: "Complete golf club set for beginners and intermediates.",
        mainImg: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=500&q=80",
        carousel: [
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=500&q=80"
        ],
        category: "Sports Equipments",
        sizes: ["Standard"],
        gender: "Unisex",
        price: 299.99,
        discount: 20
      }
    ];

    for (const productData of sampleProducts) {
      const product = new Product(productData);
      await product.save();
    }
    console.log("✅ Sample products created");

    // Create users (2 admin, 3 user)
    const passwordHash = await bcrypt.hash('password123', 10);
    const users = [
      { username: 'admin1', email: 'admin1@example.com', usertype: 'admin', password: passwordHash },
      { username: 'admin2', email: 'admin2@example.com', usertype: 'admin', password: passwordHash },
      { username: 'user1', email: 'user1@example.com', usertype: 'user', password: passwordHash },
      { username: 'user2', email: 'user2@example.com', usertype: 'user', password: passwordHash },
      { username: 'user3', email: 'user3@example.com', usertype: 'user', password: passwordHash }
    ];
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
    }
    console.log("✅ Users created");

    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedData(); 