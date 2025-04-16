"use client";
import { useState } from "react";
import GameCard from "./components/game-card";
import StoreFronts from "./components/store-fronts";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(6);

  // Search function to fetch games from CheapShark API
  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1);
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
    storeID: null,
    dealID: game.cheapestDealID,
    salePrice: game.cheapest,
    normalPrice: null,
    steamRatingText: null,
    steamRatingPercent: null,
    steamRatingCount: null,
    metacriticScore: null,
    store: "Store",
  }));

  // Get games for page
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = mappedResults.slice(indexOfFirstGame, indexOfLastGame);

  // Change page function
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(mappedResults.length / gamesPerPage);

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
              className={`bg-blue-600 px-6 py-3 rounded-lg font-medium transition-colors ${
                loading || !searchTerm.trim()
                  ? "opacity-50"
                  : "hover:bg-blue-700"
              }`}
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

        {/* Show <StoreFronts> if no search */}
        {searchResults.length === 0 && <StoreFronts />}

        {/* Loop through search results */}
        {mappedResults.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentGames.map((game) => (
                <GameCard key={game.gameID} game={game} />
              ))}
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                  onClick={() =>
                    handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded bg-gray-700 disabled:opacity-50"
                >
                  Previous
                </button>

                {/* Page numbers */}
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((number) => (
                  <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`px-4 py-2 rounded ${
                      currentPage === number
                        ? "bg-blue-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() =>
                    handlePageChange(
                      currentPage < totalPages ? currentPage + 1 : totalPages
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded bg-gray-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
