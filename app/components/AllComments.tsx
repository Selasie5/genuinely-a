"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase"; // Import Supabase client
import AddComment from "@/app/components/AddComment"; // Import AddComment

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  created_at: string;
}

interface Props {
  slug: string;
  comments: Comment[]; // Initial comments passed from the server
  commentsOrder: "asc" | "desc";
}

const AllComments = ({ slug, comments: initialComments, commentsOrder }: Props) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  // Function to refetch comments
  const refetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", slug)
      .order("created_at", { ascending: commentsOrder === "asc" });

    if (!error && data) {
      setComments(data);
    }
  };

  // Fetch initial comments when the component mounts
  useEffect(() => {
    refetchComments();
  }, [slug, commentsOrder]);

  return (
    <div className="my-4">
      <h3 className="text-2xl font-bold">All Comments</h3>
      {comments.length === 0 && <p className="italic text-gray-400 font-semibold">No comments yet.</p>}
      {comments.length > 0 && (
        <div className="mb-2">
          <Link
            scroll={false}
            href={`/posts/${slug}?comments=asc`}
            className={`mr-4 text-sm ${
              commentsOrder === "asc" ? "text-purple-500" : ""
            }`}
          >
            Oldest
          </Link>
          <Link
            scroll={false}
            href={`/posts/${slug}?comments=desc`}
            className={`mr-4 text-sm ${
              commentsOrder === "desc" ? "text-purple-500" : ""
            }`}
          >
            Newest
          </Link>
        </div>
      )}
      {comments.map((comment) => (
        <div key={comment.id} className="border-b border-gray-200/50 py-2">
          <p>
            <strong>{comment.name}</strong>{" "}
            <span className="text-gray-500 text-sm">
              {new Date(comment.created_at).toLocaleString()}
            </span>
          </p>
          <p>{comment.comment}</p>
        </div>
      ))}
      {/* Pass refetchComments to AddComment */}
      <AddComment postId={slug} refetchComments={refetchComments} />
    </div>
  );
};

export default AllComments;
