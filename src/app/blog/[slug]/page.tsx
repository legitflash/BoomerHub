
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import type { Post } from '@/lib/types';
import BlogPostContent from '@/components/blog/blog-post-client-content';

// This is the main page component, which is a Server Component.
// It fetches the data and passes it to the Client Component.
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}
