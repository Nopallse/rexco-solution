"use client";

import { Button } from "antd";

const tips = [
  {
    id: 1,
    image: "/images/tips/1.webp",
    title: "AUTOMOTIVE",
    description:"Maximize your chain's efficiency with our High-Performance Chain Lube. Designed to lubricate and reduce wear, this product extends chain and sprocket life while maintaining optimal performance under high loads and temperatures. This advanced formula offers 2x higher viscosity, 3x more effective lubrication, and 2x better dust resistance."
  },
  {
    id: 2,
    image: "/images/tips/2.webp",
    title: "INDUSTRIAL",
    description:"REXCO 70 Multi-Purpose Degreaser is an essential cleaning solution for the automotive and industrial sectors. It's designed to effectively remove oil, dirt, and grease from motorcycle and car engines, as well as industrial equipment and machinery. This versatile cleaner ensures optimal performance by removing buildup that can hinder operation."
  },
  {
    id: 3,
    image: "/images/tips/3.webp",
    title: "HOBBY",
    description:"REXCO 70 Multi-Purpose Degreaser is an invaluable cleaning solution for hobbyists who enjoy projects, whether restoring classic cars, maintaining motorcycles, or even tinkering with tools and equipment at home. This versatile cleaner effectively removes oil, dirt, and grease buildup, ensuring your tools and surfaces stay in tip-top condition."
  },
];

export default function TipsSection() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
        <div className="mb-16">
          <h2 className="text-center sm:text-left text-3xl lg:text-4xl font-bold text-primary mb-4  decoration-2 underline-offset-4">
            TIPS FOR MAINTAINING AND CARE USING REXCO
          </h2>
                    <hr className="mb-8" />

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {tips.map((tips) => (
            <div
              key={tips.id}
              className="flex flex-col h-full bg-[#c4c4c4] rounded-lg overflow-hidden"
            >
              <img
              src={tips.image}
              alt={tips.title}
              className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover mb-3"
              />

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-3 px-4 sm:px-6 md:px-8 mt-4">
              {tips.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base font-semibold px-4 sm:px-6 md:px-8 mt-4 mb-8">
              {tips.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
