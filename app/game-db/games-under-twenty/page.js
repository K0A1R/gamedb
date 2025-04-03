"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import GameCard from "../components/game-card";
import useStores from "../../_hooks/useStores";
import { useUserAuth } from "../../_utils/auth-context";

export default function Page() {
  const [gamesUnderTwenty, setGamesUnderTwenty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { stores, loading: storesLoading, error: storesError } = useStores();
  const { user } = useUserAuth();

  useEffect(() => {
    const fetchGamesUnderTwenty = async () => {
      try {
        const reponse = await fetch(
          "https://www.cheapshark.com/api/1.0/deals?upperPrice=20"
        );
        if (!reponse.ok) throw new Error("Failed to fetch games under 20$");
        const data = await reponse.json();
        setGamesUnderTwenty(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGamesUnderTwenty();
  }, []);

  // Find store name by storeID
  const getStoreName = (storeID) => {
    const store = stores.find((store) => store.storeID === storeID);
    return store ? store.storeName : "Unknown Store";
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center text-gray-200">
        <h1 className="text-6xl mb-5">Welcome to GameDB</h1>
        <h2 className="text-xl">Please Sign In to Continue</h2>
      </div>
    );
  }

  if (loading || storesLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (storesError) return <p>Error loading stores: {storesError}</p>;

  return (
    <div>
      <p>Check out these amazing games under $20!</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {gamesUnderTwenty.map((game) => (
          <GameCard
            key={`${game.gameID}-${game.dealID}`}
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
              isSaved: false,
            }}
          />
        ))}
      </div>
    </div>
  );
}
