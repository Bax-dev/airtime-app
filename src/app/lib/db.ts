import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  const uri = process.env.MONGODB_URI!;
  const conn = await mongoose.connect(uri);
  isConnected = true;
  console.log(`MongoDB connected: ${conn.connection.host}`);
}
