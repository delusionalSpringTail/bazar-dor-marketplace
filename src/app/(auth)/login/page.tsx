"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  // Email Validation Rule
  const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

  // Password Validation Requirements Checklist
  const passwordRules = [
    { label: "At least 8 characters", test: password.length >= 8 },
    { label: "At least one uppercase letter", test: /[A-Z]/.test(password) },
    { label: "At least one number", test: /[0-9]/.test(password) },
  ];

  const isValidPassword = passwordRules.every((rule) => rule.test);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!isValidEmail || !isValidPassword) {
      return;
    }

    // toast
    // sign up code
    // sign in code
    // navbar logic of codition


    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { data: resData, error } = await signIn.email({
      email: data.email as string,
      password: data.password as string,
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message as string);
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await signIn.social({
      provider: "google",
    });
    console.log(data);
  };

  return (
    <div className="font-hind flex min-h-screen flex-col items-center justify-center bg-[#f4f7f5] px-4 py-8 sm:px-6">
      {/* Main Card */}
      <div className="w-full max-w-[460px] rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100">

        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">সাইন ইন</h1>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              ইমেইল
            </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              placeholder="you@example.com"
              className={`w-full rounded-xl border px-3.5 py-3 text-sm sm:text-base transition-colors outline-none bg-white text-slate-900 ${touched.email && !isValidEmail
                ? "border-red-500 focus:border-red-500 ring-1 ring-red-500"
                : "border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                }`}
            />
            {touched.email && !isValidEmail && (
              <p className="text-xs sm:text-sm text-red-500 mt-1">Please enter a valid email address.</p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className={`w-full rounded-xl border pl-3.5 pr-11 py-3 text-sm sm:text-base transition-colors outline-none bg-white text-slate-900 ${touched.password && !isValidPassword
                  ? "border-red-500 focus:border-red-500 ring-1 ring-red-500"
                  : "border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Dynamic Requirement Checklist */}
            <div className="mt-1.5 flex flex-col gap-2 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-0.5">
                Password requirements:
              </p>
              {passwordRules.map((rule, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                  {rule.test ? (
                    <Check size={15} className="text-emerald-500 shrink-0" />
                  ) : (
                    <X size={15} className="text-red-500 shrink-0" />
                  )}
                  <span className={rule.test ? "text-emerald-600 font-medium" : "text-red-500"}>
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-[#00873e] hover:bg-[#007335] py-3 text-sm sm:text-base font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600/30 shadow-sm"
          >
            সাইন ইন
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative bg-white px-3 text-xs sm:text-sm text-slate-400">অথবা</span>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="cursor-pointer flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            disabled
            className="cursor-not-allowed flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <svg className="h-4 w-4 shrink-0 fill-current text-slate-800" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        {/* Footer Signup Link */}
        <div className="mt-6 text-center text-xs sm:text-sm text-slate-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/register"
            className="font-semibold text-emerald-600 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </div>

      </div>

      {/* Return to Home Link */}
      <div className="mt-6 text-xs sm:text-sm text-slate-500 hover:text-slate-700 cursor-pointer">
        <Link href="/">← হোম পেজে ফিরে যান</Link>
      </div>
    </div>
  );
}