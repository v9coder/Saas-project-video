"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      toast.error(res.error || "Login failed");
    } else {
      toast.success("Logged in successfully!");
      router.push("/"); // Redirect to dashboard or homepage
    }
  };

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800/40 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 py-3 rounded-xl bg-gray-900/40 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 rounded-xl bg-gray-900/40 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white text-lg transition ${
              loading
                ? "bg-rose-700 cursor-not-allowed"
                : "bg-rose-600 hover:bg-rose-500"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-8 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-rose-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
