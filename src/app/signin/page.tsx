"use client";

import { getProviders, signIn, ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);

  useEffect(() => {
    getProviders().then((res) => setProviders(res));
  }, []);

  if (!providers) return null;

  const getProviderIcon = (name: string) => {
    if (name === "Google") return <FcGoogle className="text-xl" />;
    if (name === "GitHub") return <FaGithub className="text-xl" />;
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Sign in</h1>
      <div className="flex flex-col gap-3 w-full max-w-sm">
        {Object.values(providers).map((provider: ClientSafeProvider) => (
          <button
            key={provider.name}
            onClick={() =>
              signIn(provider.id as LiteralUnion<string>, { callbackUrl: "/profile" })
            }
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {getProviderIcon(provider.name)}
            Continue with {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
}
