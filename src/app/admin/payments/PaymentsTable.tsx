"use client";

import { DollarSign } from "lucide-react";

interface Props {
  payments: any[];
}

export default function PaymentsTable({ payments }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white uppercase text-xs">
            <tr>
              <th className="px-5 py-4 text-left">User</th>
              <th className="px-5 py-4 text-left">Event</th>
              <th className="px-5 py-4 text-left">Amount</th>
              <th className="px-5 py-4 text-left">Status</th>
              <th className="px-5 py-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  No payments found
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="px-5 py-4">
                    {payment.userId?.name}
                  </td>

                  <td className="px-5 py-4 font-medium">
                    {payment.eventId?.title}
                  </td>

                  <td className="px-5 py-4 text-green-600 font-bold flex items-center gap-1">
                    <DollarSign size={15} />
                    ₹ {payment.amount}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        payment.paymentStatus === "success"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-gray-500">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}