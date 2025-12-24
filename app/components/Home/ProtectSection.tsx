"use client";

import React, { useEffect } from "react";
import { Button } from "antd";

export default function ProtectSection() {
  useEffect(() => {
    // Dynamically import and register the image-compare web component
    const loadImageCompare = () => {
      if (typeof window === 'undefined') return;
      import('@cloudfour/image-compare').catch((error) => {
        console.error('Failed to load image-compare:', error);
      });
    };
    
    loadImageCompare();
  }, []);

  return (
    <div className="container mx-auto max-w-full bg-primary">
      <div className="bg-primary">
        <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch py-8 lg:py-12">
            {/* Left Section - Product Info */}
            <div className="flex flex-col justify-center">
              {/* Title - Centered */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight uppercase">
                PROTECT YOUR ENGINE FROM RUST
              </h2>
              <p className="text-[#f0f2fb] font-semibold text-sm sm:text-base lg:text-lg leading-relaxed mb-6 lg:mb-8">
                Rexco 50 Multipurpose Lubricant is designed for a wide range of
                applications, protecting metal from rust and corrosion. With its
                fast penetration, this product easily loosens rusted nuts and
                bolts.
              </p>
              <Button
                type="primary"
                size="large"
                className="!inline-flex !items-center !w-auto !self-start !px-6 sm:!px-8 lg:!px-10 !py-3 sm:!py-4 lg:!py-6 !border-white !text-white !font-bold !text-sm sm:!text-base lg:!text-lg !transition-colors !duration-200 hover:!bg-secondary hover:!text-primary focus:!outline-none focus:!ring-2 focus:!ring-white"
                href="#"
              >
                LEARN MORE
                <span className="ml-2 sm:ml-4 text-lg sm:text-xl lg:text-2xl">&#8594;</span>
              </Button>
            </div>

            {/* Right Section - Image Comparison */}
            <div className="relative w-full h-full min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] overflow-hidden cursor-col-resize">
              <image-compare class="rexco-compare" label-text="Compare rusted vs. clean gear">
              <img
                slot="image-1"
                alt="Other Brands - Rusted Gear"
                src="/images/protect/rust-gear-scaled.webp"
              />
              <img
                slot="image-2"
                alt="Rexco - Clean Gear"
                src="/images/protect/clean-gear-scaled.webp"
              />
              </image-compare>

              {/* Overlay Labels */}
              <div className="pointer-events-none absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/70 text-white font-extrabold uppercase tracking-wide px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm lg:text-xl">
              Other Brands
              </div>
              <div className="pointer-events-none absolute top-2 sm:top-4 right-2 sm:right-4 bg-primary text-white font-extrabold uppercase tracking-wide px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm lg:text-xl">
              REXCO
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
