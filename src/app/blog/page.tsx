import Link from 'next/link';
import Image from 'next/image';
import { blogPosts, blogCategories } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function BlogPage() {
  return (
    <div className="container py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Our Blog</h1>
        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
          Insights on finance, tech, social media, and more.
        </p>
      </header>

      <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
        {blogCategories.map(category => (
          <Link 
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <category.icon className="h-4 w-4" />
            {category.name}
          </Link>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="group flex flex-col">
            <Link href={`/blog/${post.slug}`} className="block">
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                data-ai-hint={post.dataAiHint}
                className="rounded-t-lg object-cover aspect-video"
              />
            </Link>
            <CardContent className="p-4 space-y-2 flex-grow flex flex-col">
              <span className="text-xs font-semibold text-primary uppercase">{post.category}</span>
              <Link href={`/blog/${post.slug}`} className="block">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors flex-grow">{post.title}</h3>
              </Link>
              <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
              <div className="flex items-center gap-2 pt-4 mt-auto text-xs text-muted-foreground">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.authorImage} alt={post.author} />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{post.author}</span>
                <span>&middot;</span>
                <span>{post.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
