"use client";

export default function CancellationRefund() {
  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Cancellation & Refund Policy</h1>
      <p className="mb-2">
        Since InkSpire provides digital tipping services, all transactions are <strong>final</strong> and non-refundable.
      </p>
      <p>
        In case of technical issues or accidental double payments, please contact us immediately via our <a href="/contact" className="text-amber-400 underline">Contact Us</a> page.
      </p>
    </div>
  );
}
