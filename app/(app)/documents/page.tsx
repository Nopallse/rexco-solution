"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { listProducts, type ProductDto } from "@/app/lib/product-client";
import { getImageUrl, getFileUrl } from "@/app/lib/image-utils";
import { useLanguage } from '@/app/providers/LanguageProvider';


export default function DocumentsPage() {
  const { t, language } = useLanguage();
  const withLang = (href: string) => (href.startsWith('/') ? `/${language}${href}` : href);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const data = await listProducts();
        // Keep only products that have at least one document
        const withDocs = (data || []).filter(
          (p) => (p.productDocument?.length ?? 0) > 0
        );
        setProducts(withDocs);
      } catch (e) {
        console.error("Failed to load products for documents page", e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const items = useMemo(() => products.slice(0, 8), [products]);

  if (loading) {
    return (
      <div className="bg-white py-8 sm:py-12 lg:py-20">
        <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
          <div className="text-primary">{t.pages?.documents?.loading || 'Memuat dokumen…'}</div>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="bg-white py-8 sm:py-12 lg:py-20">
        <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary mb-4 decoration-2 underline-offset-4">
              {t.pages?.documents?.title || 'Dokumen (MSDS dan TDS)'}
            </h2>
          </div>
          <p className="text-gray-600">{t.pages?.documents?.no_data || 'Belum ada dokumen tersedia.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8 sm:py-12 lg:py-20">
      <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary mb-4 decoration-2 underline-offset-4">
            {t.pages?.documents?.title || 'Dokumen (MSDS dan TDS)'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {items.map((item) => {
            // derive display image: prefer primaryImage, then first productImage
            const displayImage = item.primaryImage
              ? getImageUrl(item.primaryImage)
              : item.productImage?.length
              ? getImageUrl(item.productImage[0].url)
              : "/images/product.jpg";

            // find MSDS/TDS documents by common labels
            const msdsDoc = item.productDocument?.find(
              (d) => d.type === "MSDS"
            );
            const tdsDoc = item.productDocument?.find((d) => d.type === "TDS");

            const msdsUrl = msdsDoc?.file
              ? getFileUrl(msdsDoc.file)
              : undefined;
            const tdsUrl = tdsDoc?.file ? getFileUrl(tdsDoc.file) : undefined;

            return (
              <div
                key={item.slug ?? item.id}
                className="flex flex-col items-center h-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
              >
                {/* Square image area with light background */}
                <div className="w-full aspect-square flex items-center justify-center transition-transform duration-300 hover:translate-y-[-6px] bg-white p-4 sm:p-6">
                  <img
                    src={displayImage}
                    alt={item.name}
                    className="max-h-[100%] w-full aspect-square object-contain mx-2 sm:mx-4"
                  />
                </div>
                <div className="p-4 sm:p-6 lg:p-8 pt-0 flex flex-col flex-1 w-full">
                  {/* Title - clamp to 2 lines */}
                  <h4 className="text-base sm:text-lg lg:text-2xl font-extrabold uppercase leading-tight line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] lg:min-h-[3.5rem] flex mb-3 sm:mb-4 lg:mb-6">
                    {item.name}
                  </h4>

                  <div className="flex w-full mt-auto">
                    {msdsUrl ? (
                      <button
                        onClick={() => window.open(msdsUrl, "_blank")}
                        className="w-1/2 bg-primary text-white font-extrabold h-12 sm:h-14 text-sm sm:text-base uppercase flex items-center justify-center hover:bg-secondary hover:text-black transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          MSDS
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 512 512"
                            fill="currentColor"
                          >
                            <path d="M216 0h80v192h87.7L256 378.3 128.3 192H216zM0 376h512v112H0z" />
                          </svg>
                        </span>
                      </button>
                    ) : (
                      <span className="w-1/2 bg-gray-300 text-white font-extrabold h-12 sm:h-14 text-sm sm:text-base uppercase flex items-center justify-center opacity-60 cursor-not-allowed">
                        <span className="flex items-center gap-2">MSDS</span>
                      </span>
                    )}

                    {tdsUrl ? (
                      <button
                        onClick={() => window.open(tdsUrl, "_blank")}
                        className="w-1/2 bg-secondary text-black font-extrabold h-12 sm:h-14 text-sm sm:text-base uppercase flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          TDS
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 512 512"
                            fill="currentColor"
                          >
                            <path d="M216 0h80v192h87.7L256 378.3 128.3 192H216zM0 376h512v112H0z" />
                          </svg>
                        </span>
                      </button>
                    ) : (
                      <span className="w-1/2 bg-gray-200 text-black font-extrabold h-12 sm:h-14 text-sm sm:text-base uppercase flex items-center justify-center opacity-60 cursor-not-allowed">
                        <span className="flex items-center gap-2">TDS</span>
                      </span>
                    )}
                  </div>

                  {/* Go to Product Page */}
                  <Link
                    href={withLang(`/product/${item.slug ?? item.id}`)}
                    className="w-full h-12 sm:h-14 lg:h-16 text-sm sm:text-base text-gray-600 font-extrabold uppercase flex items-center hover:text-black transition-colors"
                  >
                    <div className="flex items-center justify-between w-full gap-2 text-[#727272] hover:text-black">
                      <span className="line-clamp-2 ">Ke halaman Produk</span>
                      <svg
                      className="w-4 h-4 flex-shrink-0"
                      aria-hidden="true"
                      viewBox="0 0 448 512"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      >
                      <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
