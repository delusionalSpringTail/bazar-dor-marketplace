import Link from "next/link";
import React from "react";

const NotFound = () => {
    return (
        <div className="w-full bg-[#f0f5f0] min-h-screen flex items-center justify-center px-4 sm:px-6">
            <div className="mx-auto max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-2xs text-center space-y-6">
                
                {/* 404 Visual Icon / Number */}
                <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-3xl bg-emerald-50 text-[#00873e] text-3xl font-extrabold border border-emerald-100 shadow-2xs">
                    404
                </div>

                {/* Error Titles */}
                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        পেজটি পাওয়া যায়নি
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ঠিকানাটি ভুল রয়েছে।
                    </p>
                </div>

                {/* Back to Home Button */}
                <div className="pt-2">
                    <Link
                        href="/"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00873e] hover:bg-[#007335] px-6 py-3.5 text-sm sm:text-base font-bold text-white transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                    >
                        <span>হোম পেজে ফিরে যান</span>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default NotFound;