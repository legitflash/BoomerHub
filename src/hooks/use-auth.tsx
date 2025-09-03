
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, type User as FirebaseUser, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Define the shape of the user object, extending Firebase's User type
export interface User extends FirebaseUser {
  isAdmin?: boolean;
  isEditor?: boolean;
}

// Define the shape of the context state
interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isEditor: boolean;
  isLoading: boolean;
  signUp: (email: string, pass: string, displayName: string) => Promise<any>;
  signIn: (email: string, pass: string) => Promise<any>;
  signOutUser: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isEditor: false,
  isLoading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOutUser: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        // Check for role in Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.exists() ? userDoc.data() : null;
        
        const userIsAdmin = userData?.role === 'admin';
        const userIsEditor = userData?.role === 'editor';
        
        // Create our custom user object
        const customUser: User = {
          ...firebaseUser,
          isAdmin: userIsAdmin,
          isEditor: userIsEditor,
        };
        
        setUser(customUser);
        setIsAdmin(userIsAdmin);
        setIsEditor(userIsEditor);

      } else {
        setUser(null);
        setIsAdmin(false);
        setIsEditor(false);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, pass: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const firebaseUser = userCredential.user;
    
    // After creating the user, update their profile with the display name
    if (firebaseUser) {
      await updateProfile(firebaseUser, {
        displayName: displayName
      });
      // Also, save the user info to Firestore for role management
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      await setDoc(userDocRef, {
        email: email,
        displayName: displayName,
        createdAt: new Date(),
        role: 'member' // Default role
      }, { merge: true });
    }
    
    return userCredential;
  };

  const signIn = async (email: string, pass: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    return userCredential;
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const value = {
    user,
    isAdmin,
    isEditor,
    isLoading,
    signUp,
    signIn,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
