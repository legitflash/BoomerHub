
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

export const predictions: Prediction[] = [];
