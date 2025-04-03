"use client";
import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignInWithGithub = async () => {
    try {
      await gitHubSignIn();
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
    <div className="flex flex-col items-center text-gray-200">
      <h1 className="text-6xl mb-5">Welcome to GameDB</h1>
      {user ? (
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-xl">
            Welcome, {user.displayName} ({user.email})
          </h2>
          <div className="flex gap-2">
            <button
              className="hover:underline hover:text-blue-500 font-semibold"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            <p>|</p>
            <Link
              href="../game-db"
              className="hover:underline hover:text-blue-500 font-semibold"
            >
              Go To App
            </Link>
          </div>
        </div>
      ) : (
        <button
          className="hover:underline hover:text-blue-500 font-semibold"
          onClick={handleSignInWithGithub}
        >
          Sign In with GitHub
        </button>
      )}
    </div>
  );
}
