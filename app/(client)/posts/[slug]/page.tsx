import AddComment from "@/app/components/AddComment";
import AllComments from "@/app/components/AllComments";
import Header from "@/app/components/Header";
// import Toc from "@/app/components/Toc";
import { slugify } from "@/app/utils/helpers";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { fetchComments } from "@/app/lib/comments";

// Define the font
const dateFont = Bricolage_Grotesque({ subsets: ["latin"], weight: "400" });

// Define PageParams and Props types
interface PageParams {
  slug: string;
}

interface PageProps {
  // Define the properties of PageProps here
}

interface Props extends PageProps {
  params: PageParams;
}

// Fetch post data based on slug and comments order
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    title,
    slug,
    publishedAt,
    excerpt,
    _id,
    "headings": body[style in ["h2", "h3", "h4", "h5", "h6"]],
    body,
    tags[]-> {
      _id,
      slug,
      name
    }
  }`;
  const post = await client.fetch(query);
  return post;
}

// Revalidate setting for this page
export const revalidate = 60;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const post: Post = await getPost(params.slug); // Ensure this is awaited
  if (!post) {
    return undefined;
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "en_US",
      url: `https://next-cms-blog-ce.vercel.app/${params.slug}`,
      siteName: "DevBlook",
    },
  };
}
const Page = async ({ params }: Props) => {
  const { slug } = params;

  const post: Post = await getPost(slug);
  const commentsOrder = "desc"; // Default order
  const comments = await fetchComments(post._id, commentsOrder);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Header title={post?.title} />
      <div className="text-center">
        <span className={`${dateFont?.className} text-purple-500`}>
          {new Date(post?.publishedAt).toDateString()}
        </span>
        <div className="mt-5">
          {post?.tags?.map((tag) => (
            <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
              <span className="mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900">
                #{tag.name}
              </span>
            </Link>
          ))}
        </div>
        <div className={richTextStyles}>
          <PortableText
            value={post?.body}
            components={myPortableTextComponents}
          />
          {/* Pass comments and slug to AllComments */}
          <AllComments
            slug={post.slug.current}
            comments={comments}
            commentsOrder={commentsOrder}
          />
        </div>
      </div>
    </div>
  );
};
export default Page;

// PortableText components for rendering rich text content
const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image
        src={urlForImage(value).url()}
        alt="Post"
        width={700}
        height={700}
      />
    ),
  },
  block: {
    h2: ({ value }: any) => (
      <h2
        id={slugify(value.children[0].text)}
        className="text-3xl font-bold mb-3"
      >
        {value.children[0].text}
      </h2>
    ),
    h3: ({ value }: any) => (
      <h3
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h3>
    ),
    h4: ({ value }: any) => (
      <h4
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h4>
    ),
    h5: ({ value }: any) => (
      <h5
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h5>
    ),
    h6: ({ value }: any) => (
      <h6
        id={slugify(value.children[0].text)}
        className="text-xl font-bold mb-3"
      >
        {value.children[0].text}
      </h6>
    ),
  },
};

// Styling for rich text content
const richTextStyles = `mt-14 text-justify max-w-2xl m-auto prose-headings:my-5 prose-heading:text-2xl prose-p:mb-5 prose-p:leading-7 prose-li:list-disc prose-li:leading-7 prose-li:ml-4`;
