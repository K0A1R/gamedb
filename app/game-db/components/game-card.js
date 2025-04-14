"use client";
import useFavorites from "../../_hooks/useFavorites";
import { useUserAuth } from "../../_utils/auth-context";

export default function GameCard({ game }) {
  const { user } = useUserAuth();
  const { isGameSaved, isProcessing, error, handleFavoriteToggle } =
    useFavorites(game);

  // Calculate savings percentage
  const savingsPercentage = game.normalPrice
    ? Math.round(((game.normalPrice - game.salePrice) / game.normalPrice) * 100)
    : 0;

  return (
    <div className="border border-gray-600 rounded-lg p-4 bg-slate-700 hover:shadow-lg transition-shadow flex flex-col h-full">
      <img
        src={game.gameIMG}
        alt={game.name}
        className="w-full h-48 object-cover mb-3 rounded"
        onError={(e) => {
          e.target.src = "/placeholder-game.jpg";
          e.target.className =
            "w-full h-48 object-cover mb-3 rounded bg-gray-600";
        }}
      />
      {/*Game Details*/}
      <div className="flex-grow">
        {/*Game Title*/}
        <h2 className="font-semibold text-slate-200 text-lg mb-2">
          {game.name}
        </h2>
        {/*Price info*/}
        <div className="space-y-1 mb-3">
          {game.normalPrice && (
            <p className="text-gray-400 line-through">${game.normalPrice}</p>
          )}
          <p className="text-xl font-bold text-green-400">${game.salePrice}</p>
          {savingsPercentage > 0 && (
            <p className="text-sm text-green-300">Save {savingsPercentage}%</p>
          )}
        </div>
        {/*Metacritic Rating*/}
        <div className="space-y-2 text-sm">
          {game.metacriticScore > 0 && (
            <div className="flex items-center">
              <span
                className={`inline-block w-4 h-4 mr-1 rounded-full ${
                  game.metacriticScore >= 75
                    ? "bg-green-500"
                    : game.metacriticScore >= 50
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              ></span>
              Metacritic: {game.metacriticScore}
            </div>
          )}
          {/*Steam Rating*/}
          {game.steamRatingPercent > 0 && (
            <p>
              Steam: {game.steamRatingPercent}% ({game.steamRatingText})
            </p>
          )}
          {/*Store Name*/}
          <p>
            Store:{" "}
            <a
              href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`}
              className="text-blue-300 hover:text-blue-500 font-semibold inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go To <span>{game.store}</span>
            </a>
          </p>
        </div>
      </div>
      {/*Favorite Button*/}
      {user ? (
        <button
          onClick={handleFavoriteToggle}
          disabled={isProcessing}
          className={`mt-3 w-full py-2 rounded font-medium transition-colors ${
            isGameSaved
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isProcessing
            ? "Processing..."
            : isGameSaved
            ? "♥ Stop Watching"
            : "♡ Start Watching"}
        </button>
      ) : (
        <button className="mt-3 w-full py-2 rounded font-medium transition-colors bg-blue-600 hover:bg-blue-700">
          Sign In To Watch Games
        </button>
      )}

      {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
    </div>
  );
}
