"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/app/providers/LanguageProvider";
import { getProductImageUrl } from "@/app/lib/image-utils";
import { ProductDto, searchProducts } from "@/app/lib/product-client";

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const query = (searchParams.get("search") || "").trim();
  const { language } = useLanguage();
  const [results, setResults] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const withLang = (href: string) => (href.startsWith("/") ? `/${language}${href}` : href);

  useEffect(() => {
    let isActive = true;

    if (!query) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchProducts(query);
        if (!isActive) return;
        setResults(data || []);
      } catch (err) {
        if (!isActive) return;
        setError(err instanceof Error ? err.message : "Failed to fetch results");
        setResults([]);
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchResults();

    return () => {
      isActive = false;
    };
  }, [query]);

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
        <div className="mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-primary mb-4 decoration-2 underline-offset-4">
            Search results
          </h2>
          {query ? (
            <p className="text-lg text-[#717171]">Results for "{query}"</p>
          ) : (
            <p className="text-lg text-[#717171]">Type a keyword to search products.</p>
          )}
        </div>

        {loading && (
          <div className="text-center text-gray-500">Loading products...</div>
        )}

        {!loading && error && (
          <div className="text-center text-red-500">{error}</div>
        )}

        {!loading && !error && query && results.length === 0 && (
          <div className="text-center text-gray-500">No products found.</div>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((product) => (
              <div
                key={product.id}
                className="flex flex-col h-full group bg-white rounded-lg overflow-hidden border border-gray-200"
              >
                <Link href={withLang(`/product/${product.slug}`)} className="overflow-hidden">
                  <Image
                    src={getProductImageUrl(product.primaryImage, product.productImage)}
                    alt={product.name}
                    width={640}
                    height={640}
                    className="w-full h-auto p-2 aspect-square object-contain"
                  />
                </Link>

                <div className="flex-row px-6 pt-4">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 inline-block mr-2 text-[#717171]"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"
                    ></path>
                  </svg>
                  <span className="text-lg font-semibold text-[#717171]">Product</span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-4 leading-tight">
                    {product.name}
                  </h3>
                  <Link
                    href={withLang(`/product/${product.slug}`)}
                    className="mt-auto !text-[#717171] font-bold uppercase decoration-2 underline-offset-4 flex items-center gap-2 hover:text-black"
                  >
                    View product
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      viewBox="0 0 448 512"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
