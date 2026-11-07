"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ShoppingCartPlus,
  CircleUser,
  UserPen,
  LogOut,
  ChevronDown,
  Loader
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import Image from "next/image";


export default function Navbar() {
  const { data, isPending } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Formatted Bengali Date
  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Handle sign out function
  const handleSignOut = async () => {
    await signOut();
  };

  // Extract first name only (if name has multiple words)
  const getFirstName = (fullName?: string | null) => {
    if (!fullName) return "";
    return fullName.trim().split(" ")[0];
  };

  // Get first letter for fallback avatar (capitalized)
  const getInitial = (fullName?: string | null) => {
    if (!fullName) return "U";
    return fullName.trim().charAt(0).toUpperCase();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fcfdfd] border-b border-slate-100 shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">

        {/* Left Section: Logo Box, Title, and Date */}
        <div className="flex items-center gap-3">
          <Link
            href="/">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#00873e] text-white shadow-xs">
              <ShoppingCartPlus size={22} />
            </div>
          </Link>
          <div className="flex flex-col">
            <Link
              href="/"
            >
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-snug">
                বাজার দর
              </span>
            </Link>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Right Section: Auth & User States */}
        <div className="flex items-center gap-3">
          {isPending ? (
            // Loading State
            <div className="flex items-center justify-center p-2">
              <Loader className="h-6 w-6 animate-spin text-[#00873e]" />
            </div>
          ) : data?.user?.name ? (
            // Authenticated State (Profile & Dropdown)
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2.5 rounded-full p-1.5 sm:px-3 sm:py-1.5 hover:bg-slate-100 transition-colors focus:outline-none"
                aria-expanded={dropdownOpen}
              >
                {data.user.image ? (
                  <Image
                    src={data.user.image}
                    alt={data.user.name}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover border border-slate-200 shadow-2xs"
                  />
                ) : (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200 text-sm">
                    {getInitial(data.user.name)}
                  </div>
                )}

                <span className="hidden sm:inline text-sm font-semibold text-slate-800">
                  {getFirstName(data.user.name)}
                </span>

                <ChevronDown size={14} className="text-slate-500 hidden sm:inline" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white py-1.5 shadow-xl border border-slate-100 animate-in fade-in slide-in-from-top-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 sm:hidden">
                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {data.user.name}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <CircleUser size={17} className="text-slate-500" />
                    Profile
                  </Link>

                  <Link
                    href="/profile/update-profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <UserPen size={17} className="text-slate-500" />
                    Update Profile
                  </Link>

                  <div className="my-1 border-t border-slate-100"></div>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleSignOut();
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-xs sm:text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={17} className="text-red-500" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Unauthenticated State (Sign In & Sign Up Buttons)
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-[#00873e] hover:bg-[#007335] px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-sm transition-colors"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}