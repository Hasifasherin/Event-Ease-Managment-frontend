"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getBookingById } from "@/services/bookingService";
import { makePayment } from "@/services/paymentService";

export default function PaymentPage() {
  const { bookingId } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("card"); // card, upi, paypal, cash
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingById(bookingId as string);
        if (!data.attendees) data.attendees = [];
        setBooking(data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch booking details.");
        router.back();
      }
    };
    if (bookingId) fetchBooking();
  }, [bookingId, router]);

  const handlePay = async () => {
    if (!booking) return;
    setError(null);

    try {
      setLoading(true);

      // Always send 'amount' to backend
      await makePayment({
        bookingId: booking._id,
        paymentMethod,
      });

      router.push("/success"); // redirect to success page
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading booking details...</p>
      </div>
    );
  }

  const { quantity = 0, subtotal = 0, discount = 0, total = subtotal - discount, attendees = [] } = booking;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 space-y-6">

        <h1 className="text-3xl font-bold text-purple-700 text-center">Complete Your Payment</h1>

        <p className="text-center text-gray-600">
          Booking ID: <span className="font-semibold">{bookingId}</span>
        </p>

        {/* Payment Summary */}
        <div className="border rounded-lg p-4 bg-purple-50 space-y-4">
          <h2 className="text-lg font-semibold mb-2 text-purple-800">Payment Summary</h2>
          <div className="flex justify-between text-gray-700"><span>Total Tickets:</span><span>{quantity}</span></div>
          <div className="flex justify-between text-gray-700"><span>Subtotal:</span><span>₹{subtotal}</span></div>
          <div className="flex justify-between text-gray-700"><span>Discount:</span><span>₹{discount}</span></div>
          <div className="border-t pt-3 flex justify-between font-bold text-lg text-purple-900">
            <span>Total:</span><span>₹{total}</span>
          </div>
        </div>

        {/* Attendee Details */}
        <div className="border rounded-lg p-4 bg-purple-50 space-y-2">
          <h2 className="text-lg font-semibold mb-2 text-purple-800">Attendees</h2>
          {attendees.length === 0 && <p className="text-gray-500">No attendees information available.</p>}
          {attendees.map((a: any, idx: number) => (
            <div key={idx} className="border p-2 rounded mb-1 bg-white">
              <p><span className="font-semibold">Name:</span> {a.name}</p>
              <p><span className="font-semibold">Email:</span> {a.email}</p>
              <p><span className="font-semibold">Phone:</span> {a.phone}</p>
            </div>
          ))}
        </div>

        {/* Payment Method Selector */}
        <div className="mt-4">
          <label className="block mb-1 font-medium text-purple-700">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="card">Card</option>
            <option value="upi">UPI</option>
            <option value="paypal">PayPal</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Pay & Cancel Buttons */}
        <button
          onClick={handlePay}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white text-lg font-semibold transition
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <button
          onClick={() => router.back()}
          className="w-full py-3 rounded-xl border border-purple-600 text-purple-600 font-semibold hover:bg-purple-50 transition"
        >
          Cancel
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Secure payment powered by EventEase.
        </p>

      </div>
    </div>
  );
}