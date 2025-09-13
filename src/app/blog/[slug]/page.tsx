
import { notFound } from 'next/navigation';
import BlogPostContent from '@/components/blog/blog-post-client-content';
import { getAllPosts, getPostBySlug } from '@/services/post-service';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boomerhub.com';

// Generate dynamic metadata for each blog post
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const keywords = post.keywords ? post.keywords.split(',').map(k => k.trim()) : [post.category];
  const previousImages = (await parent).openGraph?.images || [];
  const postImageUrl = post.image; // Already a full URL

  return {
    title: post.title,
    description: post.description,
    keywords: keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName: 'BoomerHub',
      images: [
        {
          url: postImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
        ...previousImages,
      ],
      type: 'article',
      publishedTime: new Date(post.rawDate).toISOString(),
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [postImageUrl],
    },
  }
}

// This is the main page component, which is a Server Component.
// It fetches the data and passes it to the Client Component.
export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }
  
  const allPosts = await getAllPosts();

  // JSON-LD structured data for rich snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    name: post.title,
    description: post.description,
    image: post.image,
    datePublished: new Date(post.rawDate).toISOString(), // Use rawDate
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BoomerHub',
    },
  };

  return (
    <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BlogPostContent post={post} allPosts={allPosts} />
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
