
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // User is signed in, let's get their profile from Firestore
        const profile = await getUserProfile(firebaseUser.uid);
        setUser({
          ...firebaseUser,
          ...(profile || {}), // Merge profile data
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
