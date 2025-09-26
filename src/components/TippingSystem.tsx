"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { generateUpiLink, payViaUpi } from "@/lib/upi";
import { Coffee, EggFried, Pizza, Moon } from "lucide-react";

interface TippingSystemProps {
  authorId: string;
  authorUpiId: string;
  onClose: () => void;
}

const defaultAmounts = [
  { label: "Coffee", amount: 50, icon: <Coffee size={20} /> },
  { label: "Breakfast", amount: 100, icon: <EggFried size={20} /> },
  { label: "Lunch", amount: 200, icon: <Pizza size={20} /> },
  { label: "Dinner", amount: 300, icon: <Moon size={20} /> },
];

export default function TippingSystem({ authorId, authorUpiId, onClose }: TippingSystemProps) {
  const [amount, setAmount] = useState<number | "">("");
  const [note, setNote] = useState<string>("Thanks for your work!");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const upiLink = generateUpiLink(authorUpiId, "Author", Number(amount), note);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handlePay = async () => {
    if (!amount || !upiLink) return showToast("Enter a valid amount");

    setSaving(true);
    try {
      // 1️⃣ Save tip in DB
      const res = await fetch("/api/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toUserId: authorId,
          amount,
          message: note,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.error || "Failed to save tip");
      }

      showToast(`Tip of ₹${amount} recorded!`);

      // 2️⃣ Open UPI app / QR
      payViaUpi(upiLink);
    } catch (err: any) {
      console.error("Tip saving error:", err);
      showToast(err.message || "Could not record the tip. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-sm bg-black shadow-lg rounded-xl p-5 space-y-5 border border-gray-800">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Coffee size={24} /> Support the Author
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <p className="text-center text-gray-500 text-sm">
          Author ID: <span className="font-mono">{authorId}</span>
        </p>

        {/* Default Amount Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {defaultAmounts.map((item) => (
            <button
              key={item.label}
              onClick={() => setAmount(item.amount)}
              className={`flex items-center gap-2 justify-center py-2 rounded-lg border 
                border-gray-700 hover:border-green-500 transition
                ${amount === item.amount ? "bg-green-700 text-white" : "bg-gray-900 text-gray-300"}`}
            >
              {item.icon} {item.label} ₹{item.amount}
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <div className="relative mt-3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
          <input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setAmount(isNaN(val) ? "" : val);
            }}
            className="w-full px-10 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter custom amount"
          />
        </div>

        {/* Note Input */}
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Add a note"
        />

        {/* QR Code */}
        <div className="flex justify-center">
          <div className="bg-white p-3 rounded-lg shadow-md">
            <QRCodeSVG value={upiLink} size={180} />
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          disabled={saving || !amount}
          className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 active:scale-95 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Processing..." : "Pay via UPI"}
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-10 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out flex items-center gap-2">
          ✔ {toast}
        </div>
      )}
    </div>
  );
}
