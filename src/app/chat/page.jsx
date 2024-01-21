import ChatBot from "@/components/chatbot/ChatBot";
import { auth } from "@/lib/auth";
import React from "react";

const Chat = async () => {
  const session = await auth();
  // console.log(session);
  return (
    <div>
      <ChatBot session={session} />
    </div>
  );
};

export default Chat;
