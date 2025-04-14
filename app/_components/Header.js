"use client";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";

export default function Header() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <header className="flex justify-between items-center bg-gray-900 text-white h-20 rounded-md p-4 shadow-sm">
      <Link href={"/game-db"} className="text-2xl font-bold">
        GameDB
      </Link>
      <nav className="flex gap-2 items-center">
        {user ? (
          <>
            <img
              src={user.photoURL}
              alt={user.photoURL}
              height={30}
              width={30}
              className="rounded-full"
            />
            <p>{user.displayName}</p>

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
        <span className="text-gray-400">|</span>
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
      </nav>
    </header>
  );
}
