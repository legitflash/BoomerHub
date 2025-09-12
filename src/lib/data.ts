
import type { TopCategory } from './types';
import { Briefcase, Clock, Code, LineChart, DollarSign, BrainCircuit, Tv, Megaphone, Users, Rocket, BarChart, Newspaper, Droplets, Gamepad, Trophy, TrendingUp, Bot, AudioLines, PiggyBank, Search, Plane, Languages, Edit, KeyRound } from 'lucide-react';

export const adLinks = [
  "https://otieu.com/4/9697212", // Monetag
  "https://chickenadjacent.com/ebjb0w2rm?key=7bf3c280c5f98c617913935e30c2fb3c" // Adsterra Smart Link
]; 

export const topCategories: TopCategory[] = [
  { name: 'Finance', icon: DollarSign, slug: 'finance' },
  { name: 'AI/Tech', icon: BrainCircuit, slug: 'ai-tech' },
  { name: 'Social Media', icon: Megaphone, slug: 'social-media' },
  { name: 'Freelancing', icon: Briefcase, slug: 'freelancing'},
];

export const aiToolsCategories = [
    { name: 'AI Match Prediction', icon: Search, slug: '/ai/match-prediction', flowName: 'generateMatchAnalysisFlow' },
    { name: 'AI Financial Advisor', icon: PiggyBank, slug: '/ai/financial-adviser', flowName: 'generateFinancialAdviceFlow' },
    { name: 'AI Text Translator', icon: Languages, slug: '/ai/text-translator', flowName: 'translateTextFlow' },
];
