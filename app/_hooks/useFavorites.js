"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { addGame, deleteGame, isSaved } from "../_services/games-services";

export default function useFavorites(game) {
  const { user } = useUserAuth();
  const [isGameSaved, setIsGameSaved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Check saved status on mount and when user/game/store changes
  useEffect(() => {
    const checkSavedStatus = async () => {
      if (user) {
        try {
          const saved = await isSaved(user.uid, game.gameID, game.storeID);
          setIsGameSaved(saved);
        } catch (error) {
          console.error("Error checking saved status:", error);
        }
      }
    };
    checkSavedStatus();
  }, [user, game.gameID, game.storeID]);

  // Handle favorite game toggle
  const handleFavoriteToggle = async () => {
    if (!user) {
      setError("Please sign in to save favorites");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      if (isGameSaved) {
        await deleteGame(user.uid, game.gameID, game.storeID);
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
    } catch (error) {
      setError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isGameSaved,
    isProcessing,
    error,
    handleFavoriteToggle,
  };
}
