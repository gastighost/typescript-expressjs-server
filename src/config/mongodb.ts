import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Successfully connected to db via mongoose!");
};

export default connectDb;
