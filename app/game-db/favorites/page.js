"use client";
import { useUserAuth } from "../../_utils/auth-context";
import { getGames } from "../../_services/games-services";

import { useEffect, useState } from "react";
import GameCard from "../components/game-card";

export default function Page() {
  const { user } = useUserAuth();
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteGames = async () => {
      if (!user) return;
      try {
        const games = await getGames(user.uid);
        setFavoriteGames(games);
      } catch (error) {
        console.error("Error fetching favorite games:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteGames();
  }, [user]);

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

  if (loading)
    return <p className="animate-pulse">Loading your favorite games...</p>;
  if (error) return <p>Error loading favorite games: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Games you are watching</h1>
      {favoriteGames.length === 0 ? (
        <p className="text-gray-200">No favorite games found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteGames.map((game) => (
            <GameCard key={game.firestoreId} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
