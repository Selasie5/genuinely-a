"use client"
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Header from "@/app/components/Header";
import { Post } from "@/app/utils/interface";
import PostComponent from "@/app/components/PostComponent";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const query = `
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage {
      asset-> {
      _id,
      url
    }
    },
        tags[]-> {
          _id,
          slug,
          name
        }
      }
      `;
      const data: Post[] = await client.fetch(query);
      setPosts(data);
    }

    fetchPosts();
  }, []); 
  return (
    <div>
      <Header title="Articles" tags />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5" >
        {posts?.length > 0 &&
          posts.map((post) =>(
            <div className="" key={post._id}>
                <PostComponent key={post._id} post={post} />
              </div>
          
          )
           )}
      </div>
    </div>
  );
}
