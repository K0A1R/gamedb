import Link from "next/link";
export default function Header() {
  return (
    <header className="flex justify-between bg-gray-900 text-white h-16">
      <h1 className="text-2xl font-bold">GameDB</h1>
      <nav className="flex gap-2">
        <Link href="/game-db" className="hover:text-gray-400">
          Home
        </Link>
        <p>|</p>
        <Link
          href="/game-db/games-under-twenty"
          className="hover:text-gray-400"
        >
          Games under $20
        </Link>
        <p>|</p>
        <Link href="/game-db/favorites" className="hover:text-gray-400">
          My Favorites
        </Link>
      </nav>
    </header>
  );
}
