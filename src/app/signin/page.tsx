"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleSignIn = async (provider: string) => {
    await signIn(provider, { callbackUrl: "/profile" });
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-900 text-white rounded-lg shadow-lg max-w-sm mx-auto my-12">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      {error === "OAuthAccountNotLinked" && (
        <p className="text-red-500 mb-4 text-sm text-center">
          You don&apos;t have an account with this provider. Please{" "}
          <Link href="/signup" className="text-blue-400 underline">
            sign up
          </Link>{" "}
          first.
        </p>
      )}
      <div className="w-full space-y-4">
        <button
          onClick={() => handleSignIn("google")}
          className="w-full flex items-center justify-center gap-2 p-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
        >
          <Image src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" width={20} height={20} />
          Continue with Google
        </button>
        <button
          onClick={() => handleSignIn("github")}
          className="w-full flex items-center justify-center gap-2 p-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors"
        >
          <Image src="https://www.svgrepo.com/show/341847/github.svg" alt="GitHub" width={20} height={20} />
          Continue with GitHub
        </button>
      </div>
   
    </div>
  );
}