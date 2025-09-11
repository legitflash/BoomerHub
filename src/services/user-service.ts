
'use server';

// This is a mock user service. In a real application, this would interact with a database.

interface User {
    uid: string;
    email: string;
    role: 'admin' | 'editor' | 'member';
}

let users: User[] = [
    { uid: '1', email: 'john@boomerhub.com', role: 'admin' },
    { uid: '2', email: 'jane@boomerhub.com', role: 'editor' },
];

export async function findUserByEmail(email: string): Promise<{ uid: string, email: string } | null> {
    const user = users.find(u => u.email === email);
    if (user) {
        return { uid: user.uid, email: user.email };
    }
    return null;
}

export async function updateUserRole(uid: string, role: 'admin' | 'editor' | 'member'): Promise<void> {
  const user = users.find(u => u.uid === uid);
  if (user) {
      user.role = role;
      console.log(`Successfully updated role for user ${uid} to ${role}`);
  } else {
      console.warn(`User with UID ${uid} not found. Cannot update role.`);
  }
}
