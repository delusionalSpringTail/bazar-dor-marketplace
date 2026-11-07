"use client";

import { ICategory } from "@/types/type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Category = () => {
    const pathname = usePathname();
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
                const data: ICategory[] = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <nav className="w-full bg-[#fcfdfd] border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
                    {loading
                        ? // Skeleton Loader Pills
                        Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-9 w-24 shrink-0 animate-pulse rounded-xl bg-slate-200/70"
                            />
                        ))
                        : // Category Links
                        categories.map((category) => {
                            const isCurrentCategory = pathname === `/category/${category.slug}`;
                            const isActive = isCurrentCategory;

                            return (
                                <Link
                                    href={`/category/${category.slug}`}
                                    key={category.id}
                                    className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 outline-none focus:outline-none ${isActive
                                            ? "bg-[#00873e] text-white shadow-xs"
                                            : "bg-transparent text-slate-700 hover:bg-slate-100/70"
                                        }`}
                                >
                                    {category.icon && <span className="text-base">{category.icon}</span>}
                                    <span>{category.nameBn}</span>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </nav>
    );
};

export default Category;