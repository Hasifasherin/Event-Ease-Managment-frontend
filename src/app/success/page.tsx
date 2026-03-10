"use client";

import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
      <div className="bg-white shadow-xl rounded-3xl max-w-lg w-full p-10 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-green-100 mb-6">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your booking has been confirmed. Thank you for choosing EventEase! 🎉
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Explore More Events
          </button>

          <button
            onClick={() => router.push("/profile/bookings")}
            className="bg-white border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-lg transition"
          >
            Go to My Bookings
          </button>
        </div>
      </div>
    </div>
  );
}