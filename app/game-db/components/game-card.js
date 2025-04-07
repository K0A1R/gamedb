"use client";
import { useState } from "react";
import { addGame, deleteGame } from "../../_services/games-services";
import { useUserAuth } from "../../_utils/auth-context";

export default function GameCard({ game }) {
  const { user } = useUserAuth();
  const [isGameSaved, setIsGameSaved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleFavoriteToggle = async () => {
    if (!user) {
      setError("Please sign in to favorite games.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
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
        savedAt: new Date(),
      });
      setIsGameSaved(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="border border-gray-600 rounded-lg p-4 bg-slate-700">
      <img src={game.gameIMG} alt={game.name} height={100} width={100} />
      <h2 className="font-semibold text-slate-200">{game.name}</h2>
      <p>Price: ${game.normalPrice}</p>
      <p>
        Sale Price:{" "}
        <span className="text-red-500 font-semibold">${game.salePrice}</span>
      </p>

      {/* Steam Rating */}
      {game.steamRatingPercent > 0 && (
        <p>
          Steam Rating: {game.steamRatingPercent}% ({game.steamRatingText})
        </p>
      )}

      {/* Steam Rating Count */}
      {game.steamRatingCount > 0 && (
        <p>Steam Rating Count: {game.steamRatingCount}</p>
      )}

      {/* Metacritic Score */}
      {game.metacriticScore > 0 && (
        <p>Metacritic Score: {game.metacriticScore}</p>
      )}

      {/* Store Name */}
      <p>
        Store: <span className="text-red-500 font-semibold">{game.store}</span>
      </p>

      {/* Favorite Button */}
      {user && (
        <button onClick={handleFavoriteToggle} disabled={isProcessing}>
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
