import { Post } from "@/lib/models";
import { NextResponse } from "next/server";
import { unstable_noStore } from "next/cache";

const { connectToDb } = require("@/lib/utils");

export const GET = async (request) => {
  unstable_noStore();
  try {
    await connectToDb();
    const posts = await Post.find();
    if (!posts) {
      return NextResponse.json(
        { error: "Error while fetching the posts" },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.log("======>route", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
