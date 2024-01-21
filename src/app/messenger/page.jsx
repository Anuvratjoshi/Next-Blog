import Messenger from "@/components/messenger/Messenger";
import { auth } from "@/lib/auth";
import React from "react";

const page = async () => {
  const session = await auth();
  return (
    <div>
      <Messenger session={session} />
    </div>
  );
};

export default page;
