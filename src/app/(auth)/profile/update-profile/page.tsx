"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft, Mail, User, Check } from "lucide-react";
import { updateUser, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function UpdateProfilePage() {
    const { data, isPending } = useSession();
    const [name, setName] = useState(data?.user?.name || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();


    // Function to handle form submission and get name value
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage("");

        // Extract updated name value from FormData
        const formData = new FormData(e.currentTarget);
        const updatedName = formData.get("name")?.toString().trim();

        if (!updatedName || updatedName.length < 2) {
            toast.error("অনুগ্রহ করে কমপক্ষে ২ অক্ষরের নাম লিখুন।");
            setIsSubmitting(false);
            return;
        }

        const data = Object.fromEntries(formData.entries());
        const { data: resData, error } = await updateUser({
            name: data.name as string,
        });
        if (resData?.status === true) {
            toast.success("Profile Updated");
            router.push("/profile");
        }
        if (error) {
            toast.error(error?.message as string);
        }


    };

    // Skeleton Loader State
    if (isPending) {
        return (
            <div className="flex min-h-screen flex-col items-center bg-[#f4f7f5] px-4 py-8 sm:px-6">
                <div className="w-full max-w-140 mb-6 animate-pulse">
                    <div className="h-4 w-36 bg-slate-200 rounded-md"></div>
                </div>

                <div className="w-full max-w-140 rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100 animate-pulse">
                    <div className="text-center mb-8 flex flex-col items-center">
                        <div className="h-8 w-44 bg-slate-200 rounded-lg mb-2"></div>
                        <div className="h-4 w-64 bg-slate-200 rounded-md"></div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="h-16 bg-slate-100 rounded-xl"></div>
                        <div className="h-16 bg-slate-100 rounded-xl"></div>
                        <div className="h-12 bg-slate-200 rounded-xl mt-4"></div>
                    </div>
                </div>
            </div>
        );
    }

    const user = data?.user;

    return (
        <div className="flex min-h-screen flex-col items-center bg-[#f4f7f5] px-4 py-8 sm:px-6">

            {/* Return to Profile Link */}
            <div className="w-full max-w-140 mb-6">
                <Link
                    href="/profile"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft size={16} />
                    প্রোফাইলে ফিরে যান
                </Link>
            </div>

            {/* Main Container */}
            <div className="w-full max-w-140 rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-100">

                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">তথ্য পরিবর্তন</h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                        আপনার প্রোফাইলের নাম পরিবর্তন করুন।
                    </p>
                </div>

                {/* Success Alert */}
                {successMessage && (
                    <div className="mb-6 flex items-center gap-2 rounded-xl bg-emerald-50 p-3.5 text-xs sm:text-sm font-medium text-emerald-700 border border-emerald-200">
                        <Check size={18} className="shrink-0 text-emerald-600" />
                        {successMessage}
                    </div>
                )}

                {/* Update Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Email Field (Read-Only) */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs sm:text-sm font-medium text-slate-600">
                            ইমেইল (পরিবর্তনযোগ্য নয়)
                        </label>
                        <div className="relative flex items-center">
                            <Mail size={18} className="absolute left-3.5 text-slate-400" />
                            <input
                                type="email"
                                disabled
                                value={user?.email || ""}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-3.5 py-3 text-sm sm:text-base text-slate-500 cursor-not-allowed outline-none"
                            />
                        </div>
                    </div>

                    {/* Full Name Field (Editable) */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs sm:text-sm font-medium text-slate-700">
                            পূর্ণ নাম
                        </label>
                        <div className="relative flex items-center">
                            <User size={18} className="absolute left-3.5 text-slate-400" />
                            <input
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="আপনার নাম লিখুন"
                                required
                                className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-3.5 py-3 text-sm sm:text-base text-slate-900 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-colors"
                            />
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                            এই নামটি আপনার প্রোফাইল এবং নেভিগেশন বারে প্রদর্শিত হবে।
                        </p>
                    </div>

                    {/* Submit Button (Green Theme) */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00873e] hover:bg-[#007335] disabled:bg-emerald-400 py-3 px-4 text-sm sm:text-base font-semibold text-white transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    আপডেট হচ্ছে...
                                </>
                            ) : (
                                <>
                                    <Check size={18} />
                                    তথ্য আপডেট করুন
                                </>
                            )}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}