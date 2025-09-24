"use client";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-2">
        At InkSpire, we respect your privacy. We collect minimal information required to process tips securely.
      </p>
      <ul className="list-disc list-inside mb-2">
        <li>Payment info is securely handled via Razorpay.</li>
        <li>User emails may be stored for support purposes.</li>
        <li>We do not sell or share personal data with third parties.</li>
      </ul>
      <p>For more details, contact us at <a href="/contact" className="text-amber-400 underline">Contact Us</a>.</p>
    </div>
  );
}
