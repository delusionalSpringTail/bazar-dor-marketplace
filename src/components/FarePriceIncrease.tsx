"use client";

import { IProduct } from "@/types/type";
import Link from "next/link";
import { useEffect, useState } from "react";

const FarePriceIncrease = () => {
    const [topIncreasedRoutes, setTopIncreasedRoutes] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
                const data: IProduct[] = await res.json();
                const filteredData = data
                    .filter((item) => item.change?.dir === "up")
                    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
                    .slice(0, 6);
                setTopIncreasedRoutes(filteredData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="w-full bg-[#f0f5f0] py-6 sm:py-8 px-4 sm:px-6">
            <div className="mx-auto max-w-7xl">
                
                {/* Section Title */}
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-red-500 text-lg">▲</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        আজ দাম বেড়েছে
                    </h2>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {loading ? (
                        // Skeleton Loaders
                        Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-44 w-full animate-pulse rounded-2xl bg-slate-200/70 border border-slate-100"
                            />
                        ))
                    ) : topIncreasedRoutes.length === 0 ? (
                        <div className="col-span-full py-8 text-center text-slate-500 text-sm">
                            আজ কোনো পণ্যের দাম বাড়েনি।
                        </div>
                    ) : (
                        // Product Cards matching the exact layout
                        topIncreasedRoutes.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                className="group flex flex-col justify-between rounded-2xl bg-white p-5 sm:p-6 border border-slate-100 shadow-2xs hover:shadow-md transition-all duration-200"
                            >
                                {/* Top Part: Icon with square container & Name/Unit */}
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

                                {/* Bottom Part: Price text & Percentage badge on same row */}
                                <div className="mt-5 pt-4 border-t border-slate-100 flex items-end justify-between">
                                    <div>
                                        <span className="text-xs sm:text-sm text-slate-500 block mb-0.5">
                                            আজকের দাম
                                        </span>
                                        <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                                            {product.today} <span className="text-sm font-semibold text-slate-700">টাকা</span>
                                        </span>
                                    </div>

                                    {/* Percentage Badge */}
                                    {product.change && (
                                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#f3f5f4] text-red-600">
                                            <span>▲</span>
                                            <span>{product.change.pct}%</span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))
                    )}
                </div>

            </div>
        </section>
    );
};

export default FarePriceIncrease;