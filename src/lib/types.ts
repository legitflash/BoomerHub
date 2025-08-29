
import type React from 'react';
import type { User as FirebaseUser } from 'firebase/auth';

export type User = FirebaseUser & {
    firstName?: string;
    lastName?: string;
    isAdmin?: boolean;
}

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
  role: string;
  image: string;
  description: string;
};

export type SavedPost = {
    userId: string;
    postId: string;
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
