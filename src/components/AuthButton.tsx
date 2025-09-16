"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

interface AuthButtonProps {
  provider: "google" | "github";
}

const providerConfig = {
  google: {
    label: "Continue with Google",
    icon: "/google.svg",
  },
  github: {
    label: "Continue with GitHub",
    icon: "/github.svg",
  },
};

export default function AuthButton({ provider }: AuthButtonProps) {
  const config = providerConfig[provider];

  return (
    <button
      onClick={() => signIn(provider)}
      className="flex items-center justify-center gap-2 w-full p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      <Image src={config.icon} alt={config.label} width={20} height={20} />
      <span>{config.label}</span>
    </button>
  );
}

