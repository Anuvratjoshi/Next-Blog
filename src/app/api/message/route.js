import { Message } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const req = await request.json();
  console.log(req);
  connectToDb();
  try {
    const newMessage = await new Message(req);
    const savedMessage = await newMessage.save();
    return NextResponse.json({ savedMessage });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
