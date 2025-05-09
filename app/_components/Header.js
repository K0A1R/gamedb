"use client";
import Link from "next/link";
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import AuthModal from "./auth-modal";

export default function Header() {
  const { user, gitHubSignIn, googleSignIn, firebaseSignOut } = useUserAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Function to get the user's profile image
  const getProfileImage = () => {
    if (!user) return null;
    const googlePhoto = user.providerData?.[0]?.photoURL;
    return googlePhoto || user.photoURL || null;
  };

  return (
    <>
      <header className="flex justify-between items-center bg-gray-900 text-white h-20 rounded-md p-4 shadow-sm">
        <Link href={"/game-db"} className="text-2xl font-bold">
          GameDB
        </Link>
        <nav className="flex gap-2 items-center">
          <Link href="/game-db" className="hover:text-blue-300 font-medium">
            Home
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="/game-db/games-under-twenty"
            className="hover:text-blue-300 font-medium"
          >
            Under $20
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="/game-db/favorites"
            className="hover:text-blue-300 font-medium"
          >
            Watching
          </Link>
          <span className="text-gray-400">|</span>
          {user ? (
            <>
              <img
                src={getProfileImage()}
                alt="User Profile"
                height={30}
                width={30}
                className="rounded-full"
              />
              <p className="font-medium">{user.displayName}</p>

              <span className="text-gray-400">|</span>
              <button
                className="hover:text-blue-300 font-medium"
                onClick={firebaseSignOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                className="hover:text-blue-300 font-medium"
                onClick={() => setShowAuthModal(true)}
              >
                Sign In
              </button>
            </>
          )}
        </nav>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
