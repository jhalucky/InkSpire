"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, ReactElement } from "react";
import ProfileBlogCard from "@/components/ProfileBlogCard";
import SessionProvider from "@/components/SessionProvider";

// ------------------ SOCIAL ICONS ------------------
const socialSvgs: Record<string, ReactElement> = {
  twitter: (
    <svg viewBox="0 0 1200 1227" fill="currentColor" className="text-white w-5 h-5">
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.32-1.2-2-2-2s-2 .68-2 2v5.5h-3v-10h3v1.5c.8-1.2 3-1.3 3 1.15v7.35h3v-10h-3v1.5c.8-1.2 3-1.3 3 1.15v7.35z" />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5c-6.62 0-12 5.38-12 12 0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.1-.75.09-.74.09-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58 4.77-1.58 8.21-6.08 8.21-11.38 0-6.62-5.38-12-12-12z" />
    </svg>
  ),
  instagram: (
    <svg
      className="w-5 h-5 text-white"
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

// ------------------ CONFIRM MODAL ------------------
const ConfirmModal = ({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-lg">
      <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
      <p className="mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ------------------ PROFILE CARD ------------------
const extractUsername = (url: string | null | undefined) => {
  if (!url) return "Not Set";
  const segments = url.split("/").filter(Boolean);
  return segments[segments.length - 1] ? `@${segments[segments.length - 1]}` : "Not Set";
};

const ProfileCard = ({ session }: { session: any }) => {
  const user = session.user;
  const [imageUrl, setImageUrl] = useState(user.image);

  useEffect(() => {
    if (user?.image) setImageUrl(user.image);
  }, [user?.image]);

  const renderSocialIcon = (url: string | null | undefined, type: string) => {
    const username = extractUsername(url);
    const isSet = username !== "Not Set";
    return (
      <div className="flex items-center gap-2">
        {socialSvgs[type]}
        {isSet ? (
          <a
            href={url!}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline cursor-pointer"
          >
            {username}
          </a>
        ) : (
          <span className="text-gray-400">Not Set</span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 text-white rounded-lg shadow-lg max-w-xl mx-auto my-12 relative">
      <Link href="/profile/setup" className="absolute top-4 right-4">
        <button className="text-gray-500 hover:text-white transition-colors">✏️</button>
      </Link>

      <div className="relative w-28 h-28 mb-4">
        <Image
          src={imageUrl || "https://placehold.co/112x112/FFFFFF/212121?text=N/A"}
          alt="Profile Avatar"
          fill
          className="rounded-full object-cover border-4 border-gray-700"
        />
      </div>

      <h2 className="text-2xl font-bold">{user.name || "User"}</h2>
      <p className="text-gray-500 text-sm mt-1">@{user.username || "Not Set"}</p>

      <div className="mt-6 w-full text-left space-y-2">
        <div>
          <span className="font-semibold text-gray-400">Bio:</span>{" "}
          <span className="text-gray-200">{user.bio || "Not Set"}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400">Profession:</span>{" "}
          <span className="text-gray-200">{user.profession || "Not Set"}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400">Education:</span>{" "}
          <span className="text-gray-200">{user.education || "Not Set"}</span>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {renderSocialIcon(user.twitterUrl, "twitter")}
          {renderSocialIcon(user.linkedinUrl, "linkedin")}
          {renderSocialIcon(user.githubUrl, "github")}
          {renderSocialIcon(user.instagramUrl, "instagram")}
        </div>
      </div>

      <div className="mt-8 flex flex-col w-full gap-2">
        <button
          onClick={() => signOut()}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

// ------------------ PROFILE BLOG CARD ------------------
<SessionProvider session={session}>
  <ProfileBlogCard />
</SessionProvider>


// ------------------ PROFILE PAGE ------------------
export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!session?.user?.id) return;
      try {
        const res = await fetch(`/api/users/${session.user.id}/blogs`);
        if (!res.ok) {
          console.error("Failed to fetch user blogs", res.status);
          setBlogs([]);
          return;
        }
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
        setBlogs([]);
      } finally {
        setLoadingBlogs(false);
      }
    };
    fetchBlogs();
  }, [session?.user?.id]);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/blogs/${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) setBlogs(blogs.filter((b) => b.id !== deleteId));
      else console.error("Failed to delete blog");
    } catch (err) {
      console.error("Failed to delete blog", err);
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center mt-3">User Profile</h1>
      <ProfileCard session={session} />

      {/* User's Blogs */}
      <div className="max-w-3xl mx-auto mt-10 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Blogs</h2>

        {loadingBlogs ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <ProfileBlogCard
              key={blog.id}
              blog={blog}
              currentUserId={session.user.id}
              onDelete={handleDeleteClick}
            />
          ))
        ) : (
          <p className="text-gray-500">You haven’t written any blogs yet.</p>
        )}
      </div>

      {showModal && (
        <ConfirmModal
          message="Are you sure you want to delete this blog?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
}
