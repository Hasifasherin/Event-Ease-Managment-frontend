"use client";

import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "./providers";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayoutRoutes = [
    "/auth/login",
    "/auth/signup",
  ];

  const isAdminRoute = pathname.startsWith("/admin");
  const isOrganizerRoute = pathname.startsWith("/organizer");

  const shouldShowLayout =
    !hideLayoutRoutes.includes(pathname) &&
    !isAdminRoute &&
    !isOrganizerRoute;

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">

        <Providers>

          {/* ✅ Public Header */}
          {shouldShowLayout && <Header />}

          {/* MAIN CONTENT */}
          <main
            className={`flex-grow ${
              shouldShowLayout ? "pt-[80px]" : ""
            }`}
          >
            {children}
          </main>

          {/* ✅ Public Footer */}
          {shouldShowLayout && <Footer />}

        </Providers>

      </body>
    </html>
  );
}