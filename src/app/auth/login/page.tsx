"use client";

import { useState } from "react";
import { loginUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const data = await loginUser(email, password);

      // ✅ update AuthContext (this also stores in localStorage)
      login(data);

      // role-based redirect
      if (data.role === "admin") {
        router.push("/admin");
      } else if (data.role === "organizer") {
        router.push("/organizer");
      } else {
        router.push("/");
      }

    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl p-8 space-y-6"
      >
        {/* TITLE */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-1">
            Login to your EventEase account
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        {/* EMAIL */}
        <div className="space-y-1">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-600 bg-gray-800 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="space-y-1 relative">
          <label className="text-sm text-gray-300">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full border border-gray-600 bg-gray-800 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* FORGOT PASSWORD */}
        <div className="text-right">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-blue-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* SIGNUP */}
        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-400 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}