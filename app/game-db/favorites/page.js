"use client";
import Link from "next/link";
import { useUserAuth } from "../../_utils/auth-context";
export default function Page() {
  const { user } = useUserAuth();
  if (!user) {
    return (
      <div className="flex flex-col items-center text-gray-200">
        <h1 className="text-6xl mb-5">Welcome to GameDB</h1>
        <h2 className="text-xl">Please Sign In to Continue</h2>
      </div>
    );
  }
  return (
    <div>
      <p>favorites</p>
    </div>
  );
}
