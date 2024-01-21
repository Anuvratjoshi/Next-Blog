import { Conversation } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  connectToDb();
  // console.log("From conversation route:", params);
  try {
    /*
     The $in operator in MongoDB is specifically used to query documents where a specified field contains an array and at least one element in that array matches any value in the specified array.
    */
    const conversation = await Conversation.find({
      members: { $in: [params.id] }, // Querying the Conversation model to find conversations where 'members' include the specified 'params.id'
    });
    return NextResponse.json({ conversation });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
