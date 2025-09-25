"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProfileSetupPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profession, setProfession] = useState("");
  const [education, setEducation] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [upiId, setUpiId] = useState(""); // new UPI field
  const [showUpiInput, setShowUpiInput] = useState(false); // toggle input
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill form from session.user
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setUsername(session.user.username || "");
      setBio(session.user.bio || "");
      setProfession(session.user.profession || "");
      setEducation(session.user.education || "");
      setTwitterUrl(session.user.twitterUrl || "");
      setLinkedinUrl(session.user.linkedinUrl || "");
      setGithubUrl(session.user.githubUrl || "");
      setInstagramUrl(session.user.instagramUrl || "");
      setUpiId(session.user.upiId || ""); // prefill if exists
      setImagePreview(session.user.image || null);
    }
  }, [session?.user]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name.trim() || !username.trim()) {
      setError("Name and username are required");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = session?.user?.image;

      // Upload image to Cloudinary if new image selected
      const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const cloudinaryUploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (imageFile) {
        if (!cloudinaryCloudName || !cloudinaryUploadPreset) {
          throw new Error("Cloudinary cloud name or upload preset is not set");
        }

        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", cloudinaryUploadPreset);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
          { method: "POST", body: formData }
        );

        if (!uploadRes.ok) {
          const errData = await uploadRes.json();
          throw new Error(errData.error?.message || "Image upload failed");
        }

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url;
      }

      // Send updated data to backend
      const res = await fetch("/api/profile/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          bio,
          profession,
          education,
          twitterUrl,
          linkedinUrl,
          githubUrl,
          instagramUrl,
          image: imageUrl,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update profile");
      }

      // Update session so new values show immediately
      await update();
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpiSave = async () => {
    if (!upiId.trim()) {
      setError("UPI ID cannot be empty");
      return;
    }

    try {
      const res = await fetch("/api/profile/upi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ upiId }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save UPI");
      }

      await update(); // update session
      setShowUpiInput(false);
      setError("");
      alert("UPI details saved successfully!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCancel = () => router.push("/profile");

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 text-white rounded-lg shadow-lg max-w-md mx-auto my-12">
      <h1 className="text-3xl font-bold mb-6">Complete Your Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        {/* --- ALL YOUR ORIGINAL FIELDS START --- */}
        {/* Profile Image */}
        <div className="relative w-24 h-24 mx-auto mb-4 group">
          <Image
            src={
              imagePreview ||
              session?.user?.image ||
              "https://placehold.co/96x96/FFFFFF/212121?text=N/A"
            }
            alt="Profile Avatar"
            fill
            className="rounded-full object-cover border-4 border-gray-700"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept=".png,.jpeg,.jpg"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-gray-400 mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your full name"
            required
          />
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-gray-400 mb-1">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Choose a unique username"
            required
          />
        </div>

        {/* Bio */}
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

        {/* Profession */}
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

        {/* Education */}
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

        {/* Social Links */}
        <div>
          <label htmlFor="twitterUrl" className="block text-gray-400 mb-1">Twitter (X) URL</label>
          <input
            type="url"
            id="twitterUrl"
            value={twitterUrl}
            onChange={(e) => setTwitterUrl(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://x.com/your_username"
          />
        </div>

        <div>
          <label htmlFor="linkedinUrl" className="block text-gray-400 mb-1">LinkedIn URL</label>
          <input
            type="url"
            id="linkedinUrl"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://linkedin.com/in/your_username"
          />
        </div>

        <div>
          <label htmlFor="githubUrl" className="block text-gray-400 mb-1">GitHub URL</label>
          <input
            type="url"
            id="githubUrl"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://github.com/your_username"
          />
        </div>

        <div>
          <label htmlFor="instagramUrl" className="block text-gray-400 mb-1">Instagram URL</label>
          <input
            type="url"
            id="instagramUrl"
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://instagram.com/your_username"
          />
        </div>

        {/* --- ALL YOUR ORIGINAL FIELDS END --- */}

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

        {/* Add UPI section */}
        <div className="mt-6">
          {!showUpiInput ? (
            <button
              type="button"
              className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
              onClick={() => setShowUpiInput(true)}
            >
              Add UPI Details to receive tips from blogs
            </button>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter your UPI ID (example: xyz@upi)"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={handleUpiSave}
                className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
              >
                Save UPI
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
