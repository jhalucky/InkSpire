"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SignUpPage() {
  const handleSignUp = async (provider: string) => {
    // This redirect will take them to the profile setup page
    await signIn(provider, { callbackUrl: "/profile/setup" });
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-900 text-white rounded-lg shadow-lg max-w-sm mx-auto my-12">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <div className="w-full space-y-4">
        <button
          onClick={() => handleSignUp("google")}
          className="w-full flex items-center justify-center gap-2 p-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
        >
          <Image src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" width={20} height={20} />
          Continue with Google
        </button>
        <button
          onClick={() => handleSignUp("github")}
          className="w-full flex items-center justify-center gap-2 p-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors"
        >
          <Image src="https://www.svgrepo.com/show/341847/github.svg" alt="GitHub" width={20} height={20} />
          Continue with GitHub
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-400">
        Already have an account?{" "}
        <Link href="/signin" className="text-blue-400 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
