
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, doc, deleteDoc, getDoc, updateDoc, where } from 'firebase/firestore';
import type { TeamMember } from '@/lib/types';

type CreateTeamMemberData = Omit<TeamMember, 'id' | 'slug'>;
type UpdateTeamMemberData = Omit<TeamMember, 'id' | 'slug'>;

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w-]+/g, '')    // Remove all non-word chars
    .replace(/--+/g, '-')       // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}


export async function addTeamMember(memberData: CreateTeamMemberData): Promise<string> {
    try {
        const teamCollection = collection(db, 'team');
        const slug = slugify(memberData.name);

        const docRef = await addDoc(teamCollection, {
            ...memberData,
            slug,
            createdAt: serverTimestamp(),
        });
        console.log("Team member added with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding team member: ", error);
        throw new Error('Could not create team member in database.');
    }
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
    try {
        const teamCollection = collection(db, 'team');
        const q = query(teamCollection, orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);

        const teamMembers: TeamMember[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                slug: data.slug || slugify(data.name),
                role: data.role,
                image: data.image,
                description: data.description || '',
            };
        });

        return teamMembers;
    } catch (error) {
        console.error("Error getting team members: ", error);
        return [];
    }
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
    try {
        const memberDocRef = doc(db, 'team', id);
        const docSnap = await getDoc(memberDocRef);

        if (!docSnap.exists()) {
            console.log("No such document!");
            return null;
        }

        const data = docSnap.data();
        return {
            id: docSnap.id,
            name: data.name,
            slug: data.slug || slugify(data.name),
            role: data.role,
            image: data.image,
            description: data.description || '',
        };
    } catch (error) {
        console.error("Error getting team member:", error);
        throw new Error('Could not retrieve team member from database.');
    }
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  try {
    const teamCollection = collection(db, 'team');
    const q = query(teamCollection, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      slug: data.slug,
      role: data.role,
      image: data.image,
      description: data.description || '',
    };
  } catch (error) {
    console.error("Error getting team member by slug: ", error);
    return null;
  }
}

export async function updateTeamMember(id: string, memberData: UpdateTeamMemberData): Promise<void> {
    try {
        const memberDocRef = doc(db, 'team', id);
        const slug = slugify(memberData.name);
        await updateDoc(memberDocRef, {
            ...memberData,
            slug,
            updatedAt: serverTimestamp(),
        });
        console.log("Team member updated with ID: ", id);
    } catch (error) {
        console.error("Error updating team member: ", error);
        throw new Error('Could not update team member in database.');
    }
}


export async function deleteTeamMember(id: string): Promise<void> {
    try {
        const memberDocRef = doc(db, 'team', id);
        await deleteDoc(memberDocRef);
        console.log("Team member deleted with ID: ", id);
    } catch (error) {
        console.error("Error deleting team member: ", error);
        throw new Error('Could not delete team member from database.');
    }
}
