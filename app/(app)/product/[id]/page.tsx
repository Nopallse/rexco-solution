"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Carousel } from "antd";
import { DownloadOutlined, PlayCircleOutlined } from "@ant-design/icons";

// Product data with new structure
const products = [
  {
    id: "rexco-50",
    name: "REXCO 50 MULTIPURPOSE LUBRICANT",
    variant: ["120ml", "500ml", "220ml", "3800ml", "350ml"],
    image: [
      "/images/product/120-ML-REXCO-50.webp",
      "/images/product/350-ML-REXCO-50-scaled.webp",
      "/images/product/3800ML-REXCO-50-scaled.webp",
    ],
    youtube: "https://youtu.be/Pz-cZSshpZE",
    dokument: [
      "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-50-Multipurpose-Lubricant.pdf",
      "https://rexco-solution.com/wp-content/uploads/2024/11/1-Technical-Data-Sheet_REXCO-50.pdf",
    ],
    categories: ["Lubricant", "Multipurpose"],
    description: `<div class="">
					<p><span data-sheets-root="1">REXCO 50 MULTI PURPOSE LUBRICANT adalah cairan multifungsi yang berfungsi untuk membersihkan, melumasi dan memproteksi mesin serta peralatan yang terbuat dari metal. Dengan penetrasi 2x lebih cepat, lubrikasi 3x lebih efektif, dan formula anti karat 3x lebih lama dari merk lain, rexco 50 sangat baik dalam melindungi metal dari karat dan korosi, melepaskan mur dan baut yang berkarat dengan kemampuan penetrasi yang cepat, menghilangkan bunyi derit akibat gesekan, dan dapat membersihkan kotoran oli, aspal, serta debu dari komponen barang anda. Cairan ini sangat efektif untuk digunakan pada mesin industri, engsel pintu, aki mobil, dan bagian dari body mobil ataupun motor.</span></p>
<p>Variasi :<br>
120 ML / 100 G / 4.2 fl OZ<br>
220 ML / 180 G / 7.4 fl OZ<br>
350 ML / 287 G / 11.8 fl OZ<br>
500 ML / 485 G / 16.9 fl OZ<br>
3800 ML / 3,8 LITER</p>
<p>FUNGSI :<br>
1. MELINDUNGI MESIN INDUSTRI DARI KARAT<br>
2. MELUMASI ENGSEL PINTU<br>
3. MELINDUNGI PIPA KILANG DARI KARAT<br>
4. MELINDUNGI KEPALA AKI DARI PROSES OKSIDASI<br>
5. MENGHILANGKAN KELEMBAPAN PADA BUSI MOTOR<br>
6. MEMBERSIHKAN ASPAL DI BADAN MOBIL<br>
7. MELONGGARKAN BAGIAN YANG BERKARAT<br>
8. MELINDUNGI DARI KARAT<br>
9. MENGHILANGKAN KELEMBAPAN<br>
10. MENGHILANGKAN BUNYI DERIT<br>
11. MEMBERSIHKAN &amp; MENGHILANGKAN OLI, ASPAL, &amp; DEBU</p>
<p>Unique Selling Point :<br>
Dijamin Kualitas 3x lebih baik &amp; Harga lebih murah.</p>
				</div>`,
  },
  {
    id: "rexco-70",
    name: "REXCO 70 MULTI-PURPOSE DEGREASER",
    variant: ["500ml", "1L", "5L"],
    image: ["/images/product/1.webp"],
    youtube: "https://youtu.be/example70",
    dokument: [
      "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-70.pdf",
    ],
    categories: ["Degreaser", "Cleaner"],
    description: `REXCO 70 Multi-Purpose Degreaser effectively removes grease, oil, and grime from various surfaces.`,
  },
  {
    id: "rexco-18",
    name: "REXCO 18 CONTACT CLEANER",
    variant: ["200ml", "400ml"],
    image: ["/images/product/2.webp"],
    youtube: "https://youtu.be/example18",
    dokument: [
      "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-18.pdf",
    ],
    categories: ["Cleaner", "Electronics"],
    description: `REXCO 18 Contact Cleaner safely cleans electronic components and contacts.`,
  },
  {
    id: "rexco-25",
    name: "REXCO 25 BRAKE & PARTS CLEANER",
    variant: ["500ml"],
    image: ["/images/product/3.webp"],
    youtube: "https://youtu.be/example25",
    dokument: [
      "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-25.pdf",
    ],
    categories: ["Automotive", "Cleaner"],
    description: `REXCO 25 Brake & Parts Cleaner quickly removes brake fluid, grease, and oil.`,
  },
  {
    id: "rexco-20",
    name: "REXCO 20 BELT DRESSING",
    variant: ["400ml"],
    image: ["/images/product/4.webp"],
    youtube: "https://youtu.be/example20",
    dokument: [
      "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-20.pdf",
    ],
    categories: ["Automotive", "Maintenance"],
    description: `REXCO 20 Belt Dressing stops belt slipping and extends belt life.`,
  },
  {
    id: "rexco-60",
    name: "REXCO 60 SILICONE SPRAY",
    variant: ["400ml"],
    image: ["/images/product/6.webp"],
    youtube: "https://youtu.be/example60",
    dokument: [
      "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-60.pdf",
    ],
    categories: ["Lubricant", "Silicone"],
    description: `REXCO 60 Silicone Spray provides long-lasting lubrication and protection.`,
  },
  {
    id: "rexco-81",
    name: "REXCO 81 ANTI SPATTER",
    variant: ["400ml"],
    image: ["/images/product/8.webp"],
    youtube: "https://youtu.be/example81",
    dokument: [
      "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-81.pdf",
    ],
    categories: ["Welding", "Protection"],
    description: `REXCO 81 Anti Spatter prevents welding spatter adhesion.`,
  },
  {
    id: "rexco-82",
    name: "REXCO 82 CHAIN LUBE",
    variant: ["400ml"],
    image: ["/images/product/7.webp"],
    youtube: "https://youtu.be/example82",
    dokument: [
      "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-82.pdf",
    ],
    categories: ["Lubricant", "Chain"],
    description: `
    <div>
					<p><span data-sheets-root="1">REXCO 5s0 MULTI PURPOSE LUBRICANT adalah cairan multifungsi yang berfungsi untuk membersihkan, melumasi dan memproteksi mesin serta peralatan yang terbuat dari metal. Dengan penetrasi 2x lebih cepat, lubrikasi 3x lebih efektif, dan formula anti karat 3x lebih lama dari merk lain, rexco 50 sangat baik dalam melindungi metal dari karat dan korosi, melepaskan mur dan baut yang berkarat dengan kemampuan penetrasi yang cepat, menghilangkan bunyi derit akibat gesekan, dan dapat membersihkan kotoran oli, aspal, serta debu dari komponen barang anda. Cairan ini sangat efektif untuk digunakan pada mesin industri, engsel pintu, aki mobil, dan bagian dari body mobil ataupun motor.</span></p>
<p>Variasi :<br>
120 ML / 100 G / 4.2 fl OZ<br>
220 ML / 180 G / 7.4 fl OZ<br>
350 ML / 287 G / 11.8 fl OZ<br>
500 ML / 485 G / 16.9 fl OZ<br>
3800 ML / 3,8 LITER</p>
<p>FUNGSI :<br>
1. MELINDUNGI MESIN INDUSTRI DARI KARAT<br>
2. MELUMASI ENGSEL PINTU<br>
3. MELINDUNGI PIPA KILANG DARI KARAT<br>
4. MELINDUNGI KEPALA AKI DARI PROSES OKSIDASI<br>
5. MENGHILANGKAN KELEMBAPAN PADA BUSI MOTOR<br>
6. MEMBERSIHKAN ASPAL DI BADAN MOBIL<br>
7. MELONGGARKAN BAGIAN YANG BERKARAT<br>
8. MELINDUNGI DARI KARAT<br>
9. MENGHILANGKAN KELEMBAPAN<br>
10. MENGHILANGKAN BUNYI DERIT<br>
11. MEMBERSIHKAN &amp; MENGHILANGKAN OLI, ASPAL, &amp; DEBU</p>
<p>Unique Selling Point :<br>
Dijamin Kualitas 3x lebih baik &amp; Harga lebih murah.</p>
				</div>
    
    `,
  },
];

// Latest products use the same data
const latestProducts = products;



export default function ProductDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  if (!product) {
    return (
      <div className="bg-white py-20">
        <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h1>
          <Link href="/" className="text-[#2d5016] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
        {/* Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Info */}
          <div className="order-2 lg:order-1">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-primary mb-8 uppercase">
              {product.name}
            </h1>

            {/* Description */}
            <div className="mb-6 max-h-72 overflow-y-auto pr-2">
              {typeof product.description === "string" &&
              product.description.trim().startsWith("<") ? (
                <div
                  className="text-gray-700 text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              ) : (
                <p className="text-gray-700 text-base leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Variants */}
            {product.variant && product.variant.length > 0 && (
              <div className="mb-6 p-6 bg-[#f0f2fb]">
                <h3 className=" text-primary mb-3">Beli melalui:</h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  {product.variant.map((v, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedVariant(index)}
                      className={`px-6 py-3    text-base uppercase transition-colors
                        ${
                          selectedVariant === index
                            ? "bg-primary text-secondary"
                            : "bg-secondary text-primary hover:bg-primary hover:text-secondary"
                        }
                      `}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                {/* Marketplace Icons */}
                <div className="flex gap-3">
                  <a
                    href="https://www.tokopedia.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#42B549] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                    title="Tokopedia"
                  >
                    <svg
                      className="w-7 h-7 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                  </a>
                  <a
                    href="https://shopee.co.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#EE4D2D] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                    title="Shopee"
                  >
                    <svg
                      className="w-7 h-7 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {/* Categories */}

            {/* YouTube Video */}
            {product.youtube && (
              <div className="">
                <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                  <PlayCircleOutlined className="text-xl" />
                  Product Video
                </h3>
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={product.youtube
                      .replace("youtu.be/", "youtube.com/embed/")
                      .replace("watch?v=", "embed/")}
                    title="Product video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Image Gallery */}
          <div className="order-1 lg:order-2">
            <div className="bg-white overflow-hidden sticky top-24">
              {/* Main Image */}
              <div
                className="bg-white p-8 mb-4 border border-gray-200 overflow-hidden relative cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <img
                  src={product.image[selectedImage] || "/images/product.jpg"}
                  alt={product.name}
                  className="w-full h-auto object-contain max-h-[500px] mx-auto"
                  style={{
                    transform: isZoomed ? "scale(2)" : "scale(1)",
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transition: isZoomed ? "none" : "transform 0.3s ease",
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              {product.image && product.image.length > 1 && (
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {product.image.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`bg-white p-2 border-2 transition-all hover:border-primary cursor-pointer aspect-square overflow-hidden ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {product.dokument && product.dokument.length > 0 && (
                <div className="mt-6 p-6 bg-[#f0f2fb]">
                  <h3 className="text-primary font-semibold mb-3 flex items-center gap-2">
                    Dokumen:
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {product.dokument.map((doc, index) => (
                      <a
                        key={index}
                        href={doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-secondary hover:text-primary transition-colors text-base font-semibold uppercase rounded"
                      >
                        <DownloadOutlined />
                        {doc.includes("MSDS")
                          ? "MSDS"
                          : doc.includes("TDS") || doc.includes("Technical")
                          ? "TDS"
                          : `Document ${index + 1}`}
                      </a>
                    ))}
                  </div>
                  
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Latest Products Section */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-5xl sm:text-6xl font-bold text-primary mb-2">
              Related Products
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {latestProducts.slice(0, 8).map((item) => (
              <Link href={`/product/${item.id}`} key={item.id}>
                <div className="flex flex-col items-center h-full">
                  {/* Square image area with light background */}
                  <div className="w-full bg-[#f0f2fb] aspect-square flex items-center justify-center transition-transform duration-300 hover:translate-y-[-6px]">
                    <img
                      src={item.image?.[0] || "/images/product.jpg"}
                      alt={item.name}
                      className="max-h-[70%] w-full aspect-square object-contain"
                    />
                  </div>
                  {/* Title - clamp to 2 lines */}
                  <h4 className="text-lg lg:text-xl font-bold my-6 text-center uppercase leading-tight min-h-[3.5rem] line-clamp-2 flex items-center justify-center">
                    {item.name}
                  </h4>
                  {/* Button */}
                  <button className="w-full bg-primary text-white font-extrabold h-[70px] text-base tracking-wide uppercase flex items-center justify-between px-6 hover:bg-secondary hover:text-primary transition-colors cursor-pointer mt-auto">
                    <span>LEBIH DETAIL</span>
                    <span className="text-2xl">→</span>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        
      </div>
    </div>
  );
}
