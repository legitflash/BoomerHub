
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

// Define the shape of your custom user object
interface User extends FirebaseUser {
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check for admin role in Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        const isAdminUser = userDoc.exists() && userDoc.data().role === 'admin';
        
        const enrichedUser: User = {
          ...firebaseUser,
          // Since we can't add properties directly, we manage isAdmin separately
        };

        setUser(enrichedUser);
        setIsAdmin(isAdminUser);

      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = { user, loading, isAdmin };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// You'll need to create an admin user in Firebase Authentication
// and then create a document for them in Firestore in the 'users' collection
// with their UID as the document ID and a field `role: "admin"`.
// Example Firestore data for a user document:
// Collection: `users`
// Document ID: `(the user's UID from Firebase Auth)`
// Fields: `{ "role": "admin" }`
