"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, Spin } from "antd";
import { DownloadOutlined, PlayCircleOutlined } from "@ant-design/icons";
import {
  getProductBySlug,
  listProducts,
  type ProductDto,
} from "@/app/lib/product-client";
import { getImageUrl, getFileUrl } from "@/app/lib/image-utils";
import { forceWrapHtml } from "@/app/lib/forceWrapHtml";

const STORE_ICON: Record<string, string> = {
  Tokopedia: "/images/icon/tokopedia_icon.png",
  Shopee: "/images/icon/shopee_icon.png",
};

export default function ProductDetailBySlugPage() {
  const params = useParams();
  const slug = String(params.slug || "");

  const [product, setProduct] = useState<ProductDto | null>(null);
  const [related, setRelated] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let active = true;
    const run = async () => {
      setLoading(true);
      try {
        const [detail, all] = await Promise.all([
          getProductBySlug(slug),
          listProducts().catch(() => []),
        ]);
        if (!active) return;
        setProduct(detail);
        setRelated(all.filter((p) => p.slug !== detail.slug).slice(0, 8));
      } catch (e) {
        console.error("Failed to load product by slug", e);
        setProduct(null);
        setRelated([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    if (slug) run();
    return () => {
      active = false;
    };
  }, [slug]);

  const safeDescription = useMemo(() => {
    if (typeof product?.description !== "string") return "";
    return forceWrapHtml(product.description);
  }, [product?.description]);

  const images: string[] = useMemo(() => {
    const arr: string[] = [];
    if (product?.primaryImage) arr.push(getImageUrl(product.primaryImage));
    if (product?.productImage?.length)
      arr.push(...product.productImage.map((i) => getImageUrl(i.url)));
    return arr.length ? arr : ["/images/product.jpg"];
  }, [product]);

  const documents = product?.productDocument?.filter((d) => !!d.file) ?? [];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  if (loading) {
    return (
      <div className="bg-white py-20">
        <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white py-20">
        <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
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

  const variantNames =
    product.productStore?.map((v) => v.name).filter(Boolean) ?? [];
  const selectedStores =
    product.productStore?.[selectedVariant]?.productStore ?? [];

  return (
    <div className="bg-white py-8 sm:py-12 lg:py-20">
      <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
        {/* Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
          {/* Left Column - Info */}
          <div className="order-2 lg:order-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-primary mb-4 sm:mb-6 lg:mb-8 uppercase leading-tight">
              {product.name}
            </h1>

            {/* Description */}
            <div className="mb-6 max-h-60 overflow-y-auto pr-2">
              <div
                className="text-gray-700 text-sm sm:text-base leading-relaxed"
                style={{
                  whiteSpace: "normal",
                  wordBreak: "normal",
                  overflowWrap: "normal",
                }}
                dangerouslySetInnerHTML={{
                  __html: safeDescription,
                }}
              />
            </div>

            {/* Beli Melalui (Variants + Stores) */}
            {variantNames.length > 0 && (
              <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-[#f0f2fb]">
                <h3 className="text-sm sm:text-base font-semibold text-primary mb-3">
                  Beli melalui:
                </h3>
                {/* Variants */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                  {variantNames.map((v, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedVariant(index)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base uppercase transition-colors ${
                        selectedVariant === index
                          ? "bg-primary text-secondary"
                          : "bg-secondary text-primary hover:bg-primary hover:text-secondary"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                {/* Marketplace Icons */}
                <div className="flex gap-2 sm:gap-3">
                  {selectedStores.length > 0 ? (
                    selectedStores.map((s, i) => (
                      <a
                        key={`${s.name}-${i}`}
                        href={s.urlStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                        title={s.name}
                        style={{
                          borderRadius: "100%",
                          backgroundColor: "#fff",
                        }}
                      >
                        <img
                          src={
                            STORE_ICON[s.name] ||
                            "/images/icon/tokopedia_icon.png"
                          }
                          alt={s.name}
                          className="w-5 h-5 sm:w-7 sm:h-7 object-contain"
                        />
                      </a>
                    ))
                  ) : (
                    // Fallback: show common marketplaces disabled
                    <div className="opacity-60 flex gap-2 sm:gap-3">
                      {Object.values(STORE_ICON)
                        .slice(0, 2)
                        .map((src, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center"
                            style={{ borderRadius: "100%" }}
                          >
                            <img
                              src={src}
                              alt="Store"
                              className="w-5 h-5 sm:w-7 sm:h-7 object-contain"
                            />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* YouTube Video */}
            {product.urlYoutube && (
              <div className="mt-4 sm:mt-6">
                <h3 className="text-base sm:text-lg font-bold text-primary mb-3 flex items-center gap-2">
                  <PlayCircleOutlined className="text-xl" />
                  Product Video
                </h3>
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={product.urlYoutube
                      .replace("youtu.be/", "youtube.com/embed/")
                      .replace("watch?v=", "embed/")}
                    title="Product video"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Image Gallery */}
          <div className="order-1 lg:order-2">
            <div className="bg-white overflow-hidden lg:sticky lg:top-24">
              {/* Main Image */}
              <div
                className="bg-white p-4 sm:p-6 lg:p-8 mb-4 border border-gray-200 overflow-hidden relative cursor-zoom-in"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] mx-auto"
                  style={{
                    transform: isZoomed ? "scale(2)" : "scale(1)",
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transition: isZoomed ? "none" : "transform 0.3s ease",
                  }}
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
                  {images.map((img, index) => (
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
              {documents.length > 0 && (
                <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-[#f0f2fb]">
                  <h3 className="text-sm sm:text-base text-primary font-semibold mb-3 flex items-center gap-2">
                    Dokumen:
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                    {documents.map((doc, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          window.open(getFileUrl(doc.file!), "_blank")
                        }
                        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary text-white hover:bg-secondary hover:text-primary transition-colors text-sm sm:text-base font-semibold uppercase rounded cursor-pointer"
                      >
                        <DownloadOutlined />
                        {doc.type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-2">
              Related Products
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {related.map((item) => (
              <Link href={`/product/${item.slug}`} key={item.id}>
                <div className="flex flex-col items-center h-full">
                  <div className="w-full bg-[#f0f2fb] aspect-square flex items-center justify-center transition-transform duration-300 hover:translate-y-[-6px]">
                    <img
                      src={
                        item.primaryImage
                          ? getImageUrl(item.primaryImage)
                          : item.productImage?.[0]?.url
                            ? getImageUrl(item.productImage[0].url)
                            : "/images/product.jpg"
                      }
                      alt={item.name}
                      className="max-h-[70%] w-full aspect-square object-contain"
                    />
                  </div>
                  <h4 className="text-black text-sm sm:text-base lg:text-lg font-bold my-3 sm:my-4 lg:my-6 text-center uppercase leading-tight min-h-[2.5rem] sm:min-h-[3rem] lg:min-h-[3.5rem] line-clamp-2 flex items-center justify-center">
                    {item.name}
                  </h4>
                  <button className="w-full bg-primary text-white font-extrabold h-[50px] sm:h-[60px] lg:h-[70px] text-xs sm:text-sm lg:text-base tracking-wide uppercase flex items-center justify-between px-3 sm:px-4 lg:px-6 hover:bg-secondary hover:text-primary transition-colors cursor-pointer mt-auto">
                    <span>LEBIH DETAIL</span>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 sm:w-5 sm:h-5"
                      viewBox="0 0 448 512"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
                    </svg>
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
