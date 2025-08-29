
import type { Post, Prediction, TopCategory, BlogCategory } from './types';
import { Briefcase, Clock, Code, LineChart, DollarSign, BrainCircuit, Tv, Megaphone, Users, Rocket, BarChart, Newspaper, Droplets, Gamepad, Trophy, TrendingUp, Bot, AudioLines, PiggyBank, Search } from 'lucide-react';

export const blogPosts: Post[] = [
  // Money & Finance
  {
    slug: 'start-forex-trading-with-10-dollars',
    title: 'How to Start Forex Trading with Just $10',
    category: 'Finance',
    description: 'A beginner-friendly guide to entering the forex market with minimal investment. Learn the basics and make your first trade.',
    image: 'https://picsum.photos/seed/forex/600/400',
    dataAiHint: 'money chart',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author1/40/40',
    date: '2024-07-28',
  },
  {
    slug: '5-crypto-wallets-for-beginners-2025',
    title: '5 Crypto Wallets Every Beginner Should Use in 2025',
    category: 'Crypto News',
    description: 'Discover the most secure and user-friendly crypto wallets to start your journey in digital currencies.',
    image: 'https://picsum.photos/seed/crypto/600/400',
    dataAiHint: 'digital wallet',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author2/40/40',
    date: '2024-07-27',
  },
  {
    slug: 'nigerian-side-hustles-500-monthly',
    title: '10 Side Hustles Nigerians Are Using to Make $500+ Monthly',
    category: 'Finance',
    description: 'Explore popular and effective side hustles that are helping Nigerians achieve their financial goals.',
    image: 'https://picsum.photos/seed/hustle/600/400',
    dataAiHint: 'small business',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author3/40/40',
    date: '2024-07-26',
  },
  {
    slug: 'earn-passive-income-online',
    title: 'How to Earn Passive Income Online (Even While Sleeping)',
    category: 'Finance',
    description: 'Learn proven strategies to create automated income streams that work for you 24/7.',
    image: 'https://picsum.photos/seed/passive/600/400',
    dataAiHint: 'laptop beach',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author4/40/40',
    date: '2024-07-25',
  },
  // Social Media Monetization
  {
    slug: 'create-facebook-business-page',
    title: 'How to Create a Facebook Page for Your Business (Step by Step)',
    category: 'Social Media',
    description: 'A complete walkthrough on setting up a professional Facebook page to attract customers and grow your brand.',
    image: 'https://picsum.photos/seed/facebook/600/400',
    dataAiHint: 'social media',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author5/40/40',
    date: '2024-07-24',
  },
  {
    slug: 'monetize-youtube-shorts-2025',
    title: 'How to Monetize YouTube Shorts in 2025',
    category: 'Social Media',
    description: 'Unlock the potential of YouTube Shorts and learn how to turn your short-form content into a revenue source.',
    image: 'https://picsum.photos/seed/youtube/600/400',
    dataAiHint: 'video creator',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author6/40/40',
    date: '2024-07-23',
  },
  {
    slug: 'tiktok-monetization-trending-sounds',
    title: 'TikTok Monetization: How to Earn from Trending Sounds',
    category: 'Social Media',
    description: 'Capitalize on viral trends by learning how to use trending sounds to monetize your TikTok presence.',
    image: 'https://picsum.photos/seed/tiktok/600/400',
    dataAiHint: 'phone screen',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author7/40/40',
    date: '2024-07-22',
  },
  {
    slug: 'grow-telegram-channel-get-paid',
    title: 'How to Grow a Telegram Channel and Get Paid',
    category: 'Social Media',
    description: 'Strategies for building a large and engaged Telegram channel and the different ways to monetize it.',
    image: 'https://picsum.photos/seed/telegram/600/400',
    dataAiHint: 'messaging app',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author8/40/40',
    date: '2024-07-21',
  },
  // AI & Tech
  {
    slug: 'use-chatgpt-to-make-money',
    title: 'How to Use ChatGPT to Make Money Online',
    category: 'AI/Tech',
    description: 'Practical ways you can leverage ChatGPT to create new income streams and automate tasks.',
    image: 'https://picsum.photos/seed/chatgpt/600/400',
    dataAiHint: 'artificial intelligence',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author9/40/40',
    date: '2024-07-20',
  },
  {
    slug: '5-ways-ai-can-help-start-side-hustle',
    title: '5 Ways AI Can Help You Start a Side Hustle',
    category: 'AI/Tech',
    description: 'Discover how AI tools can simplify the process of launching and running a successful side business.',
    image: 'https://picsum.photos/seed/ai-hustle/600/400',
    dataAiHint: 'robot assistant',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author10/40/40',
    date: '2024-07-19',
  },
  {
    slug: 'build-no-code-app-in-1-hour-glide',
    title: 'How to Build a No-Code App in 1 Hour (Glide Tutorial)',
    category: 'App/Web Reviews',
    description: 'A step-by-step tutorial on using Glide to build a fully functional application without any coding knowledge.',
    image: 'https://picsum.photos/seed/glide-app/600/400',
    dataAiHint: 'app development',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author11/40/40',
    date: '2024-07-18',
  },
  {
    slug: 'create-telegram-bot-without-coding',
    title: 'How to Create a Telegram Bot Without Coding',
    category: 'AI/Tech',
    description: 'Learn how to build and deploy your own Telegram bot using no-code platforms.',
    image: 'https://picsum.photos/seed/telegram-bot/600/400',
    dataAiHint: 'robot chat',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author12/40/40',
    date: '2024-07-17',
  },
  // Freelancing & Jobs
  {
    slug: 'top-10-fiverr-gigs-with-ai-tools',
    title: 'Top 10 Fiverr Gigs You Can Start With AI Tools',
    category: 'Top 10s',
    description: 'Find out the most in-demand Fiverr services you can offer by leveraging powerful AI tools.',
    image: 'https://picsum.photos/seed/fiverr/600/400',
    dataAiHint: 'freelance work',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author13/40/40',
    date: '2024-07-16',
  },
  {
    slug: 'start-freelancing-with-zero-experience',
    title: 'How to Start Freelancing with Zero Experience',
    category: 'Freelancing',
    description: 'A roadmap for aspiring freelancers on how to land their first client and build a successful career from scratch.',
    image: 'https://picsum.photos/seed/freelance-zero/600/400',
    dataAiHint: 'home office',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author14/40/40',
    date: '2024-07-15',
  },
  {
    slug: 'upwork-vs-fiverr-2025',
    title: 'Upwork vs Fiverr: Which is Better in 2025?',
    category: 'Freelancing',
    description: 'An in-depth comparison of the two leading freelance platforms to help you choose the right one for your skills.',
    image: 'https://picsum.photos/seed/upwork-fiverr/600/400',
    dataAiHint: 'decision choice',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author15/40/40',
    date: '2024-07-14',
  },
  {
    slug: 'get-paid-online-payment-gateways',
    title: 'How to Get Paid Online (Payoneer, Binance, Wise, Flutterwave)',
    category: 'GetPaidTo',
    description: 'A guide to the best online payment platforms for freelancers and businesses to receive payments globally.',
    image: 'https://picsum.photos/seed/payment/600/400',
    dataAiHint: 'online payment',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author16/40/40',
    date: '2024-07-13',
  },
  // Productivity & Lifestyle
  {
    slug: '7-tools-for-remote-workers-2025',
    title: '7 Tools Every Remote Worker Needs in 2025',
    category: 'Productivity',
    description: 'Boost your productivity and collaboration with these essential tools for working from anywhere.',
    image: 'https://picsum.photos/seed/remote-tools/600/400',
    dataAiHint: 'desk setup',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author17/40/40',
    date: '2024-07-12',
  },
  {
    slug: 'time-management-for-side-hustlers',
    title: 'How to Manage Your Time Like a Pro (For Side Hustlers)',
    category: 'Productivity',
    description: 'Learn effective time management techniques to balance a full-time job with your side hustle.',
    image: 'https://picsum.photos/seed/time-manage/600/400',
    dataAiHint: 'calendar planning',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author18/40/40',
    date: '2024-07-11',
  },
  {
    slug: 'build-personal-brand-online-30-days',
    title: 'How to Build Your Personal Brand Online in 30 Days',
    category: 'Productivity',
    description: 'A 30-day challenge to help you create a strong and authentic personal brand on social media and beyond.',
    image: 'https://picsum.photos/seed/brand/600/400',
    dataAiHint: 'personal branding',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author19/40/40',
    date: '2024-07-10',
  },
  {
    slug: 'best-apps-to-earn-rewards-2025',
    title: 'Best Apps to Earn Rewards from Daily Tasks (2025 list)',
    category: 'GetPaidTo',
    description: 'A curated list of mobile apps that reward you for completing simple daily tasks, surveys, and more.',
    image: 'https://picsum.photos/seed/rewards-app/600/400',
    dataAiHint: 'gift card',
    author: 'Favour Uduafemhe',
    authorImage: 'https://picsum.photos/seed/author20/40/40',
    date: '2024-07-09',
  },
];

export const topCategories: TopCategory[] = [
  { name: 'Forex', icon: LineChart, slug: 'finance' },
  { name: 'AI', icon: BrainCircuit, slug: 'ai-tech' },
  { name: 'Social Media', icon: Megaphone, slug: 'social-media' },
  { name: 'Online Hustles', icon: Briefcase, slug: 'freelancing'},
];

export const blogCategories: BlogCategory[] = [
    { name: 'Finance', iconName: 'DollarSign', slug: 'finance' },
    { name: 'Social Media', iconName: 'Tv', slug: 'social-media' },
    { name: 'AI/Tech', iconName: 'Code', slug: 'ai-tech' },
    { name: 'Freelancing', iconName: 'Briefcase', slug: 'freelancing' },
    { name: 'Productivity', iconName: 'Clock', slug: 'productivity' },
    { name: 'GetPaidTo', iconName: 'Rocket', slug: 'getpaidto' },
    { name: 'App/Web Reviews', iconName: 'BarChart', slug: 'app-web-reviews' },
    { name: 'Crypto News', iconName: 'Newspaper', slug: 'crypto-news' },
    { name: 'Airdrop', iconName: 'Droplets', slug: 'airdrop' },
    { name: 'Sports', iconName: 'Gamepad', slug: 'sports' },
    { name: 'Top 10s', iconName: 'Trophy', slug: 'top-10s' },
    { name: 'Betting Predictions', iconName: 'TrendingUp', slug: 'betting-predictions' },
];


export const aiToolsCategories = [
    { name: 'AI Match Prediction', icon: Search, slug: '/ai/match-prediction' },
    { name: 'AI Audio Transcriber', icon: AudioLines, slug: '/ai/audio-transcriber' },
    { name: 'AI Financial Advisor', icon: PiggyBank, slug: '/ai/financial-adviser' },
];

export const predictions: Prediction[] = [
  {
    id: 1,
    league: "Premier League",
    match: "Man City vs. Arsenal",
    prediction: "Man City to Win",
    correctScore: "2-1",
    odds: "1.85",
    confidence: "high",
    status: "Won",
    isHot: false,
    teams: {
      home: { name: "Man City", logo: "/placeholder.svg", form: ["W", "W", "D", "W", "L"] },
      away: { name: "Arsenal", logo: "/placeholder.svg", form: ["W", "D", "W", "W", "W"] }
    }
  },
  {
    id: 2,
    league: "La Liga",
    match: "Real Madrid vs. Barcelona",
    prediction: "Over 2.5 Goals",
    correctScore: "3-1",
    odds: "1.70",
    confidence: "high",
    status: "Pending",
    isHot: true,
    teams: {
      home: { name: "Real Madrid", logo: "/placeholder.svg", form: ["W", "W", "W", "D", "W"] },
      away: { name: "Barcelona", logo: "/placeholder.svg", form: ["L", "W", "W", "W", "D"] }
    }
  },
  {
    id: 3,
    league: "Serie A",
    match: "Inter Milan vs. Juventus",
    prediction: "Both Teams to Score",
    correctScore: "1-1",
    odds: "1.90",
    confidence: "medium",
    status: "Lost",
    isHot: false,
    teams: {
      home: { name: "Inter Milan", logo: "/placeholder.svg", form: ["D", "W", "L", "W", "W"] },
      away: { name: "Juventus", logo: "/placeholder.svg", form: ["W", "D", "L", "W", "D"] }
    }
  },
    {
    id: 4,
    league: "Bundesliga",
    match: "Bayern Munich vs. Dortmund",
    prediction: "Bayern -1.5 Handicap",
    correctScore: "3-0",
    odds: "2.10",
    confidence: "high",
    status: "Pending",
    isHot: true,
    teams: {
      home: { name: "Bayern Munich", logo: "/placeholder.svg", form: ["W", "W", "W", "W", "L"] },
      away: { name: "Dortmund", logo: "/placeholder.svg", form: ["W", "L", "D", "W", "W"] }
    }
  },
   {
    id: 5,
    league: "Ligue 1",
    match: "PSG vs. Monaco",
    prediction: "Under 3.5 Goals",
    correctScore: "2-0",
    odds: "1.65",
    confidence: "medium",
    status: "Won",
    isHot: false,
    teams: {
      home: { name: "PSG", logo: "/placeholder.svg", form: ["W", "D", "W", "D", "W"] },
      away: { name: "Monaco", logo: "/placeholder.svg", form: ["L", "W", "D", "L", "W"] }
    }
  },
  {
    id: 6,
    league: "Champions League",
    match: "Liverpool vs. Atletico Madrid",
    prediction: "Liverpool to Qualify",
    correctScore: "1-0",
    odds: "1.50",
    confidence: "high",
    status: "Pending",
    isHot: false,
    teams: {
      home: { name: "Liverpool", logo: "/placeholder.svg", form: ["W", "W", "L", "D", "W"] },
      away: { name: "Atletico Madrid", logo: "/placeholder.svg", form: ["D", "L", "W", "W", "D"] }
    }
  },
];
    

    
