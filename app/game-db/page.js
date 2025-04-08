"use client";
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import GameCard from "./components/game-card";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { user } = useUserAuth();

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

  // Map search results to GameCard compatible format
  const mappedResults = searchResults.map((game) => ({
    gameID: game.gameID,
    name: game.external,
    gameIMG: game.thumb,
    storeID: null, // Not available in API search results
    dealID: game.cheapestDealID,
    salePrice: game.cheapest,
    normalPrice: null, // Not available in API search results
    steamRatingText: null, // Not available in API search results
    steamRatingPercent: null, // Not available in API search results
    steamRatingCount: null, // Not available in API search results
    metacriticScore: null, // Not available in API search results
    store: "Various Stores", // Not available in API search results
    cheapestDealID: game.cheapestDealID,
  }));

  if (!user) {
    return (
      <div className="flex flex-col items-center text-gray-200">
        <h1 className="text-6xl mb-5">Welcome to GameDB</h1>
        <h2 className="text-xl">Please Sign In to Continue</h2>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Games Lookup</h1>
        {/* Search form */}
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
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium disabled:opacity-50 transition-colors"
              disabled={loading || !searchTerm.trim()}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">↻</span> Searching...
                </span>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-600 p-4 rounded mb-4">Error: {error}</div>
        )}
        {/* Show message if no results found */}
        {hasSearched && searchResults.length === 0 && !loading && (
          <p className="text-gray-300">
            No games found. Try a different search term.
          </p>
        )}
        {/* Loop through search results */}
        {mappedResults.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mappedResults.map((game) => (
                <GameCard key={game.gameID} game={game} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
