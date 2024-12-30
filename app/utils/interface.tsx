export interface RichTextBlock {
  _key: string; // Unique key for each content block
  _type: "block"; // The type will be "block" for paragraphs, headings, etc.
  children: Array<RichTextChild>; // Array of children within this block
  markDefs?: Array<RichTextMarkDef>; // Mark definitions (e.g., links)
  style?: string; // Style information like headings, paragraphs, etc.
}

export interface RichTextChild {
  _key: string; // Unique key for each child
  text: string; // Text content
  marks?: string[]; // Any marks like bold, italic, etc.
}

export interface RichTextMarkDef {
  _key: string; // Unique key for the mark
  _type: string; // Type of the mark (e.g., "link")
  href?: string; // Optional URL for links
}

export interface Post {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  body: Array<RichTextBlock>; // Corrected to RichTextBlock
  tags: Array<Tag>;
  _id: string;
  headings?: Array<HTMLHeadElement | string>;
  comments?: Array<Comment>;
}

export interface Tag {
  name: string;
  slug: { current: string };
  _id: string;
  postCount?: number; // Optional post count for the tag
}

export interface Comment {
  name: string; // Commenter's name
  comment: string; // Content of the comment
  _createdAt: string; // Creation timestamp
  _id: string; // Unique ID for the comment
}
