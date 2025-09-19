"use client";

import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "OAuthAccountNotLinked":
        return "You don't have an account with this provider. Please sign up first.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Authentication Error</h1>
      <p className="text-lg text-gray-700 text-center">
        {getErrorMessage(error)}
      </p>
    </div>
  );
}
