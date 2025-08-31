
import type React from 'react';

export type Post = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  content?: string;
  image: string;
  dataAiHint: string;
  author: string;
  authorSlug: string;
  authorImage?: string;
  date: string;
};

export type Page = {
  id?: string;
  slug: string;
  title: string;
  content: string;
  createdAt: any;
  updatedAt: any;
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
  prediction: string;
  correctScore: string;
  odds: string;
  confidence: 'high' | 'medium' | 'low' | string;
  status: 'Won' | 'Lost' | 'Pending';
  isHot: boolean;
  analysis?: string;
  matchDate?: string;
  createdAt?: string;
  teams: {
    home: {
      name:string;
      logo: string;
      form: string[];
    };
    away: {
      name: string;
      logo: string;
      form: string[];
    };
  };
};

export type TeamMember = {
  id: string;
  name: string;
  slug: string;
  role: string;
  image: string;
  description: string;
  email?: string;
  userRole?: 'admin' | 'editor' | 'member';
};

export type SavedPost = {
    userId: string;
    postId: string;
};

export type Submission = {
    id: string;
    name: string;
    email: string;
    subject?: string;
    message: string;
    type: 'Contact' | 'Advertising' | 'Writer Pitch';
    createdAt: string;
    companyName?: string;
    portfolioLink?: string;
    socialProfileLink?: string;
}

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
    placement: 'before-post-content' | 'after-post-content';
    isActive: boolean;
    createdAt?: string;
};

export type CategoryFollow = {
  userId: string;
  categorySlug: string;
};

export type Notification = {
  id: string;
  userId: string;
  postId: string;
  postTitle: string;
  postSlug: string;
  categorySlug: string;
  createdAt: string;
  isRead: boolean;
};
