"use client";

import React from "react";
import { Button } from "antd";
import Link from "next/link";
import { useLanguage } from '@/app/providers/LanguageProvider';

export default function FeaturedProductSection() {
  const { t } = useLanguage();
  const productImages = [
    "/images/hero/1.webp",
    "/images/hero/2.webp",
    "/images/hero/3.webp",
    "/images/hero/4.jpg",
  ];

  const relatedProducts = [
    {
      title: "Produk Perawatan Serbaguna untuk Kebutuhan Sehari-hari REXCO",
      link: "#",
      image: "/images/hero/5.jpg",
    },
    {
      title: "Solusi Perawatan Terbaik untuk Kendaraan & Industri – REXCO",
      link: "#",
      image: "/images/hero/6.jpg",
    },
    {
      title: "Pelumas Serbaguna",
      link: "#",
      image: "/images/hero/7.jpg",
    },
  ];

  return (
    <div className="container mx-auto max-w-screen-xl px-0 sm:px-12 lg:px-16">
      <div className="bg-primary">
        <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16 pb-16 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Section - Product Info */}
            <div className="bg-white p-6 flex flex-col justify-center border-t-10 border-secondary">
              {/* Title - Centered */}
              <h2 className=" lg:text-md font-bold text-primary text-center mb-8 leading-tight uppercase">
                {t.home?.featured?.title || 'REXCO 50 PERLINDUNGAN OPTIMAL, PELUMAS MULTI FUNGSI'}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Section - Product Info */}
                <div>
                  <p className="text-black text-lg leading-relaxed mb-8">
                    {t.home?.featured?.desc || 'Rexco 50 adalah pelumas serbaguna yang menawarkan penetrasi dua kali lebih cepat dan perlindungan anti-karat hingga tiga kali.'}
                  </p>
                  <Button
                    type="primary"
                    size="large"
                    className="!bg-[#323288] hover:!bg-[#2d1e4e] !border-none !px-8 !h-auto !py-3 !text-base font-bold tracking-wider w-full"
                  >
                    {t.home?.featured?.learn_more || 'PELAJARI LEBIH LANJUT'}
                  </Button>
                </div>

                {/* Right Section - Product Grid */}
                <div className="grid lg:grid-cols-2 gap-1">
                  {productImages.map((image, index) => (
                  <div
                    key={index}
                    className="bg-gray-300 overflow-hidden lg:aspect-square"
                  >
                    <img
                    src={image}
                    alt={`Rexco 50 Product ${index + 1}`}
                    className="w-full h-full object-cover"
                    />
                  </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section - Related Products */}
            <div className="space-y-6 py-8">
              <h3 className="text-white text-xl font-bold uppercase mb-4">
                {t.home?.featured?.related_title || 'Related Products'}
              </h3>
              {relatedProducts.map((product, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-400 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-white text-md font-semibold leading-snug mb-2">
                      {product.title}
                    </p>
                    <Link
                      href={product.link}
                      className="!text-white text-sm font-extrabold uppercase tracking-wider hover:!text-black inline-flex items-center gap-2"
                    >
                      {t.home?.featured?.read_more || 'BACA LEBIH LANJUT'}
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
