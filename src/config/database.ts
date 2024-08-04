import mongoose from "mongoose";

export default async function connect() {
  try {
    const connection = await mongoose.connect('mongodb://localhost:27017/trackit'); 
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB')
    console.log(error);
    process.exit(1);
  }
}