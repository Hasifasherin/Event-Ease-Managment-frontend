"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  LogOut,
  LayoutDashboard,
  Calendar,
  Users,
  ImageIcon,
  CreditCard,
  Bell,
  Ticket
} from "lucide-react";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /* ===== ADMIN GUARD ===== */
  useEffect(() => {
    if (!mounted) return;

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.replace("/auth/login");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.role !== "admin") {
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
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Organizers", href: "/admin/organizers", icon: Users },
    { label: "Events", href: "/admin/events", icon: Ticket },
    { label: "Bookings", href: "/admin/bookings", icon: Calendar },
    { label: "Payments", href: "/admin/payments", icon: CreditCard },
    { label: "Notifications", href: "/admin/notifications", icon: Bell },
    { label: "Sliders", href: "/admin/sliders", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg flex flex-col z-50">

        {/* LOGO */}
        <div className="p-6 border-b flex flex-col bg-blue-950 items-center">
          <div className="relative w-28 h-12 mb-2 ">
            <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo.png"
              alt="EventEase Logo"
              width={150}
              height={40}
              priority
              className="object-contain"
            />
          </Link>
          </div>

          <span className="text-xs text-gray-500 font-semibold tracking-wide">
            ADMIN PANEL
          </span>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t flex items-center justify-between">
          <span className="text-sm text-black hover:text-red-500 font-medium">Admin Logout</span>

          <button
            onClick={handleLogout}
            className="text-black hover:text-red-500"
          >
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}