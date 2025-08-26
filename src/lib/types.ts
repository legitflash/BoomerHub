import type React from 'react';

export type Post = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  dataAiHint: string;
  author: string;
  authorImage: string;
  date: string;
};

export type Course = {
  slug: string;
  title: string;
  track: string;
  description: string;
  image: string;
  dataAiHint: string;
  lessons: number;
  hours: number;
  isFeatured?: boolean;
  progress?: number;
  level?: 'Free' | 'Premium';
};

export type Category = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};
