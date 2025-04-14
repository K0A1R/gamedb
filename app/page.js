"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn } = useUserAuth();
  const router = useRouter();

  // Auto-redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push("../game-db");
    }
  }, [user]);

  const handleSignInWithGithub = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("GitHub Sign In Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-200 bg-gray-900 p-4">
      <h1 className="text-6xl mb-5 text-center">
        Welcome to GameDB – Your Ultimate Game Deals Tracker! 🎮💰
      </h1>

      <h2 className="text-xl mb-5 text-center">
        Tired of scouring multiple stores for the best deals on games? GameDB
        makes it easy!
      </h2>

      <div className="max-w-2xl space-y-3 mb-8">
        <p className="flex items-start">
          <span className="mr-2">🔍</span>
          <span>
            Discover the Hottest Discounts – Browse the cheapest deals from
            Steam, GOG, and Epic Games in one place.
          </span>
        </p>
        <p className="flex items-start">
          <span className="mr-2">💰</span>
          <span>
            Games Under $20 – Find wallet-friendly gems without breaking the
            bank.
          </span>
        </p>
        <p className="flex items-start">
          <span className="mr-2">❤️</span>
          <span>
            Save Your Favorites – Log in, watch/favorite deals, and track them
            in your personal list.
          </span>
        </p>
        <p className="flex items-start">
          <span className="mr-2">⚡</span>
          <span>
            Fast & Simple – Powered by CheapShark API for real-time price
            comparisons.
          </span>
        </p>
      </div>

      <p className="font-bold text-lg mb-8 text-center">
        👉 Never miss a deal again with GameDB!
      </p>

      {/* Sign In & Continue as guest buttons */}
      {!user && (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <button
            className="w-full py-3 rounded-lg font-semibold bg-black hover:bg-gray-800 transition-colors px-6"
            onClick={handleSignInWithGithub}
          >
            Sign In with GitHub
          </button>
          <button
            className="w-full py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 transition-colors px-6"
            onClick={() => router.push("../game-db")}
          >
            Continue as Guest
          </button>
        </div>
      )}

      {/* Loading state */}
      {user && (
        <div className="text-center">
          <p>Redirecting to your dashboard...</p>
        </div>
      )}
    </div>
  );
}
