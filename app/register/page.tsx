"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Invalid email format");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        toast.error(data.error || "Registration failed");
        return;
      }

      toast.success("Registered successfully!");
      router.push("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
  <div className="h-screen w-full bg-black flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-gray-800/40 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl p-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Create Account
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
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
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-5 py-3 rounded-xl bg-gray-900/40 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="text-center text-gray-400 mt-8 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-rose-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  </div>
);
}
