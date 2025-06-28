import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./Schema.js";

dotenv.config();

async function checkProducts() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const products = await Product.find();
  
  console.log(`\n📊 Total Products: ${products.length}\n`);
  
  // Group by gender
  const maleProducts = products.filter(p => p.gender === "Male");
  const femaleProducts = products.filter(p => p.gender === "Female");
  const unisexProducts = products.filter(p => p.gender === "Unisex");
  
  console.log(`👨 Male Products (${maleProducts.length}):`);
  maleProducts.forEach(p => console.log(`  - ${p.title}`));
  
  console.log(`\n👩 Female Products (${femaleProducts.length}):`);
  femaleProducts.forEach(p => console.log(`  - ${p.title}`));
  
  console.log(`\n👥 Unisex Products (${unisexProducts.length}):`);
  unisexProducts.forEach(p => console.log(`  - ${p.title}`));
  
  // Group by category
  console.log(`\n📂 Products by Category:`);
  const categories = [...new Set(products.map(p => p.category))];
  categories.forEach(category => {
    const categoryProducts = products.filter(p => p.category === category);
    console.log(`\n${category} (${categoryProducts.length}):`);
    categoryProducts.forEach(p => console.log(`  - ${p.title} (${p.gender})`));
  });

  process.exit(0);
}

checkProducts().catch(err => {
  console.error("❌ Error checking products:", err);
  process.exit(1);
}); 