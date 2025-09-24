// import { NextResponse } from "next/server";
// import { razorpay } from "@/lib/razorpay";

// export async function POST(req: Request) {
//   try {
//     const { amount, currency = "INR", receipt } = await req.json();

//     const options = {
//       amount: amount * 100, // amount in paise
//       currency,
//       receipt: receipt || `rcpt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);

//     return NextResponse.json(order);
//   } catch (error: any) {
//     console.error("Razorpay order error:", error);
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
//   }
// }
