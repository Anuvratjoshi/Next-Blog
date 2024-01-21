import { Message } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  connectToDb();
  try {
    const messages = await new Message.find({
      conversationId: params.id,
    });
    return NextResponse.json({ messages });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
