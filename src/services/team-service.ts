
'use server';

import type { TeamMember } from '@/lib/types';

let teamMembers: TeamMember[] = [];
let initialized = false;

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function initializeData() {
    if (initialized) return;

    teamMembers = [
        {
            id: '1',
            name: 'John Makola',
            slug: 'john-makola',
            role: 'Founder & CEO',
            image: 'https://picsum.photos/seed/john-makola/200/200',
            description: 'John is the visionary behind BoomerHub, passionate about empowering individuals through technology and financial literacy.',
            email: 'john@boomerhub.com',
            userRole: 'admin',
        },
        {
            id: '2',
            name: 'Jane Smith',
            slug: 'jane-smith',
            role: 'Lead Editor',
            image: 'https://picsum.photos/seed/jane-smith/200/200',
            description: 'Jane ensures all content meets our high standards of quality, accuracy, and engagement. She is an expert in digital content strategy.',
            email: 'jane@boomerhub.com',
            userRole: 'editor',
        },
    ];

    initialized = true;
}

initializeData();

export async function addTeamMember(memberData: Omit<TeamMember, 'id' | 'slug'>): Promise<string> {
    const newMember: TeamMember = {
        id: String(teamMembers.length + 1),
        slug: slugify(memberData.name),
        ...memberData
    };
    teamMembers.push(newMember);
    return newMember.id;
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
    return teamMembers;
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
    return teamMembers.find(m => m.id === id) || null;
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
    return teamMembers.find(m => m.slug === slug) || null;
}

export async function updateTeamMember(id: string, memberData: Partial<TeamMember>): Promise<void> {
    const index = teamMembers.findIndex(m => m.id === id);
    if (index !== -1) {
        teamMembers[index] = { ...teamMembers[index], ...memberData };
        if (memberData.name) {
            teamMembers[index].slug = slugify(memberData.name);
        }
    }
}

export async function deleteTeamMember(id: string): Promise<void> {
    teamMembers = teamMembers.filter(m => m.id !== id);
}

export async function findUserByEmail(email: string): Promise<{ uid: string, email: string } | null> {
    const member = teamMembers.find(m => m.email === email);
    if (member) {
        return { uid: member.id, email: member.email! };
    }
    return null;
}

export async function updateUserRole(uid: string, role: 'admin' | 'editor' | 'member'): Promise<void> {
    const index = teamMembers.findIndex(m => m.id === uid);
    if (index !== -1) {
        teamMembers[index].userRole = role;
    }
}
