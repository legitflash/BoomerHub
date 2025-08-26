import type { Post, Course } from './types';
import { Briefcase, Clock, Code, LineChart, DollarSign, BrainCircuit, Tv, Megaphone, Users, Rocket, BarChart } from 'lucide-react';

export const blogPosts: Post[] = [
  {
    slug: 'forex-trading-basics',
    title: 'Forex Trading for Beginners: A Step-by-Step Guide',
    category: 'Money & Finance',
    description: 'Learn the fundamentals of forex trading, from understanding currency pairs to making your first trade.',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'finance chart',
    author: 'Jane Doe',
    authorImage: 'https://picsum.photos/40/40',
    date: '2024-07-20',
  },
  {
    slug: 'youtube-monetization',
    title: 'How to Monetize Your YouTube Channel in 2024',
    category: 'Social Media Monetization',
    description: 'Discover the latest strategies for turning your YouTube channel into a revenue-generating machine.',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'social media',
    author: 'John Smith',
    authorImage: 'https://picsum.photos/40/40',
    date: '2024-07-19',
  },
  {
    slug: 'telegram-bot-creation',
    title: 'Create Your First Telegram Bot with No Code',
    category: 'Tech & Tools',
    description: 'A comprehensive guide to building and deploying a Telegram bot without writing a single line of code.',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'robot technology',
    author: 'Alex Johnson',
    authorImage: 'https://picsum.photos/40/40',
    date: '2024-07-18',
  },
  {
    slug: 'ai-freelancing-gigs',
    title: 'Top 5 AI-Powered Freelancing Gigs You Can Start Today',
    category: 'Freelancing & Online Jobs',
    description: 'Explore lucrative freelancing opportunities that leverage the power of artificial intelligence.',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'freelance work',
    author: 'Emily White',
    authorImage: 'https://picsum.photos/40/40',
    date: '2024-07-17',
  },
];

export const courses: Course[] = [
  {
    slug: 'forex-mastery',
    title: 'Forex Mastery: From Basics to Advanced',
    track: 'Money Skills',
    description: 'A complete course on Forex trading, covering everything from the basics to advanced strategies.',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'stock market',
    lessons: 25,
    hours: 10,
    isFeatured: true,
    progress: 0,
  },
  {
    slug: 'ai-prompt-engineering-101',
    title: 'Prompt Engineering 101',
    track: 'AI & Tech Skills',
    description: 'Master the art of crafting effective prompts for AI models like ChatGPT and Gemini.',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'artificial intelligence',
    lessons: 15,
    hours: 5,
    progress: 0,
  },
  {
    slug: 'youtube-growth-adsense',
    title: 'YouTube Growth + AdSense',
    track: 'Social Media Growth & Monetization',
    description: 'Learn how to grow your YouTube channel and maximize your AdSense revenue.',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'video creator',
    lessons: 30,
    hours: 12,
    progress: 0,
  },
  {
    slug: 'how-to-create-telegram-bot-course',
    title: 'How to create a Telegram bot (practical course)',
    track: 'AI & Tech Skills',
    description: 'A hands-on course that walks you through creating and deploying a functional Telegram bot.',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'coding bot',
    lessons: 20,
    hours: 8,
    progress: 30,
  }
];

export const topCategories = [
  { name: 'Forex', icon: LineChart },
  { name: 'AI', icon: BrainCircuit },
  { name: 'Social Media', icon: Megaphone },
  { name: 'Online Hustles', icon: Briefcase },
];

export const blogCategories = [
    { name: 'Money & Finance', icon: DollarSign, slug: 'money-finance' },
    { name: 'Social Media Monetization', icon: Tv, slug: 'social-media' },
    { name: 'Tech & Tools', icon: Code, slug: 'tech-tools' },
    { name: 'Freelancing & Online Jobs', icon: Briefcase, slug: 'freelancing' },
    { name: 'Lifestyle & Productivity', icon: Clock, slug: 'lifestyle' },
];

export const courseTracks = [
    { name: 'Money Skills', icon: BarChart, slug: 'money-skills' },
    { name: 'AI & Tech Skills', icon: Rocket, slug: 'ai-tech-skills' },
    { name: 'Social Media Growth & Monetization', icon: Users, slug: 'social-media-growth' },
]
