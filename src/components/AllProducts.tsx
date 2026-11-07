"use client";

import { IProduct } from "@/types/type";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
                const data: IProduct[] = await res.json();
                setAllProducts(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section id="all-products" className="w-full bg-[#f0f5f0] py-6 sm:py-8 px-4 sm:px-6">
            <div className="mx-auto max-w-7xl">
                
                {/* Section Title & Subtitle */}
                <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        সব পণ্য
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        মোট {allProducts.length}টি পণ্য দেখানো হচ্ছে
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {loading ? (
                        // Skeleton Loaders
                        Array.from({ length: 9 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-44 w-full animate-pulse rounded-2xl bg-slate-200/70 border border-slate-100"
                            />
                        ))
                    ) : allProducts.length === 0 ? (
                        <div className="col-span-full py-8 text-center text-slate-500 text-sm">
                            কোনো পণ্য পাওয়া যায়নি।
                        </div>
                    ) : (
                        // Product Cards
                        allProducts.map((product) => {
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
                                    href={`/product/${product.slug}`}
                                    className="group flex flex-col justify-between rounded-2xl bg-white p-5 sm:p-6 border border-slate-100 shadow-2xs hover:shadow-md transition-all duration-200"
                                >
                                    {/* Top Part: Icon container & Name/Unit */}
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
                                            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${badgeColorClass}`}>
                                                <span>{symbol}</span>
                                                <span>{product.change.pct}%</span>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>

            </div>
        </section>
    );
};

export default AllProducts;