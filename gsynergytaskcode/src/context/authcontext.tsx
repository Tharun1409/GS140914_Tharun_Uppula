import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";

// Define the shape of the authentication context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);
//AuthProvider Component manages authntication state and providees it to the entire APP
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
//useEffect to listen for Authentication state changes when the compoe=nent mounts 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Sign-In Error:", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
  };

  return (
    //Provide authentication contexxt in components
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  console.log("🔍 Auth Context Value:", context); 
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
