"use client";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";

export default function Header() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <header className="flex justify-between items-center bg-gray-900 text-white h-20 rounded-md p-4 shadow-sm">
      <h1 className="text-2xl font-bold">GameDB</h1>
      <nav className="flex gap-2 items-center">
        {user ? (
          <>
            <Link href="/game-db" className="hover:text-blue-300">
              Home
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              href="/game-db/games-under-twenty"
              className="hover:text-blue-300"
            >
              Under $20
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/game-db/favorites" className="hover:text-blue-300">
              Watching
            </Link>
            <span className="text-gray-400">|</span>
            <button className="hover:text-blue-300" onClick={firebaseSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="hover:text-blue-300" onClick={gitHubSignIn}>
            Sign In with GitHub
          </button>
        )}
      </nav>
    </header>
  );
}
