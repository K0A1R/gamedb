"use client";
import { useState, useEffect } from "react";
import GameCard from "../components/game-card";
import useStores from "../../_hooks/useStores";
import { useUserAuth } from "../../_utils/auth-context";

export default function Page() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { stores, loading: storesLoading, error: storesError } = useStores();
  const { user } = useUserAuth();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          "https://www.cheapshark.com/api/1.0/deals?upperPrice=20"
        );
        if (!response.ok) throw new Error("Failed to fetch games");
        const data = await response.json();
        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const getStoreName = (storeID) => {
    const store = stores.find((store) => store.storeID === storeID);
    return store ? store.storeName : "Unknown Store";
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-200">
        <h1 className="text-4xl md:text-6xl mb-5">Welcome to GameDB</h1>
        <h2 className="text-lg md:text-xl">
          Please sign in to view your favorites
        </h2>
      </div>
    );
  }

  if (loading || storesLoading)
    return <p className="animate-pulse">Loading...</p>;
  if (error) return <p>Error loading games: {error}</p>;
  if (storesError) return <p>Error loading stores: {storesError}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Games Under $20</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <GameCard
            key={`${game.gameID + game.storeID}`}
            game={{
              gameID: game.gameID,
              name: game.title,
              gameIMG: game.thumb,
              storeID: game.storeID,
              dealID: game.dealID,
              salePrice: game.salePrice,
              normalPrice: game.normalPrice,
              steamRatingText: game.steamRatingText,
              steamRatingPercent: game.steamRatingPercent,
              steamRatingCount: game.steamRatingCount,
              metacriticScore: game.metacriticScore,
              store: getStoreName(game.storeID),
            }}
          />
        ))}
      </div>
    </div>
  );
}
