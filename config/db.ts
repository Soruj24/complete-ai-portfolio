import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env file');
}

interface GlobalMongoose {
  mongoose?: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

let cached = (global as GlobalMongoose).mongoose;

if (!cached) {
  cached = (global as GlobalMongoose).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached && cached.conn) {
    return cached.conn;
  }

  if (!cached || !cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering to surface connection issues early
    };

    cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log('MongoDB connected');
      return mongoose;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}