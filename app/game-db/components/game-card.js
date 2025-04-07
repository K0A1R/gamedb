"use client";
import { useState, useEffect } from "react";
import { addGame, deleteGame, isSaved } from "../../_services/games-services";
import { useUserAuth } from "../../_utils/auth-context";

export default function GameCard({ game }) {
  const { user } = useUserAuth();
  const [isGameSaved, setIsGameSaved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Check saved status on mount and when user/game changes
  useEffect(() => {
    const checkSavedStatus = async () => {
      if (user) {
        try {
          const saved = await isSaved(user.uid, game.gameID);
          setIsGameSaved(saved);
        } catch (err) {
          console.error("Error checking saved status:", err);
        }
      }
    };
    checkSavedStatus();
  }, [user, game.gameID]);

  const handleFavoriteToggle = async () => {
    if (!user) {
      setError("Please sign in to save favorites");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      if (isGameSaved) {
        await deleteGame(user.uid, game.gameID);
      } else {
        await addGame(user.uid, {
          gameID: game.gameID,
          name: game.name,
          gameIMG: game.gameIMG,
          storeID: game.storeID,
          dealID: game.dealID,
          salePrice: game.salePrice,
          normalPrice: game.normalPrice,
          steamRatingText: game.steamRatingText,
          steamRatingPercent: game.steamRatingPercent,
          steamRatingCount: game.steamRatingCount,
          metacriticScore: game.metacriticScore,
          store: game.store,
        });
      }
      setIsGameSaved(!isGameSaved);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const savingsPercentage = game.normalPrice
    ? Math.round(((game.normalPrice - game.salePrice) / game.normalPrice) * 100)
    : 0;

  return (
    <div className="border border-gray-600 rounded-lg p-4 bg-slate-700 hover:shadow-lg transition-shadow">
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

      <h2 className="font-semibold text-slate-200 text-lg mb-2">{game.name}</h2>

      <div className="space-y-1 mb-3">
        {game.normalPrice && (
          <p className="text-gray-400 line-through">${game.normalPrice}</p>
        )}
        <p className="text-xl font-bold text-green-400">${game.salePrice}</p>
        {savingsPercentage > 0 && (
          <p className="text-sm text-green-300">Save {savingsPercentage}%</p>
        )}
      </div>

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

        {game.steamRatingPercent > 0 && (
          <p>
            Steam: {game.steamRatingPercent}% ({game.steamRatingText})
          </p>
        )}

        <p className="font-medium">
          Store: <span className="text-blue-300">{game.store}</span>
        </p>
      </div>

      {user && (
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
            ? "♥ Remove Favorite"
            : "♡ Add Favorite"}
        </button>
      )}

      {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
    </div>
  );
}
