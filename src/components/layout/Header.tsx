"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FiUser,
  FiChevronDown,
  FiHelpCircle,
  FiCalendar,
  FiGrid,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout, loading } = useAuth();

  const [userOpen, setUserOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);

  const userRef = useRef<HTMLDivElement>(null);
  const discoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
      if (discoverRef.current && !discoverRef.current.contains(e.target as Node)) {
        setDiscoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    setUserOpen(false);
    logout();
  };

  if (loading) {
    return (
      <header className="fixed top-0 w-full z-50 h-16 bg-blue-900 border-b border-blue-800" />
    );
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-blue-900 border-b border-blue-800 shadow-md">
      <div className="h-16 max-w-screen-xl mx-auto px-6 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-8">

          {/* Logo */}
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

          {/* Discover Menu */}
          <div ref={discoverRef} className="relative">
            <button
              onClick={() => setDiscoverOpen(!discoverOpen)}
              className="flex items-center gap-1 font-medium text-white hover:text-blue-200 transition"
            >
              Discover <FiChevronDown />
            </button>

            {discoverOpen && (
              <div className="absolute top-10 left-0 w-52 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <Link href="/events" className="block px-4 py-2 text-black hover:bg-blue-50 hover:text-blue-600">
                  Events
                </Link>
                <Link href="/events?type=conference" className="block px-4 py-2 text-black hover:bg-blue-50 hover:text-blue-600">
                  Conferences
                </Link>
                <Link href="/events?type=concert" className="block px-4 py-2 text-black hover:bg-blue-50 hover:text-blue-600">
                  Concerts
                </Link>
                <Link href="/events?type=workshop" className="block px-4 py-2 text-black hover:bg-blue-50 hover:text-blue-600">
                  Workshops
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* User Menu */}
          <div ref={userRef} className="relative">

            <button
              onClick={() => setUserOpen(!userOpen)}
              className="w-10 h-10 flex items-center justify-center border border-blue-400 rounded-full hover:bg-blue-800 transition text-white font-medium"
            >
              {!user ? (
                <FiUser size={20} />
              ) : (
                <span className="uppercase">
                  {user.name ? user.name.charAt(0) : "U"}
                </span>
              )}
            </button>

            {userOpen && (
              <div className="absolute right-0 top-12 w-56 bg-white border border-gray-200 rounded-lg shadow-lg text-black">

                {!user ? (
                  <Link
                    href="/auth/login"
                    className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Log in / Sign up
                  </Link>
                ) : (
                  <>
                    <div className="px-4 py-2 text-sm text-gray-700 truncate">
                      {user.name || user.email}
                    </div>

                    <div className="border-t" />

                    {user.role === "user" && (
                      <Link
                        href="/profile/bookings"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <FiCalendar /> My Bookings
                      </Link>
                    )}

                    {user.role === "organizer" && (
                      <Link
                        href="/organizer/dashboard"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <FiGrid /> Organizer Dashboard
                      </Link>
                    )}

                    {user.role === "admin" && (
                      <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <FiGrid /> Admin Dashboard
                      </Link>
                    )}

                    <div className="border-t" />

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                    >
                      Log out
                    </button>
                  </>
                )}

                <div className="border-t" />

                <Link
                  href="/help"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 hover:text-blue-600"
                >
                  <FiHelpCircle /> Help
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}