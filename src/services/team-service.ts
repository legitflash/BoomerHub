
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';
import type { TeamMember } from '@/lib/types';

type CreateTeamMemberData = Omit<TeamMember, 'id'>;

export async function addTeamMember(memberData: CreateTeamMemberData): Promise<string> {
    try {
        const teamCollection = collection(db, 'team');
        const docRef = await addDoc(teamCollection, {
            ...memberData,
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
                role: data.role,
                image: data.image,
            };
        });

        return teamMembers;
    } catch (error) {
        console.error("Error getting team members: ", error);
        return [];
    }
}
