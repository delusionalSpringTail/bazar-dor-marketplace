"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UserPen, Mail, ArrowLeft } from "lucide-react";
import { useSession } from "@/lib/auth-client";



export default function ProfilePage() {
  const { data, isPending } = useSession();

  // Get first letter for fallback avatar if image is missing (capitalized)
  const getInitial = (fullName?: string | null) => {
    if (!fullName) return "U";
    return fullName.trim().charAt(0).toUpperCase();
  };

  // Skeleton Loader State
  if (isPending) {
    return (
      <div className="flex min-h-screen flex-col items-center bg-[#f4f7f5] px-4 py-8 sm:px-6">
        <div className="w-full max-w-[560px] mb-6 animate-pulse">
          <div className="h-4 w-36 bg-slate-200 rounded-md"></div>
        </div>

        <div className="w-full max-w-[560px] rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100 animate-pulse">
          {/* Header Skeleton */}
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="h-8 w-44 bg-slate-200 rounded-lg mb-2"></div>
            <div className="h-4 w-64 bg-slate-200 rounded-md"></div>
          </div>

          {/* User Info Header Skeleton */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-slate-200 shrink-0"></div>
            <div className="flex flex-col gap-2 w-full">
              <div className="h-6 w-40 bg-slate-200 rounded-md"></div>
              <div className="h-4 w-56 bg-slate-200 rounded-md"></div>
            </div>
          </div>

          {/* Personal Details Skeleton */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="h-4 w-28 bg-slate-200 rounded-md"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="h-20 bg-slate-100 rounded-xl"></div>
              <div className="h-20 bg-slate-100 rounded-xl"></div>
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="mt-8">
            <div className="h-12 w-full bg-slate-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  const user = data?.user;

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#f4f7f5] px-4 py-8 sm:px-6">
      
      {/* Return to Home Link */}
      <div className="w-full max-w-[560px] mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={16} />
          হোম পেজে ফিরে যান
        </Link>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[560px] rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">আমার প্রোফাইল</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন ও পরিচালনা করুন।
          </p>
        </div>

        {/* User Info Header Card */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          {user?.image ? (
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden border border-slate-200 shadow-xs shrink-0">
              <Image
                src={user.image}
                alt={user?.name || "User"}
                fill
                sizes="(max-width: 768px) 64px, 80px"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-xl sm:text-2xl border border-emerald-200 shadow-2xs">
              {getInitial(user?.name)}
            </div>
          )}

          <div className="flex flex-col overflow-hidden">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
              {user?.name || "User Name"}
            </h2>
            <p className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 mt-0.5 truncate">
              <Mail size={14} className="shrink-0 text-slate-400" />
              <span className="truncate">{user?.email || "No email provided"}</span>
            </p>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="mt-6 flex flex-col gap-4">
          <h3 className="text-xs sm:text-sm font-semibold text-slate-600">
            ব্যক্তিগত তথ্য
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Name Field Box */}
            <div className="flex flex-col gap-1 rounded-xl bg-slate-50/80 p-3.5 border border-slate-100">
              <span className="text-[11px] font-medium text-slate-400">নাম</span>
              <span className="text-sm sm:text-base font-semibold text-slate-800 truncate">
                {user?.name || "-"}
              </span>
            </div>

            {/* Email Field Box */}
            <div className="flex flex-col gap-1 rounded-xl bg-slate-50/80 p-3.5 border border-slate-100">
              <span className="text-[11px] font-medium text-slate-400">ইমেইল (Read-only)</span>
              <span className="text-sm sm:text-base font-semibold text-slate-800 truncate">
                {user?.email || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Update Profile Button */}
        <div className="mt-8">
          <Link
            href="/profile/update-profile"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00873e] hover:bg-[#007335] py-3 px-4 text-sm sm:text-base font-semibold text-white transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          >
            <UserPen size={18} />
            তথ্য আপডেট করুন
          </Link>
        </div>

      </div>
    </div>
  );
}