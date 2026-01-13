'use client';

import React from 'react';
import { Carousel } from 'antd';
import { useLanguage } from '@/app/providers/LanguageProvider';

export default function HeroSection() {
  const { t } = useLanguage();
  const bannerImages = [
    '/images/banner/1.jpg',
    '/images/banner/2.jpg',
    '/images/banner/3.jpg',
    '/images/banner/4.jpg',
  ];

  return (
    <div className="w-full">
      <Carousel
        autoplay
        autoplaySpeed={5000}
        className="w-full"
      >
        {bannerImages.map((image, index) => (
            <div key={index} className="w-full h-96 sm:h-[500px] lg:h-[600px]">
            <img
              src={image}
              alt={`${t.home?.hero?.alt || 'Banner'} ${index + 1}`}
              className="w-full h-full object-cover"
            />
            </div>
        ))}
      </Carousel>
    </div>
  );
}
