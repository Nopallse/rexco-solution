'use client';

import React from 'react';
import { Carousel } from 'antd';

export default function HeroSection() {
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
          <div key={index} className="w-full h-48 sm:h-80 lg:h-96">
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
