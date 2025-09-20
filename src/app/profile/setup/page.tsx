"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function ProfileSetupPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState(session?.user?.username || "");
  const [bio, setBio] = useState(session?.user?.bio || "");
  const [profession, setProfession] = useState(session?.user?.profession || "");
  const [education, setEducation] = useState(session?.user?.education || "");
  const [twitterUrl, setTwitterUrl] = useState(session?.user?.twitterUrl || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(session?.user?.image || null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const cloudinaryUploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!cloudinaryCloudName) throw new Error("Cloudinary cloud name is not set.");

      let imageUrl = session?.user?.image;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", cloudinaryUploadPreset as string);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
          { method: "POST", body: formData }
        );

        if (!uploadRes.ok) {
          const errorData = await uploadRes.json();
          throw new Error(errorData.error.message || "Image upload failed.");
        }

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url;
        setImagePreview(imageUrl);
      }

      const res = await fetch("/api/profile/update-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          bio,
          profession,
          education,
          twitterUrl,
          image: imageUrl,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong.");
      }

      await update(); // refresh session
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 text-white rounded-lg shadow-lg max-w-md mx-auto my-12">
      <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        {/* Profile Image */}
        <div className="relative w-24 h-24 mx-auto mb-4 group">
          <Image
            src={imagePreview || "https://placehold.co/96x96/FFFFFF/212121?text=N/A"}
            alt="Profile Avatar"
            fill
            className="rounded-full object-cover border-4 border-gray-700"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </label>
          <input id="avatar-upload" type="file" accept=".png,.jpeg,.jpg" onChange={handleImageChange} className="hidden" />
        </div>

        {/* Inputs */}
        <div>
          <label htmlFor="username" className="block text-gray-400 mb-1">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Choose a unique username"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block text-gray-400 mb-1">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Tell us about yourself"
          />
        </div>
        <div>
          <label htmlFor="profession" className="block text-gray-400 mb-1">Profession</label>
          <input
            type="text"
            id="profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your profession"
          />
        </div>
        <div>
          <label htmlFor="education" className="block text-gray-400 mb-1">Education</label>
          <input
            type="text"
            id="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your education"
          />
        </div>
        <div>
          <label htmlFor="twitterUrl" className="block text-gray-400 mb-1">Twitter (X) URL</label>
          <div className="relative">
            <svg className="w-4 h-4 text-white absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none">
              <path d="M18.901 1.15391H21.393L14.07 9.38091L22.84 22.8399H15.93L10.978 15.6599L4.99201 22.8399H2.5L10.375 13.4359L1.93901 1.15391H9.08801L13.882 7.50291L18.901 1.15391ZM16.711 20.6589H18.236L7.75301 3.32391H6.12601L16.711 20.6589Z" fill="currentColor"/>
            </svg>
            <input
              type="url"
              id="twitterUrl"
              value={twitterUrl}
              onChange={(e) => setTwitterUrl(e.target.value)}
              className="w-full p-2 pl-10 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://x.com/your_username"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
