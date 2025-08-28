
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { getUserProfile } from '@/services/user-service';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOutUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOutUser: () => {},
});

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is signed in, try to get their profile from Firestore.
        // It might not exist immediately after registration, so we add a small retry mechanism.
        let profile: User | null = null;
        let attempts = 0;
        while (!profile && attempts < 3) {
            profile = await getUserProfile(firebaseUser.uid);
            if (!profile) {
                attempts++;
                await delay(500); // Wait 500ms before retrying
            }
        }
        
        setUser({
          ...firebaseUser,
          ...(profile || {}), // Merge profile data, even if it's empty on failure
        });
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const signOutUser = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
