import Link from 'next/link';
import React from 'react';
import {Manrope } from 'next/font/google';
import { Post } from '@/app/utils/interface';
import { urlForImage } from '@/sanity/lib/image';

interface Props {
  post: Post;
}

const font = Manrope({ weight: '400', subsets: ['latin'] });
const dateFont = Manrope({ weight: '400', subsets: ['latin'] });

const PostComponent = ({ post }: Props) => {
 
  const imageUrl = post?.mainImage && post.mainImage.asset? urlForImage(post.mainImage.asset).url() : null;
  console.log(imageUrl, "imageUrl in post component");
  return (
    <div className="flex justify-start items-center gap-4">
      <div>
        {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt={post.mainImage.alt || post?.title}
            className="w-24 h-24 rounded-md object-cover shadow-sm shadow-purple-950 dark:shadow-gray-900"
          />
        </div>
        )}
      </div>
      <Link href={`/posts/${post?.slug?.current}`}>
        <h2 className={`${font.className} text-2xl dark:text-white`}>{post?.title}</h2>
        <p className={`${dateFont.className} my-2 text-purple-800`}>{new Date(post?.publishedAt).toDateString()}</p>
        <p className="dark:text-gray-400 mb-4 line-clamp-2">{post?.excerpt}</p>
      </Link>

      {/* TAGS */}
      <div>
        {post?.tags?.map((tag) => (
          <span key={tag?._id} className="mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900">
            #{tag?.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostComponent;

// const cardStyle = `
// mb-8
// p-4
// border
// border-gray-900
// rounded-md
// shadow-sm
// shadow-purple-950
// hover:shadow-md
// hover:bg-purple-500
// hover:text-white
// hover:dark:bg-gray-950
// `
