import Header from "@/app/components/Header";
import PostComponent from "@/app/components/PostComponent";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import React from "react";

async function getPostsByTag(tag: string) {
  const query = `
  *[_type == "post" && references(*[_type == "tag" && slug.current == "${tag}"]._id)]{
    title,
    slug,
    publishedAt,
    excerpt,
    tags[]-> {
      _id,
      slug,
      name
    }
  }
  `;

  const posts = await client.fetch(query);
  return posts;
}

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return {
    title: `#${slug}`,
    description: `Posts with the tag ${slug}`,
    openGraph: {
      title: `#${slug}`,
      description: `Posts with the tag ${slug}`,
      type: "website",
      locale: "en_US",
      url: `https://next-cms-blog-ce.vercel.app/${slug}`,
      siteName: "Genuinely A",
    },
  };
}

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const posts: Array<Post> = await getPostsByTag(slug);

  console.log(posts, "posts by tag");
  return (
    <div>
      <Header title={`#${slug}`} tags />
      <div>
        {posts?.length > 0 &&
          posts?.map((post) => <PostComponent key={post?._id} post={post} />)}
      </div>
    </div>
  );
};

export default page;
