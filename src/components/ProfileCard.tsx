// src/components/ProfileCard.tsx
import Image from "next/image";

interface ProfileCardProps {
  name: string | null;
  username: string | null;
  image: string | null;
  bio?: string | null;
  twitterUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
}

const ICONS = {
  twitter: (
    <svg viewBox="0 0 1200 1227" fill="currentColor" className="text-blue-400 w-5 h-5">
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5c-6.62 0-12 5.38-12 12 0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.1-.75.09-.74.09-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58 4.77-1.58 8.21-6.08 8.21-11.38 0-6.62-5.38-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.32-1.2-2-2-2s-2 .68-2 2v5.5h-3v-10h3v1.5c.8-1.2 3-1.3 3 1.15v7.35h3v-10h-3v1.5c.8-1.2 3-1.3 3 1.15v7.35z" />
    </svg>
  ),
  instagram: (
    <svg
      className="w-5 h-5 text-pink-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  ),
};

function extractHandle(url?: string | null) {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.pathname.replace("/", "");
  } catch {
    return url;
  }
}

export default function ProfileCard({
  name,
  username,
  image,
  bio,
  twitterUrl,
  githubUrl,
  linkedinUrl,
  instagramUrl,
}: ProfileCardProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:items-start gap-6 p-6 rounded-lg text-white">
      {image ? (
        <Image
          src={image}
          alt={name || "User"}
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-28 h-28 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold">
          {name?.[0] || "U"}
        </div>
      )}

      <div className="flex-1 space-y-2 items-center">
        {/* <div className="md:flex md:flex-col md:items-center gap-2"> */}
        <h2 className="text-2xl font-bold">{name || "Unknown User"}</h2>
        <p className="text-gray-400">@{username || "unknown"}</p>
        {bio && <p className="text-gray-300">{bio}</p>}
        {/* </div> */}


<div className="md:flex grid grid-cols-2 md:items-center md:flex-row gap-3 mt-2">
  {twitterUrl && (
    <a
      href={twitterUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-blue-400 hover:text-white transition-colors"
    >
      {ICONS.twitter}
      <span>{extractHandle(twitterUrl)}</span>
    </a>
  )}
  {githubUrl && (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
    >
      {ICONS.github}
      <span>{extractHandle(githubUrl)}</span>
    </a>
  )}
  {linkedinUrl && (
    <a
      href={linkedinUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-blue-600 hover:text-white transition-colors"
    >
      {ICONS.linkedin}
      <span>{extractHandle(linkedinUrl)}</span>
    </a>
  )}
  {instagramUrl && (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-pink-600 hover:text-white transition-colors"
    >
      {ICONS.instagram}
      <span>{extractHandle(instagramUrl)}</span>
    </a>
  )}
</div>

      </div>
    </div>
  );
}
