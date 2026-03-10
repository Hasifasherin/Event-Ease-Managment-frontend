import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">EventEase</h2>
          <p className="mt-3 text-sm text-gray-400">
            Discover and book amazing events around you.
            EventEase makes event management simple and seamless.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-white">Events</Link>
            </li>
            <li>
              <Link href="/profile/bookings" className="hover:text-white">Bookings</Link>
            </li>
            
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>

          <div className="flex gap-4 text-xl">
            <FiFacebook className="cursor-pointer hover:text-white" />
            <FiTwitter className="cursor-pointer hover:text-white" />
            <FiInstagram className="cursor-pointer hover:text-white" />
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center py-5 text-sm text-gray-500">
        © {new Date().getFullYear()} EventEase. All rights reserved.
      </div>
    </footer>
  );
}