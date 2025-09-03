
import { notFound } from 'next/navigation';
import BlogPostContent from '@/components/blog/blog-post-client-content';
import { getAllPosts, getPostBySlug } from '@/services/post-service';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string }
}

// Generate dynamic metadata for each blog post
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for does not exist.',
    }
  }

  // Optionally, you can add more metadata here
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.category.split(',').map(k => k.trim()),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      images: [post.image, ...previousImages],
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
    },
  }
}

// This is the main page component, which is a Server Component.
// It fetches the data and passes it to the Client Component.
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }
  
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 6);

  // JSON-LD structured data for rich snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    name: post.title,
    description: post.description,
    image: post.image,
    datePublished: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
      url: `/author/${post.authorSlug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BoomerHub',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png', // Assuming you have a logo in /public/logo.png
      },
    },
  };

  return (
    <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BlogPostContent post={post} relatedPosts={relatedPosts} />
    </>
  );
}

// Optional: Generate static paths for all posts at build time for performance.
export async function generateStaticParams() {
  const posts = await getAllPosts();
 
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
