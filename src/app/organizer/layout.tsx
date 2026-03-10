"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LogOut,
  LayoutDashboard,
  Calendar,
  Ticket,
  CreditCard,
  Users,
  Bell
} from "lucide-react";

interface Props {
  children: ReactNode;
}

export default function OrganizerLayout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /* ===== ROLE GUARD ===== */
  useEffect(() => {
    if (!mounted) return;

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.replace("/auth/login");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.role !== "organizer") {
      router.replace("/");
    }
  }, [mounted, router]);

  if (!mounted) return null;

  /* ===== LOGOUT ===== */
  const handleLogout = () => {
    localStorage.clear();
    router.replace("/");
  };

  /* ===== MENU ===== */
  const menuItems = [
    { label: "Dashboard", href: "/organizer/dashboard", icon: LayoutDashboard },
    { label: "Events", href: "/organizer/events", icon: Calendar },
    { label: "Bookings", href: "/organizer/bookings", icon: Users },
    { label: "Payments", href: "/organizer/payments", icon: CreditCard },
    { label: "Attendees", href: "/organizer/attendees", icon: Users },
    { label: "Notifications", href: "/organizer/notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg flex flex-col">

        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-blue-600">
            ORGANIZER PANEL
          </h2>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t flex justify-between">
          <span className="text-sm font-medium">Logout</span>

          <button onClick={handleLogout}>
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>

    </div>
  );
}