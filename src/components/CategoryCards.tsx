"use client";

import { IProduct } from "@/types/type";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface CategoryCardsProps {
    initialProducts: IProduct[];
    categorySlug: string;
}

const CategoryCards = ({ initialProducts, categorySlug }: CategoryCardsProps) => {
    const [sortOrder, setSortOrder] = useState<"default" | "low-high" | "high-low">("default");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Sort products based on 'today' price
    const sortedProducts = [...initialProducts].sort((a, b) => {
        if (sortOrder === "low-high") return a.today - b.today;
        if (sortOrder === "high-low") return b.today - a.today;
        return 0; // default order from API
    });

    // Get category display name from the first product or format the slug
    const categoryName = initialProducts[0]?.categoryNameBn || categorySlug;

    return (
        <section className="w-full bg-[#f0f5f0] min-h-screen py-6 sm:py-8 px-4 sm:px-6">
            <div className="mx-auto max-w-7xl space-y-6">
                
                {/* Top Banner Header */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xs flex items-center gap-4 sm:gap-6">
                    <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-[#f0f5f0] text-3xl sm:text-4xl border border-slate-100 shrink-0">
                        {initialProducts[0]?.categoryIcon || "📦"}
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-3xl font-bold text-slate-900">
                            {categoryName}
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            {initialProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>

                {/* Subheader: Count & Sort Dropdown */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                    <p className="text-xs sm:text-sm text-slate-500">
                        মোট {initialProducts.length}টি পণ্য দেখানো হচ্ছে
                    </p>

                    {/* Sort Dropdown Container */}
                    <div className="relative">
                        <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm text-slate-600 font-medium">সাজান</span>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center justify-between gap-6 bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 shadow-2xs outline-none focus:ring-2 focus:ring-[#00873e]/20 min-w-[140px]"
                            >
                                <span>
                                    {sortOrder === "default" && "ডিফল্ট"}
                                    {sortOrder === "low-high" && "দাম: কম থেকে বেশি"}
                                    {sortOrder === "high-low" && "দাম: বেশি থেকে কম"}
                                </span>
                                <span className="text-xs text-slate-400">
                                    {isDropdownOpen ? <ChevronUp/> : <ChevronDown/>}
                                </span>
                            </button>
                        </div>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-100 shadow-lg py-2 z-20">
                                <button
                                    onClick={() => { setSortOrder("default"); setIsDropdownOpen(false); }}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm text-left transition-colors ${
                                        sortOrder === "default" ? "bg-[#f0f5f0] text-[#00873e] font-bold" : "text-slate-700 hover:bg-slate-50"
                                    }`}
                                >
                                    <span>ডিফল্ট</span>
                                    {sortOrder === "default" && <span className="text-[#00873e]">✓</span>}
                                </button>
                                <button
                                    onClick={() => { setSortOrder("low-high"); setIsDropdownOpen(false); }}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm text-left transition-colors ${
                                        sortOrder === "low-high" ? "bg-[#f0f5f0] text-[#00873e] font-bold" : "text-slate-700 hover:bg-slate-50"
                                    }`}
                                >
                                    <span>দাম: কম থেকে বেশি</span>
                                    {sortOrder === "low-high" && <span className="text-[#00873e]">✓</span>}
                                </button>
                                <button
                                    onClick={() => { setSortOrder("high-low"); setIsDropdownOpen(false); }}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm text-left transition-colors ${
                                        sortOrder === "high-low" ? "bg-[#f0f5f0] text-[#00873e] font-bold" : "text-slate-700 hover:bg-slate-50"
                                    }`}
                                >
                                    <span>দাম: বেশি থেকে কম</span>
                                    {sortOrder === "high-low" && <span className="text-[#00873e]">✓</span>}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {sortedProducts.map((product) => {
                        const dir = product.change?.dir;
                        const isUp = dir === "up";
                        const isDown = dir === "down";
                        const isFlat = dir === "flat" || !dir;

                        const symbol = isUp ? "▲" : isDown ? "▼" : "-";
                        const badgeColorClass = isDown
                            ? "text-emerald-600 bg-[#f3f5f4]"
                            : isUp
                            ? "text-red-600 bg-[#f3f5f4]"
                            : "text-slate-600 bg-[#f3f5f4]";

                        return (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                className="group flex flex-col justify-between rounded-2xl bg-white p-5 sm:p-6 border border-slate-100 shadow-2xs hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-center gap-4">
                                    {product.image && (
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-2xl border border-slate-100 shrink-0">
                                            {product.image}
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#00873e] transition-colors">
                                            {product.nameBn}
                                        </h3>
                                        <span className="text-xs sm:text-sm text-slate-500">
                                            প্রতি {product.unit}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-5 pt-4 border-t border-slate-100 flex items-end justify-between">
                                    <div>
                                        <span className="text-xs sm:text-sm text-slate-500 block mb-0.5">
                                            আজকের দাম
                                        </span>
                                        <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                                            ৳{product.today} <span className="text-sm font-semibold text-slate-700">টাকা</span>
                                        </span>
                                    </div>

                                    {product.change && (
                                        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${badgeColorClass}`}>
                                            <span>{symbol}</span>
                                            <span>{product.change.pct}%</span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default CategoryCards;