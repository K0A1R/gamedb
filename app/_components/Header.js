"use client";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";

export default function Header() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  return (
    <header className="flex justify-between bg-gray-900 text-white h-20 rounded-md p-4 shadow-sm">
      <h1 className="text-2xl font-bold">GameDB</h1>
      <nav className="flex gap-2">
        <Link href="/game-db" className="hover:text-blue-300">
          Home
        </Link>
        <p>|</p>
        <Link
          href="/game-db/games-under-twenty"
          className="hover:text-blue-300"
        >
          Under $20
        </Link>
        <p>|</p>
        <Link href="/game-db/favorites" className="hover:text-blue-300">
          Watching
        </Link>
      </nav>
    </header>
  );
}
