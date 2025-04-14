"use client";
import { useRouter } from "next/navigation";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const handleSignInWithGithub = async () => {
    try {
      await gitHubSignIn();
      router.push("../game-db");
    } catch (error) {
      console.log("GitHub Sign In Error: ", error);
    }
  };
  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log("Sign Out Error: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-200">
      <h1 className="text-6xl mb-5">
        Welcome to GameDB – Your Ultimate Game Deals Tracker! 🎮💰
      </h1>
      <h2 className="text-xl mb-5">
        Tired of scouring multiple stores for the best deals on games? GameDB
        makes it easy!
      </h2>
      <p>
        🔍 Discover the Hottest Discounts – Browse the cheapest deals from
        Steam, GOG, and Epic Games in one place.
      </p>
      <p>
        💰 Games Under $20 – Find wallet-friendly gems without breaking the
        bank.
      </p>
      <p>
        ❤️ Save Your Favorites – Log in, watch/favorite deals, and track them in
        your personal list—saved directly to your account.
      </p>
      <p>
        ⚡ Fast & Simple – Powered by CheapShark API, GameDB delivers real-time
        price comparisons so you never overpay.
      </p>
      <p className="font-bold">
        👉 Log in to start tracking games or continue without logging in and
        start exploring now. Never miss a deal again with GameDB!
      </p>
      <div className="flex flex-col items-center mt-5">
        {user ? (
          <>
            <p className="flex flex-row text-xl">
              <img
                src={user.photoURL}
                alt={user.photoURL}
                height={30}
                width={30}
                className="rounded-full mr-2"
              />
              {user.displayName} ({user.email})
            </p>
            <button
              className="mt-3 w-full py-2 rounded font-medium transition-colors bg-blue-600 hover:bg-blue-700 max-w-44"
              onClick={handleSignOut}
            >
              Sign Out of GitHub
            </button>
            <button
              className="mt-3 w-full py-2 rounded font-medium transition-colors bg-blue-600 hover:bg-blue-700 max-w-44"
              onClick={() => {
                window.location.href = "../game-db";
              }}
            >
              Continue to GameDB
            </button>
          </>
        ) : (
          <>
            <button
              className="mt-3 w-full py-2 rounded font-medium transition-colors bg-blue-600 hover:bg-blue-700 max-w-44 px-4"
              onClick={handleSignInWithGithub}
            >
              Sign In with GitHub
            </button>
            <button
              className="mt-3 w-full py-2 rounded font-medium transition-colors bg-blue-600 hover:bg-blue-700 max-w-44"
              onClick={() => {
                window.location.href = "../game-db";
              }}
            >
              Continue to GameDB
            </button>
          </>
        )}
      </div>
    </div>
  );
}
