"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Sign up</h1>
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={() => signIn("google", { callbackUrl: "/profile" })}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <FcGoogle className="text-xl" />
          <span className="text-gray-900 dark:text-gray-100">Continue with Google</span>
        </button>

        <button
          onClick={() => signIn("github", { callbackUrl: "/profile" })}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <FaGithub className="text-xl" />
          <span className="text-gray-900 dark:text-gray-100">Continue with GitHub</span>
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
        Already have an account?{" "}
        <Link href="/signin" className="text-blue-600 dark:text-blue-400 font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
