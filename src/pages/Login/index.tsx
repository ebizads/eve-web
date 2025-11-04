"use client";

import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please enter your email and password.");
      setIsLoading(false);
      return;
    }

    // Simulated API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Replace this with real API logic later
    if (email === "admin@example.com" && password === "password123") {
      alert("Login successful!");
      setIsLoading(false);
    } else {
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-login.png')" }}
    >
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Gradient overlay on the left side */}
      <div className="absolute left-0 top-0 h-full w-1/2">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
      </div>

      {/* Card positioning */}
      <main
        className="relative z-10 flex h-full 
          items-center 
          lg:justify-start lg:pl-44 
          justify-center px-6"
      >
        <div
          className="relative bg-white/20 backdrop-blur-lg rounded-3xl 
                     p-20 max-w-2xl w-full min-h-[810px]  
                     shadow-2xl border border-white/30 
                     flex flex-col items-center"
        >
          <div className="absolute -inset-2 rounded-3xl bg-white/10 blur-xl -z-10"></div>

          <div className="relative mb-6">
            <Image
              src="/eve-icon.svg"
              alt="Eve Icon"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>

          <h1 className="text-3xl font-medium mt-10 text-black text-center">
            Sign In
          </h1>

          <form
            onSubmit={handleLogin}
            className="mt-10 text-black space-y-6 w-full"
          >
            <div>
              <label className="text-sm font-medium mb-2 block">
                Email or phone number
              </label>
              <input
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-sm border border-slate-950 px-4 py-3 pr-8 rounded-xl"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-sm border border-slate-950 px-4 py-3 pr-8 rounded-xl"
              />
            </div>

            {/* 🔹 Error Message */}
            {error && (
              <div className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded-lg p-2 text-center">
                {error}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 accent-black border-slate-950 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-slate-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a className="text-black hover:underline font-semibold cursor-pointer">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-xl 
                  text-[#FFD900] bg-black hover:bg-[#111111] focus:outline-none 
                  cursor-pointer transition-all duration-300 ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
