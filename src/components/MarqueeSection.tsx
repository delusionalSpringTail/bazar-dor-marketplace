"use client";

import { IProduct } from '@/types/type';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

const MarqueeSection = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data: IProduct[] = await response.json();
        setProducts(data.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch marquee products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-white border-b border-slate-100 py-3">
      <Marquee pauseOnHover={true} speed={40} gradient={false}>
        <div className="flex items-center gap-4 px-2">
          {loading ? (
            // Skeleton Loader Pills
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-10 w-48 shrink-0 animate-pulse rounded-xl bg-slate-200/70"
              />
            ))
          ) : (
            products.map((product) => {
              const dir = product.change?.dir;
              const isUp = dir === 'up';
              const isDown = dir === 'down';
              const isFlat = dir === 'flat' || !dir;

              // Determine symbol and color based on direction
              const symbol = isUp ? '▲' : isDown ? '▼' : '-';
              const colorClass = isDown ? 'text-emerald-600' : isUp ? 'text-red-500' : 'text-slate-400';

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-100 transition-colors shrink-0 text-xs sm:text-sm text-slate-800 shadow-2xs"
                >
                  {/* Category Icon */}
                  {product.categoryIcon && (
                    <span className="text-base shrink-0">{product.categoryIcon}</span>
                  )}

                  {/* Product Name */}
                  <span className="font-semibold text-slate-900 whitespace-nowrap">
                    {product.nameBn}
                  </span>

                  {/* Price & Unit */}
                  <span className="text-slate-600 whitespace-nowrap">
                    {product.today} টাকা/{product.unit}
                  </span>

                  {/* Price Change Symbol & Percentage */}
                  {product.change && (
                    <span className={`flex items-center gap-1 text-xs font-bold whitespace-nowrap ${colorClass}`}>
                      <span>{symbol}</span>
                      {!isFlat && <span>{product.change.pct}%</span>}
                    </span>
                  )}
                </Link>
              );
            })
          )}
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeSection;