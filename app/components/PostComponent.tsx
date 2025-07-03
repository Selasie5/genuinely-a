import Link from 'next/link';
import React from 'react';
import { Manrope } from 'next/font/google';
import { Post } from '@/app/utils/interface';
import { urlForImage } from '@/sanity/lib/image';

interface Props {
  post: Post;
}

const font = Manrope({ weight: '800', subsets: ['latin'] });
const dateFont = Manrope({ weight: '400', subsets: ['latin'] });

const PostComponent = ({ post }: Props) => {
  const imageUrl = post?.mainImage?.asset ? urlForImage(post.mainImage.asset).url() : null;

  return (
    <div
      className="relative flex items-end justify-start h-64 rounded-md   hover:text-white hover:dark:bg-gray-950"
      style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 rounded-md"></div>
      <div className="relative z-10  p-4">
        <div className='flex flex-col items-start justify-start h-full'>
 <Link href={`/posts/${post?.slug?.current}`}>
          <h2 className={`${font.className} text-2xl text-white font-semibold`}>{post?.title}</h2>
                   <p className="text-gray-200 mb-4 line-clamp-2">{post?.excerpt}</p>
          <p className={`${dateFont.className} my-2 text-sm  text-purple-300`}>{new Date(post?.publishedAt).toDateString()}</p>
 
        </Link>

        {/* TAGS */}
        <div className='mt-2'>
          {post?.tags?.map((tag) => (
            <span
              key={tag?._id}
              className="bg-white text-black mr-2  py-1 px-3 rounded-full text-sm lowercase  "
            >
              #{tag?.name}
            </span>
          ))}
        </div>
        </div>
       
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
