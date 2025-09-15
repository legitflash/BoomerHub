
import React from 'react';
import type { Post } from '@/lib/types';
import PostCard from './post-card';
import SearchAdCard from '../ads/search-ad-card';

type PostOrAd = Post | React.ReactElement;

interface PostGridProps {
  posts: Post[];
  includeAd?: boolean;
}

export default function PostGrid({ posts, includeAd = false }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-muted-foreground">No posts found.</p>;
  }

  const postsWithAd: PostOrAd[] = [...posts];
  // Insert an ad card after the 2nd post if requested and if there are enough posts
  if (includeAd && postsWithAd.length >= 2) {
      const adCard = <SearchAdCard key="grid-ad" />;
      postsWithAd.splice(2, 0, adCard);
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {postsWithAd.map((post, index) => {
        if (React.isValidElement(post)) {
            return post;
        }
        return <PostCard key={(post as Post).slug || index} post={post as Post} />;
      })}
    </div>
  );
}

