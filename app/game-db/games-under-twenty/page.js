"use client";
import { useState, useEffect } from "react";

import GameCard from "../components/game-card";

export default function Page() {
  const [gamesUnderTwenty, setGamesUnderTwenty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading games under $20...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <p>Check out these amazing games under $20!</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {gamesUnderTwenty.map((game) => (
          <GameCard
            key={game.gameID + game.dealID}
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
              isSaved: false,
            }}
          />
        ))}
      </div>
    </div>
  );
}
