"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-6">Sign up</h1>
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={() => signIn("google", { callbackUrl: "/profile" })}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>
        <button
          onClick={() => signIn("github", { callbackUrl: "/profile" })}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <FaGithub className="text-xl" />
          Continue with GitHub
        </button>
      </div>
      <p className="mt-4 text-sm text-white">
        Already have an account?{" "}
        <Link href="/signin" className="text-blue-600">
          Sign in
        </Link>
      </p>
    </div>
  );
}
