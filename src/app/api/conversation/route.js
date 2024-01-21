//Creating new convo

import { Conversation, Post, User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

// export const POST = async (request) => {
//   const req = await request.json();
//   //   console.log(req);
//   connectToDb();
//   try {
//     const newConversation = await new Conversation({
//       members: [req.senderId, req.receiverId],
//     });
//     const savedConversation = await newConversation.save();
//     return NextResponse.json({ savedConversation });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// };

export const POST = async (request) => {
  let req = await request.json();

  connectToDb();

  if (req.type === "getUser") {
    try {
      const conversation = await Conversation.findById(req.id);
      // console.log(conversation);
      return NextResponse.json({ conversation });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    try {
      let user = await User.findOne({ email: req.email });

      console.log(user);

      return NextResponse.json(user);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
};
