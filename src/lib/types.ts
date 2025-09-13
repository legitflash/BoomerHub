
import type React from 'react';
import type { PortableTextBlock } from 'sanity';

export type Post = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  description: string;
  content?: any; // Sanity Portable Text
  image: string;
  dataAiHint: string;
  author: string;
  authorImage?: string;
  date: string;
  rawDate: string; // Add raw date for reliable parsing
  keywords?: string;
};

export type Page = {
  id?: string;
  slug: string;
  title: string;
  content: any; // Sanity Portable Text
  createdAt: string;
  updatedAt: string;
  rawUpdatedAt: string;
}

export type Category = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type BlogCategory = {
  id?: string;
  name: string;
  slug: string;
  iconName: string;
}

export type TopCategory = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  slug: string;
}

export type Prediction = {
  id: string;
  league: string;
  match: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  homeTeamForm: ('W' | 'D' | 'L')[];
  awayTeamForm: ('W' | 'D' | 'L')[];
  prediction: string;
  correctScore: string;
  odds: string;
  confidence: 'high' | 'medium' | 'low' | string;
  status: 'Won' | 'Lost' | 'Pending';
  isHot: boolean;
  analysis?: PortableTextBlock[];
  matchDate?: string;
  createdAt?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  slug: string;
  role: string;
  image: string;
  description: string;
};

export type Livescore = {
    idEvent: string;
    strEvent: string;
    strLeague: string;
    strHomeTeam: string;
    strAwayTeam: string;
    intHomeScore: string;
    intAwayScore: string;
    strStatus: string;
    strProgress: string;
}

export type Advertisement = {
    id: string;
    title: string;
    content: string;
    placement: 'before-post-content' | 'after-post-content' | 'header' | 'footer' | 'blog-feed' | 'sidebar';
    isActive: boolean;
    createdAt?: string;
};
