"use client";

import { useEffect, useState } from "react";
import { getOrganizerPayments } from "@/services/paymentService";

export default function OrganizerPaymentsPage() {

  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await getOrganizerPayments();
      setPayments(data);
    } catch (error) {
      console.error("Payment fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading payments...</div>;

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Organizer Payments
      </h1>

      {payments.length === 0 ? (
        <p>No payments found</p>
      ) : (

        <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">

            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Event</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Method</th>
                <th className="p-3 text-left">Transaction</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="border-b">
                  <td className="p-3">
                    {payment.bookingId?.userId?.name}
                  </td>

                  <td className="p-3">
                    {payment.bookingId?.eventId?.title}
                  </td>

                  <td className="p-3">
                    ₹ {payment.amount}
                  </td>

                  <td className="p-3">
                    {payment.paymentMethod}
                  </td>

                  <td className="p-3">
                    {payment.transactionId}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}