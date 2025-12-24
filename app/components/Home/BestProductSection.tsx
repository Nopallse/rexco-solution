"use client";

import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import { listBestSellerProducts, ProductDto } from "@/app/lib/product-client";
import { getImageUrl } from "@/app/lib/image-utils";

export default function BestProductSection() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await listBestSellerProducts();
        setProducts(data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4  decoration-2 underline-offset-4">
            REXCO'S BEST PRODUCTS
          </h2>
          <hr className="mb-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products && products.length > 0 ? products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col h-full bg-[#aaaaaa] p-6 border-b-8 "
              style={{ borderColor: product.color || "#323288" }}
            >
              <div className="grid grid-cols-3 gap-6 h-full">
                {/* 2nd and 3rd columns: Text */}
                <div className="col-span-3 sm:col-span-2 relative mb-4 flex flex-col justify-end px-4 h-full ">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {product.name}
                  </h3>
                    <div className="grid grid-cols-1 gap-4">
                    {product.productFeature
                      ?.sort((a, b) => a.order - b.order)
                      .map((feature, index) => (
                      <div key={index} className="flex items-center">
                        {feature.icon && (
                        <img
                          src={getImageUrl(feature.icon)}
                          alt={feature.text}
                          className="w-10 h-10 object-contain mr-2"
                        />
                        )}
                        <p className="text-md font-semibold leading-relaxed my-auto">
                        {feature.text}
                        </p>
                      </div>
                      ))}
                    </div>
                  <div className="mt-auto pt-4 animate-slide-up">
                    <Link href={`/product/${product.slug}`}>
                      <Button
                        type="primary"
                        size="large"
                        className="!bg-[#323288] hover:!bg-[#2d1e4e] !border-none  !px-8 !h-auto !py-2 !text-base font-bold tracking-wider "
                      >
                        LEARN MORE
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* 1st column: Image */}
                <div className="col-span-1 mb-4 flex items-center justify-center h-auto hidden sm:block">
                  <img
                    src={getImageUrl(product.primaryImage)}
                    alt={product.name}
                    className="w-auto max-w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-2 text-center py-10">
              <p className="text-gray-500">No products available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
