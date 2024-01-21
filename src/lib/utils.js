import mongoose from "mongoose";
import { NextResponse } from "next/server";
const connection = {};
export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("======>connectToDb", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
