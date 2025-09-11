
'use server';

import type { TeamMember } from '@/lib/types';
import { client, urlFor } from '@/lib/sanity-client';

const memberFields = `
  _id,
  name,
  "slug": slug.current,
  role,
  image,
  description,
  email,
  userRole
`;

function formatMember(member: any): TeamMember {
    return {
        id: member._id,
        name: member.name,
        slug: member.slug,
        role: member.role,
        image: urlFor(member.image).width(200).height(200).url(),
        description: member.description,
        email: member.email,
        userRole: member.userRole,
    };
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
    const query = `*[_type == "author"] | order(name asc) {
        ${memberFields}
    }`;
    const results = await client.fetch(query);
    return results.map(formatMember);
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
    const query = `*[_type == "author" && slug.current == $slug][0] {
        ${memberFields}
    }`;
    const result = await client.fetch(query, { slug });
    return result ? formatMember(result) : null;
}

// These functions are deprecated as content is managed in Sanity.
export async function addTeamMember(memberData: Omit<TeamMember, 'id' | 'slug'>): Promise<string> {
    console.warn("addTeamMember is deprecated. Please use Sanity Studio.");
    return '';
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
    const query = `*[_type == "author" && _id == $id][0] {
        ${memberFields}
    }`;
    const result = await client.fetch(query, { id });
    return result ? formatMember(result) : null;
}

export async function updateTeamMember(id: string, memberData: Partial<TeamMember>): Promise<void> {
    console.warn("updateTeamMember is deprecated. Please use Sanity Studio.");
}

export async function deleteTeamMember(id: string): Promise<void> {
    console.warn("deleteTeamMember is deprecated. Please use Sanity Studio.");
}

export async function findUserByEmail(email: string): Promise<{ uid: string, email: string } | null> {
     const query = `*[_type == "author" && email == $email][0] {
        _id,
        email
    }`;
    const result = await client.fetch(query, { email });
    if (result) {
        return { uid: result._id, email: result.email };
    }
    return null;
}

export async function updateUserRole(uid: string, role: 'admin' | 'editor' | 'member'): Promise<void> {
    console.warn("updateUserRole is deprecated. Please use Sanity Studio.");
}
