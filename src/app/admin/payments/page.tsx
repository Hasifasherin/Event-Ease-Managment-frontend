"use client";

import { useEffect, useState } from "react";
import { getAllPayments, getRevenueStats } from "@/services/adminService";
import PaymentsTable from "./PaymentsTable";
import RevenueStats from "./RevenueStats";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [revenue, setRevenue] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const paymentData = await getAllPayments();
      const revenueData = await getRevenueStats();

      setPayments(paymentData);
      setRevenue(revenueData);
    } catch (error) {
      console.error("Payments fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading payments...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <RevenueStats data={revenue} />

      <PaymentsTable payments={payments} />

    </div>
  );
}