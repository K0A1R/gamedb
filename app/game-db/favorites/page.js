"use client";
import { useUserAuth } from "../../_utils/auth-context";
import { db } from "../../_utils/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import GameCard from "../components/game-card";

export default function Page() {
  const { user } = useUserAuth();
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    // Real time listener
    const gamesRef = collection(db, "users", user.uid, "games");
    const unsubscribe = onSnapshot(
      gamesRef,
      (snapshot) => {
        const games = snapshot.docs.map((doc) => ({
          firestoreId: doc.id,
          ...doc.data(),
        }));
        setFavoriteGames(games);
        setLoading(false);
      },
      (error) => {
        console.error("Error listening to favorites:", error);
        setError("Failed to load favorites. Please refresh.");
        setLoading(false);
      }
    );
    return () => unsubscribe();
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
    <div className="max-w-7xl mx-auto">
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
