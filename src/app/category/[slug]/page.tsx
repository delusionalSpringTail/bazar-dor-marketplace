import { IProduct } from "@/types/type";
import React, { Suspense } from "react";
import CategoryCards from "@/components/CategoryCards";

const getData = async (slug: string): Promise<IProduct[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?category=${slug}`, { cache: "no-store", });
    const data = await response.json();
    return data;
};

// Skeleton Loading Component for Category Detail Page
const CategorySkeleton = () => (
    <div className="w-full bg-[#f0f5f0] min-h-screen py-6 sm:py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl space-y-6">
            <div className="h-32 w-full animate-pulse rounded-3xl bg-slate-200/70 border border-slate-100" />
            <div className="flex justify-between items-center">
                <div className="h-5 w-40 animate-pulse bg-slate-200/70 rounded-lg" />
                <div className="h-10 w-36 animate-pulse bg-slate-200/70 rounded-xl" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-44 w-full animate-pulse rounded-2xl bg-slate-200/70 border border-slate-100"
                    />
                ))}
            </div>
        </div>
    </div>
);

const CategoryDetailContent = async ({ slug }: { slug: string }) => {
    const categoryData = await getData(slug);

    if (!categoryData || categoryData.length === 0) {
        return (
            <div className="w-full bg-[#f0f5f0] min-h-[60vh] flex items-center justify-center text-slate-500 text-sm">
                এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </div>
        );
    }

    return <CategoryCards initialProducts={categoryData} categorySlug={slug} />;
};

const CategoryDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    return (
        <Suspense fallback={<CategorySkeleton />}>
            <CategoryDetailContent slug={slug} />
        </Suspense>
    );
};

export default CategoryDetailPage;