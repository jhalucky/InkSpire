"use client";

import { useState } from "react";
import Script from "next/script";

export default function TippingPage() {
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    if (amount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    // 1. Create order from backend
    const orderRes = await fetch("/api/payments/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const order = await orderRes.json();

    if (!order.id) {
      alert("Failed to create Razorpay order");
      return;
    }

    // 2. Open Razorpay Checkout
    const options: any = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // only publishable key
      amount: order.amount,
      currency: order.currency,
      name: "Support Lucky Jha",
      description: "Tipping the author",
      image: "https://your-logo-url.com/logo.png",
      order_id: order.id,
      handler: async function (response: any) {
        // 3. Verify payment
        const verifyRes = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const result = await verifyRes.json();

        if (result.success) {
          alert(`🎉 Thank you for tipping ₹${amount} to Lucky Jha!`);
          setAmount(0);
          setMessage("");
        } else {
          alert("❌ Payment verification failed");
        }
      },
      prefill: {
        name: "Your Name",
        email: "youremail@example.com",
      },
      theme: { color: "#F37254" },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  return (
    <>
      {/* Razorpay Checkout Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="max-w-lg mx-auto p-6 bg-card border rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Support Lucky Jha</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount (₹)"
          className="w-full px-3 py-2 mb-4 border rounded-lg"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a message (optional)"
          className="w-full px-3 py-2 mb-4 border rounded-lg"
        />
        <button
          onClick={handlePayment}
          className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Tip ₹{amount || 0}
        </button>
      </div>
    </>
  );
}
