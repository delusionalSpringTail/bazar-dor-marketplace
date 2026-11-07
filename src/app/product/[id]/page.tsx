import { IProduct } from "@/types/type";
import Link from "next/link";
import React, { Suspense } from "react";

const getProductData = async (id: string): Promise<IProduct | null> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
            cache: "no-store",
        });
        if (!response.ok) return null;
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch product details:", error);
        return null;
    }
};

const ProductDetailsSkeleton = () => (
    <div className="w-full bg-[#f0f5f0] min-h-screen py-6 sm:py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl space-y-6">
            <div className="h-36 w-full animate-pulse rounded-3xl bg-slate-200/70 border border-slate-100" />
            <div className="h-32 w-full animate-pulse rounded-3xl bg-slate-200/70 border border-slate-100" />
            <div className="h-96 w-full animate-pulse rounded-3xl bg-slate-200/70 border border-slate-100" />
        </div>
    </div>
);

const ProductDetailsContent = async ({ id }: { id: string }) => {
    const product = await getProductData(id);

    if (!product) {
        return (
            <div className="w-full bg-[#f0f5f0] min-h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-600">
                <p className="text-base sm:text-lg font-semibold">পণ্যটি পাওয়া যায়নি বা মুছে ফেলা হয়েছে।</p>
                <Link href="/" className="px-5 py-2.5 rounded-xl bg-[#00873e] text-white text-xs sm:text-sm font-bold">
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    // Calculations for markets summary
    const allMins = product.markets?.map((m) => m.min) || [product.today];
    const allMaxs = product.markets?.map((m) => m.max) || [product.today];
    const lowestMin = Math.min(...allMins);
    const highestMax = Math.max(...allMaxs);

    // Calculate average across all markets
    const avgPrices = product.markets?.map((m) => (m.min + m.max) / 2) || [product.today];
    const overallAvg = (avgPrices.reduce((acc, curr) => acc + curr, 0) / avgPrices.length).toFixed(1);

    const dir = product.change?.dir;
    const isUp = dir === "up";
    const isDown = dir === "down";
    const symbol = isUp ? "▲" : isDown ? "▼" : "-";
    const badgeColorClass = isDown ? "text-emerald-600 bg-[#f3f5f4]" : isUp ? "text-red-600 bg-[#f3f5f4]" : "text-slate-600 bg-[#f3f5f4]";

    return (
        <section className="w-full bg-[#f0f5f0] min-h-screen py-6 sm:py-8 px-4 sm:px-6">
            <div className="mx-auto max-w-7xl space-y-6">
                
                {/* Top Main Banner Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4 sm:gap-6">
                        {product.categoryIcon && (
                            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-[#f0f5f0] text-3xl sm:text-4xl border border-slate-100 shrink-0">
                                {product.categoryIcon}
                            </div>
                        )}
                        <div>
                            <h1 className="text-xl sm:text-3xl font-bold text-slate-900">
                                {product.nameBn}
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                                প্রতি {product.unit} · {product.categoryNameBn}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
                                গতকালের তুলনায় আজ দাম{" "}
                                <span className={isUp ? "text-red-600 font-bold" : isDown ? "text-emerald-600 font-bold" : "text-slate-700 font-bold"}>
                                    {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "পরিবর্তন হয়নি"}
                                </span>{" "}
                                — {product.change?.pct || 0}%
                            </p>
                        </div>
                    </div>

                    {/* Today Price Box */}
                    <div className="w-full md:w-auto bg-[#f9faf9] border border-slate-100 rounded-2xl p-4 sm:px-6 sm:py-4 flex items-center justify-between md:flex-col md:items-end gap-2">
                        <span className="text-xs sm:text-sm text-slate-500">আজকের দাম</span>
                        <div className="flex items-center gap-3 md:flex-col md:items-end">
                            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                                ৳{product.today} <span className="text-xs font-semibold text-slate-500">টাকা / {product.unit}</span>
                            </span>
                            {product.change && (
                                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${badgeColorClass}`}>
                                    <span>{symbol}</span>
                                    <span>{product.change.pct}%</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Price Summary Stats Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xs space-y-4">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        দামের সারাংশ
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Min Price Card */}
                        <div className="bg-[#fcfdfd] border border-slate-100 rounded-2xl p-5 shadow-2xs">
                            <span className="text-xs text-slate-500 block mb-1">সর্বনিম্ন দাম</span>
                            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
                                ৳{lowestMin} <span className="text-xs font-semibold text-slate-500">টাকা</span>
                            </div>
                            <span className="text-xs text-slate-400">সবচেয়ে কম দামের বাজার</span>
                        </div>

                        {/* Max Price Card */}
                        <div className="bg-[#fcfdfd] border border-slate-100 rounded-2xl p-5 shadow-2xs">
                            <span className="text-xs text-slate-500 block mb-1">সর্বাধিক দাম</span>
                            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
                                ৳{highestMax} <span className="text-xs font-semibold text-slate-500">টাকা</span>
                            </div>
                            <span className="text-xs text-slate-400">সবচেয়ে বেশি দামের বাজার</span>
                        </div>

                        {/* Average Price Card */}
                        <div className="bg-[#fcfdfd] border border-slate-100 rounded-2xl p-5 shadow-2xs">
                            <span className="text-xs text-slate-500 block mb-1">গড় দাম</span>
                            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
                                ৳{overallAvg} <span className="text-xs font-semibold text-slate-500">টাকা</span>
                            </div>
                            <span className="text-xs text-slate-400">প্রতি {product.unit}-এর হিসাবে</span>
                        </div>
                    </div>
                </div>

                {/* Market-wise Breakdown Table Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xs space-y-6">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[650px]">
                            <thead>
                                <tr className="border-b border-slate-100 text-xs sm:text-sm font-semibold text-slate-500">
                                    <th className="py-3 px-4">বাজার</th>
                                    <th className="py-3 px-4">বিভাগ</th>
                                    <th className="py-3 px-4">সর্বনিম্ন</th>
                                    <th className="py-3 px-4">সর্বাধিক</th>
                                    <th className="py-3 px-4 text-right">গড়</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-xs sm:text-sm text-slate-800">
                                {product.markets && product.markets.length > 0 ? (
                                    product.markets.map((m, index) => {
                                        const mAvg = ((m.min + m.max) / 2).toFixed(1);
                                        return (
                                            <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                                                <td className="py-4 px-4 font-semibold text-slate-900">{m.market}</td>
                                                <td className="py-4 px-4 text-slate-600">{m.division}</td>
                                                <td className="py-4 px-4 font-medium text-slate-800">৳{m.min} টাকা</td>
                                                <td className="py-4 px-4 font-medium text-slate-800">৳{m.max} টাকা</td>
                                                <td className="py-4 px-4 text-right font-bold text-slate-900">৳{mAvg} টাকা</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-slate-400">
                                            কোনো বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </section>
    );
};

const ProductDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    return (
        <Suspense fallback={<ProductDetailsSkeleton />}>
            <ProductDetailsContent id={id} />
        </Suspense>
    );
};

export default ProductDetailsPage;