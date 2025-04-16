// AuthContext Provider
"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to sign in with GitHub
  const gitHubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      return signInWithPopup(auth, provider);
    } catch (error) {
      console.error("GitHub Sign In Error:", error);
    }
  };

  // Function to sign in with Google
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign In Error:", error);
    }
  };

  // Function to sign out out of Firebase
  const firebaseSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, gitHubSignIn, googleSignIn, firebaseSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useUserAuth = () => {
  return useContext(AuthContext);
};
