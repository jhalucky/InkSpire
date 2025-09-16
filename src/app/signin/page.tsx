"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignInPage() {
  const [providers, setProviders] = useState<any>(null);

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
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <div className="flex flex-col gap-3 w-full max-w-sm">
        {Object.values(providers).map((provider: any) => (
          <button
            key={provider.name}
            onClick={() =>
              signIn(provider.id, { callbackUrl: "/profile" })
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
