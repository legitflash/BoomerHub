import type React from 'react';

export type Post = {
  id?: string;
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
  id?: string;
  slug: string;
  title:string;
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

export type CourseProgress = {
    [courseId: string]: {
        progress: number;
        completedLessons: string[];
    }
}

export type Category = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type Prediction = {
  id: number;
  league: string;
  match: string;
  prediction: string;
  odds: string;
  confidence: 'high' | 'medium' | 'low' | string;
  status: 'Won' | 'Lost' | 'Pending';
  isHot: boolean;
  teams: {
    home: {
      name: string;
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
