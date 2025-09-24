"use client"

import { useState } from "react";
import Script from "next/script";
import { FaRupeeSign, FaCreditCard, FaPaypal, FaStripe } from "react-icons/fa";

interface TippingPageProps {
  authorId?: string;
  authorName?: string;
  authorImage?: string;
  onTip?: (amount: number, message: string) => void;
}

export default function TippingPage({
  authorId,
  authorName = "Lucky Jha",
  authorImage = "https://your-logo-url.com/logo.png",
  onTip,
}: TippingPageProps) {
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState("");

//   const handlePayment = async () => {
//     if (amount <= 0) {
//       alert("Enter a valid amount");
//       return;
//     }

    try {
      const orderRes = await fetch("/api/payments/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, authorId }),
      });

      const order = await orderRes.json();
      if (!order.id) {
        alert("Failed to create Razorpay order");
        return;
      }

      const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!key) {
        alert("Razorpay key not found!");
        return;
      }

      const options: any = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: `Support ${authorName}`,
        description: "Tipping the author",
        image: authorImage,
        order_id: order.id,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const result = await verifyRes.json();
          if (result.success) {
            alert(`🎉 Thank you for tipping ₹${amount} to ${authorName}!`);
            setAmount(0);
            setMessage("");
            onTip?.(amount, message);
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
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong with payment");
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="max-w-md mx-auto p-8 bg-card border rounded-xl mt-15 shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-foreground text-center">
          Support {authorName}
        </h2>
        <p className="text-sm text-muted-foreground text-center">
          Tip the author to show your support. Choose a payment method below.
        </p>

        {/* Payment Method Icons */}
        <div className="flex justify-center gap-4 text-xl text-primary">
          <FaRupeeSign title="UPI" className="hover:scale-110 transition-transform" />
          <FaCreditCard title="Debit/Credit" className="hover:scale-110 transition-transform" />
          <FaPaypal title="PayPal" className="hover:scale-110 transition-transform" />
          <FaStripe title="Stripe" className="hover:scale-110 transition-transform" />
        </div>

        {/* Amount Input */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount (₹)"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
        />

        {/* Message Input */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a message (optional)"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
        />

        {/* Tip Button */}
        <button
          onClick={handlePayment}
          className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
        >
          Tip ₹{amount || 0}
        </button>
      </div>
    </>
  );


