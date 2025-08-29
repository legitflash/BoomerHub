
import type { Prediction, TopCategory, BlogCategory, TeamMember } from './types';
import { Briefcase, Clock, Code, LineChart, DollarSign, BrainCircuit, Tv, Megaphone, Users, Rocket, BarChart, Newspaper, Droplets, Gamepad, Trophy, TrendingUp, Bot, AudioLines, PiggyBank, Search } from 'lucide-react';

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

export const teamMembers: TeamMember[] = [];

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
