import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./Schema.js";

dotenv.config();

async function clearUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const result = await User.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} users from the database.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error deleting users:", err);
    process.exit(1);
  }
}

clearUsers(); 