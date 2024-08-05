import mongoose from "mongoose";

export default async function connect() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI!); 
    console.log(process.env.MONGODB_URI)
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB')
    console.log(error);
    process.exit(1);
  }
}