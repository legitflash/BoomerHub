
'use server';

import type { Submission } from '@/lib/types';

let submissions: Submission[] = [];

export async function createSubmission(submissionData: Omit<Submission, 'id' | 'createdAt'>): Promise<string> {
    const newSubmission: Submission = {
        id: String(submissions.length + 1),
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        ...submissionData,
    };
    submissions.unshift(newSubmission);
    return newSubmission.id;
}

export async function getAllSubmissions(): Promise<Submission[]> {
    return submissions;
}
