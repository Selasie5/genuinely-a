import { supabase } from "@/app/lib/supabase";

export async function fetchComments(postId: string, order: "asc" | "desc" = "desc") {
  console.log("Fetching comments for postId:", postId, "Order:", order);

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: order === "asc" });

  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }

  console.log("Fetched comments:", data);
  return data;
}
