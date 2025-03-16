"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  created_at: string;
}

interface Props {
  slug: string;
  commentsOrder: string;
  comments: any[];
}

const AllComments = ({ slug, commentsOrder }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", slug)
        .order("created_at", { ascending: commentsOrder === "asc" });

      if (error) {
        console.error("Error fetching comments:", error);
        return;
      }

      console.log("Fetched comments:", data); // Log the fetched comments
      setComments(data || []);
    };

    fetchComments();
  }, [slug, commentsOrder]);

  return (
    <div>
      <h3>All Comments</h3>
      {comments.length === 0 && <p>No comments yet.</p>}
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
    </div>
  );
};

export default AllComments;
