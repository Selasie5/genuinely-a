import { supabase } from "./supabase";

export async function fetchComments(postId: string, order: "asc" | "desc" = "desc") {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: order === "asc" });

  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }

  return data;
}
