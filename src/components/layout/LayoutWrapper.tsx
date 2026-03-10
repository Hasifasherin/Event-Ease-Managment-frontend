"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/organiser");

  return (
    <>
      {!hideLayout && <Header />}

      {children}

      {!hideLayout && <Footer />}
    </>
  );
}