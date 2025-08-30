
import { notFound } from 'next/navigation';
import BlogPostContent from '@/components/blog/blog-post-client-content';
import { getAllPosts, getPostBySlug } from '@/services/post-service';

// This is the main page component, which is a Server Component.
// It fetches the data and passes it to the Client Component.
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // We need to fetch all posts again for related posts, or pass them down.
  // Passing them down is more efficient.
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 6);

  return <BlogPostContent post={post} relatedPosts={relatedPosts} />;
}

// Optional: Generate static paths for all posts at build time for performance.
export async function generateStaticParams() {
  const posts = await getAllPosts();
 
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

    