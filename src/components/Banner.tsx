import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BannerSection = () => {
  // Optional: Generate current date in Bengali or use static text matching your design
  const currentDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="w-full bg-[#f0f5f0] py-6 sm:py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-white p-6 sm:p-10 lg:p-12 shadow-sm border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Left Content Area */}
          <div className="flex flex-col items-start max-w-2xl z-10">

            {/* Date Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[#00873e] border border-emerald-100/60 mb-4">
              <span className="h-2 w-2 rounded-full bg-[#00873e] animate-pulse"></span>
              {currentDate}
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Call to Action Button */}
            <div className="mt-6 sm:mt-8">
              <Link
                href={"/#all-products"}
                className="inline-flex items-center gap-2 rounded-xl bg-[#00873e] hover:bg-[#007335] px-6 py-3 text-sm sm:text-base font-semibold text-white transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowRight size={18} />
              </Link>
            </div>

          </div>

          {/* Right Image Area */}
          <div className="w-full lg:w-[420px] shrink-0 flex items-center justify-center">
            <div className="relative w-full h-[240px] sm:h-[280px] lg:h-[300px]">
              <Image
                src="/banner.png"
                alt="বাজারের পণ্যের ঝুড়ি"
                fill
                priority
                className="object-contain drop-shadow-sm"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BannerSection;
