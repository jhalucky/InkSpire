"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSetupPage({ userId }: { userId: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profession, setProfession] = useState("");
  const [education, setEducation] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", name);
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("profession", profession);
    formData.append("education", education);
    if (avatar) formData.append("avatar", avatar);

    const res = await fetch("/api/profile/setup", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/profile");
    } else {
      alert("Error creating profile");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 gap-4">
      <h1 className="text-2xl font-bold">Complete Your Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 border rounded"
          required
        />
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Profession"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Education Qualification"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
