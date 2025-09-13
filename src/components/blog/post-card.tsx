
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { Post } from '@/lib/types';
import { Badge } from '../ui/badge';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="group flex flex-col">
      <Link href={`/blog/${post.slug}`} className="block">
        <Image
          src={post.image}
          alt={post.title} // Using post title as alt text is a good default for SEO
          width={600}
          height={400}
          data-ai-hint={post.dataAiHint}
          className="w-full rounded-t-lg object-cover aspect-video"
        />
      </Link>
      <CardContent className="p-4 space-y-2 flex-grow flex flex-col">
        {post.category && (
            <Link href={`/blog/category/${post.categorySlug}`} className="w-fit">
              <Badge variant="outline">{post.category}</Badge>
            </Link>
        )}
        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors flex-grow">{post.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">{post.description}</p>
        <div className="flex items-center gap-2 pt-4 mt-auto text-xs text-muted-foreground">
          {post.authorImage && post.author && (
            <>
              <Avatar className="h-6 w-6">
                <AvatarImage src={post.authorImage} alt={post.author} />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{post.author}</span>
              <span>&middot;</span>
            </>
          )}
          <span>{post.date}</span>
        </div>
      </CardContent>
    </Card>
  );
}
