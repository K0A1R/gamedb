"use client";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(
          searchTerm
        )}`
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setSearchResults(data);
      setHasSearched(true);
    } catch (error) {
      setError(error.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Game Search</h1>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for games..."
              className="flex-1 px-4 py-2 rounded text-black"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded disabled:opacity-50"
              disabled={loading || !searchTerm.trim()}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-600 p-4 rounded mb-4">Error: {error}</div>
        )}

        {hasSearched && searchResults.length === 0 && !loading && (
          <p className="text-gray-300">
            No games found. Try a different search term.
          </p>
        )}

        {searchResults.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((game) => (
                <div
                  key={game.gameID}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={game.thumb}
                    alt={game.external}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{game.external}</h3>
                    <p className="text-gray-300 mb-1">
                      Cheapest Price: ${game.cheapest}
                    </p>
                    <p className="text-sm text-gray-400">
                      {game.cheapestDealID
                        ? `Deal available`
                        : `No current deals`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
