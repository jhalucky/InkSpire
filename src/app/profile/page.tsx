"use client";

import { useSession } from "next-auth/react";
import { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import { Pencil, Save, XCircle } from "lucide-react";

// Utility function to extract Twitter username from URL
function getTwitterUsernameFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const urlObject = new URL(url);
    const pathSegments = urlObject.pathname.split("/");
    const username = pathSegments.filter((segment) => segment !== "")[0];
    return username || null;
  } catch (error) {
    return null;
  }
}

// Function to generate a GitHub-like avatar background color
const generateAvatarBgColor = (name: string | null | undefined) => {
  const seed = name?.length ? name.charCodeAt(0) + name.charCodeAt(name.length - 1) : 0;
  const colors = [
    "bg-red-200", "bg-blue-200", "bg-green-200", "bg-yellow-200",
    "bg-purple-200", "bg-pink-200", "bg-indigo-200", "bg-teal-200",
  ];
  return colors[seed % colors.length];
};

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const user = session?.user;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use a single state object to hold editable changes
  const [editedProfile, setEditedProfile] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
    profession: user?.profession || "",
    education: user?.education || "",
    twitterUrl: user?.twitterUrl || "",
  });

  // Use useEffect to update the state when the user object changes
  useEffect(() => {
    if (user) {
      setEditedProfile({
        username: user.username || "",
        bio: user.bio || "",
        profession: user.profession || "",
        education: user.education || "",
        twitterUrl: user.twitterUrl || "",
      });
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  // Derived state for Twitter username display and avatar background
  const twitterHandle = useMemo(() => getTwitterUsernameFromUrl(user?.twitterUrl), [user?.twitterUrl]);
  const defaultAvatarBg = useMemo(() => generateAvatarBgColor(user?.name), [user?.name]);

  // handle avatar upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Only JPG, PNG, and WebP allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB.");
      return;
    }

    setLoading(true);

    try {
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      canvas.width = 120;
      canvas.height = 120;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(bitmap, 0, 0, 120, 120);
      }
      const blob: Blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b as Blob), "image/webp")
      );
      const formData = new FormData();
      formData.append("file", blob, "avatar.webp");

      const res = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        // Crucial: The `update` function refreshes the session
        // The `useEffect` hook will then update the `editedProfile` state
        await update({ ...session?.user, image: data.user.avatar });
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setUsernameError(null);

    const usernameRegex = /^[a-z0-9_]{3,20}$/;
    if (editedProfile.username && !usernameRegex.test(editedProfile.username)) {
      setUsernameError("Username must be 3-20 characters, lowercase, and can include underscores.");
      setIsSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProfile),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);
        // Crucial: Update the session with the new user object
        await update(data.user);
      } else {
        if (data.error && data.error.includes("username already exists")) {
          setUsernameError(data.error);
        } else {
          alert(data.error || "Failed to update profile.");
        }
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return <p className="text-center text-gray-500">Please sign in.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4">
      {/* Profile Card */}
      <div className="bg-gray-800 text-gray-200 rounded-lg shadow-xl p-8 w-full max-w-sm relative">
        {/* Pencil Icon for Profile Edit - moved to top right */}
        {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-4 right-4 bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-600 transition"
            >
              <Pencil className="w-5 h-5 text-gray-300" />
            </button>
        )}

        {/* Avatar Container */}
        <div className="relative w-[120px] h-[120px] mx-auto mb-6">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center rounded-full border-2 border-gray-600">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
            </div>
          ) : (
            user.image ? (
              <Image
                src={user.image}
                alt="Avatar"
                width={120}
                height={120}
                className="rounded-full border-2 border-gray-600 object-cover transition-transform hover:scale-105"
              />
            ) : (
              <div className={`w-full h-full rounded-full border-2 border-gray-600 flex items-center justify-center text-5xl font-bold text-gray-800 ${defaultAvatarBg}`}>
                {(user.name ? user.name[0] : "U").toUpperCase()}
              </div>
            )
          )}

          {/* Pencil Icon for Avatar Edit */}
          <button
            onClick={handleEditAvatarClick}
            className="absolute bottom-1 right-1 bg-gray-700 rounded-full p-1 shadow-md hover:bg-gray-600 transition"
          >
            <Pencil className="w-4 h-4 text-gray-300" />
          </button>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* User Info & Editable Fields */}
        <div className="flex flex-col items-center text-center">
          {/* Name */}
          <h1 className="text-3xl font-bold text-indigo-400">
            {user.name || "User"}
          </h1>

          {/* Username */}
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedProfile.username}
                onChange={(e) => {
                  setEditedProfile({...editedProfile, username: e.target.value});
                  setUsernameError(null);
                }}
                className={`mt-1 p-2 border ${usernameError ? 'border-red-500' : 'border-gray-600'} rounded-md text-center bg-gray-700 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition text-md w-4/5`}
                placeholder="Unique username"
              />
              {usernameError && <p className="text-red-400 text-sm mt-1">{usernameError}</p>}
            </>
          ) : (
            <p className="text-lg text-gray-400 mt-[-4px]">
              @{user.username || <span className="italic text-gray-500">No username</span>}
            </p>
          )}
          
          {/* Bio Section */}
          <div className="mt-4 w-full">
            {isEditing ? (
              <textarea
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                className="w-full h-24 p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm text-center resize-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-300 text-sm text-center whitespace-pre-wrap px-2">
                {user.bio || <span className="italic text-gray-500">No bio yet.</span>}
              </p>
            )}
          </div>

          {/* Profession */}
          <div className="mt-2 w-full">
            <span className="font-semibold text-gray-400">Profession: </span>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.profession}
                onChange={(e) => setEditedProfile({...editedProfile, profession: e.target.value})}
                className="inline-block w-auto p-1 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                placeholder="Your profession"
              />
            ) : (
              <span className="text-gray-300 text-sm">
                {user.profession || <span className="italic text-gray-500">Not set</span>}
              </span>
            )}
          </div>

          {/* Education */}
          <div className="mt-1 w-full">
            <span className="font-semibold text-gray-400">Education: </span>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.education}
                onChange={(e) => setEditedProfile({...editedProfile, education: e.target.value})}
                className="inline-block w-auto p-1 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                placeholder="Your education"
              />
            ) : (
              <span className="text-gray-300 text-sm">
                {user.education || <span className="italic text-gray-500">Not set</span>}
              </span>
            )}
          </div>

          {/* Twitter Profile */}
          <div className="mt-4 w-full">
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.twitterUrl}
                onChange={(e) => setEditedProfile({...editedProfile, twitterUrl: e.target.value})}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm text-center"
                placeholder="Enter your X.com URL (e.g., https://x.com/yourhandle)"
              />
            ) : (
              twitterHandle ? (
                <a
                  href={user.twitterUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center justify-center gap-1 text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="inline-block">
                    <path d="M18.901 1.153h3.685l-8.027 9.183L24 22.845h-7.625l-6.505-8.59L3.901 22.845H.216l8.472-9.664L0 1.153h8.043l5.524 7.57L18.901 1.153zm-1.041 19.336H19.9l-5.6-6.417-6.918-8.529h1.838l4.739 5.82 6.738 8.926z"/>
                  </svg>
                  @{twitterHandle}
                </a>
              ) : (
                <p className="text-gray-500 italic text-sm">No X.com profile.</p>
              )
            )}
          </div>
          
          {/* Edit/Save Buttons */}
          {isEditing && (
            <div className="mt-6 flex gap-4 justify-center">
              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 transition disabled:opacity-50"
              >
                {isSaving ? "Saving..." : <><Save className="w-5 h-5" /> Save Changes</>}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  // Reset temporary changes to the current session values
                  if (user) {
                    setEditedProfile({
                      username: user.username || "",
                      bio: user.bio || "",
                      profession: user.profession || "",
                      education: user.education || "",
                      twitterUrl: user.twitterUrl || "",
                    });
                  }
                  setUsernameError(null);
                }}
                className="flex items-center gap-2 px-6 py-2 bg-gray-700 text-gray-300 rounded-full shadow-md hover:bg-gray-600 transition"
              >
                <XCircle className="w-5 h-5" /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}