"use client";

export default function Contact() {
  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-2">
        Have questions or issues with tipping? Reach out to us:
      </p>
      <ul className="list-disc list-inside">
        <li>Email: <a href="mailto:support@inkspire-yo.vercel.app" className="text-amber-400 underline">support@inkspire-yo.vercel.app</a></li>
        <li>Website: <a href="https://inkspire-yo.vercel.app" className="text-amber-400 underline">https://inkspire-yo.vercel.app</a></li>
      </ul>
    </div>
  );
}
