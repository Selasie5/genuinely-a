import { supabase } from "@/app/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { name, email, comment, postId } = data;

  if (!name || !email || !comment || !postId) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("comments")
      .insert([{ name, email, comment, post_id: postId }])
      .select();

    if (error) {
      console.error("Supabase error:", error); // Log the error
      throw error;
    }

    return NextResponse.json(
      { message: "Comment added successfully", comment: data },
      { status: 201 }
    );
  } catch (error) {
    console.error("API route error:", error); // Log the error
    return NextResponse.json(
      { message: "Failed to create a comment", error },
      { status: 500 }
    );
  }
}
