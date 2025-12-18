"use client";

import { Button } from "antd";

const categories = [
  {
    id: 1,
    image: "/images/product/1.webp",
    title: "REXCO 50 MULTI PURPOSE LUBRICANT",
    link: "/category/power-tools",
    color: "#ffcd05",
    features: [
      "Eliminate Squeaking Noise",
      "Anti-rust",
      "Cleaning Oil, Asphalt & Dust",
      "Fast Penetration",
    ],
    featureIcons: [
      "/images/product/product-1-icon-1.webp",
      "/images/product/product-1-icon-2.webp",
      "/images/product/product-1-icon-3.webp",
      "/images/product/product-1-icon-4.webp",
    ],
  },
  {
    id: 2,
    image: "/images/product/2.webp",
    title: "REXCO 18 Contact Cleaner",
    link: "/category/engine",
    color: "#eb2227",
    features: [
      "Cleaning Electrical Components",
      "Quick Dry",
      "Does not conduct electricity",
      "Inhibits Corrosion",
    ],
    featureIcons: [
      "/images/product/product-1-icon-1.webp",
      "/images/product/product-1-icon-2.webp",
      "/images/product/product-1-icon-3.webp",
      "/images/product/product-1-icon-4.webp",
    ],
  },
  {
    id: 3,
    image: "/images/product/3.webp",
    title: "REXCO 70 MULTI PURPOSE DEGRERASER",
    link: "/category/welding",
    color: "#96979b",
    features: [
      "Remove Stains",
      "Protecting Metal Surfaces",
      "Removes Oil, Dirt & Grease",
      "Leaves No Residue",
    ],
    featureIcons: [
      "/images/product/product-1-icon-1.webp",
      "/images/product/product-1-icon-2.webp",
      "/images/product/product-1-icon-3.webp",
      "/images/product/product-1-icon-4.webp",
    ],
  },
  {
    id: 4,
    image: "/images/product/4.webp",
    title: "REXCO 81 CARB & INJECTOR CLEANER",
    link: "/category/accessories",
    color: "#5cb9e8",
    features: [
      "Removes Dirt, Carbon, Varnish & Gum",
      "Anti-Corrosion",
      "Reducing Gas Emissions",
      "Fast Penetration",
    ],
    featureIcons: [
      "/images/product/product-1-icon-1.webp",
      "/images/product/product-1-icon-2.webp",
      "/images/product/product-1-icon-3.webp",
      "/images/product/product-1-icon-4.webp",
    ],
  },
  {
    id: 5,
    image: "/images/product/5.webp",
    title: "REXCO 60 HIGH TEMP MULTI PURPOSE LITHIUM GREASE CARTRIDGE",
    link: "/category/power-tools",
    color: "#f3dcaf",
    features: [
      "For heavy duty applications, with anti-wear additives",
      "Waterproof, Works Well in Wet Conditions",
      "Operating Temperature Up to 500°F",
      "Suitable for Various Engine & Vehicle Components",
    ],
    featureIcons: [
      "/images/product/product-1-icon-1.webp",
      "/images/product/product-1-icon-2.webp",
      "/images/product/product-1-icon-3.webp",
      "/images/product/product-1-icon-4.webp",
    ],
  },
  {
    id: 6,
    image: "/images/product/6.webp",
    title: "REXCO 25 CHAIN ​​LUBE",
    link: "/category/engine",
    color: "#27b14b",
    features: [
      "Lubricating the Chain",
      "Extending Chain Life",
      "Maintaining Chain Performance",
      "Protecting Chains From Rust",
    ],
    featureIcons: [
      "/images/product/product-1-icon-1.webp",
      "/images/product/product-1-icon-2.webp",
      "/images/product/product-1-icon-3.webp",
      "/images/product/product-1-icon-4.webp",
    ],
  },
  {
    id: 7,
    image: "/images/product/7.webp",
    title: "REXCO 20 ULTIMATE HAND CLEANER",
    link: "/category/welding",
    color: "#f99b22",
    features: [
      "Removes Oil, Grease, Oil & Glue",
      "One Rinse",
      "Does Not Contain Harsh Solvents",
      "Contains Moisturizer & Antibacterial",
    ],
    featureIcons: [
      "/images/product/product-1-icon-1.webp",
      "/images/product/product-1-icon-2.webp",
      "/images/product/product-1-icon-3.webp",
      "/images/product/product-1-icon-4.webp",
    ],
  },
  {
    id: 8,
    image: "/images/product/8.webp",
    title: "REXCO 82 SPARE PARTS & BRAKE CLEANER",
    link: "/category/accessories",
    color: "#a6d0ee",
    features: [
      "Cleaning sand, carbon, oil and asphalt residue from the braking system",
      "Extending Chain Life",
      "Maintaining Industrial Spare Parts",
      "Improving Braking System Performance",
    ],
    featureIcons: [
      "/images/product/product-1-icon-1.webp",
      "/images/product/product-1-icon-2.webp",
      "/images/product/product-1-icon-3.webp",
      "/images/product/product-1-icon-4.webp",
    ],
  },
];

export default function BestProductSection() {
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
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col h-full bg-[#aaaaaa] p-6 border-b-8 "
              style={{ borderColor: category.color }}
            >
              <div className="grid grid-cols-3 gap-6 h-full">
                {/* 2nd and 3rd columns: Text */}
                <div className="col-span-3 sm:col-span-2 relative mb-4 flex flex-col justify-end px-4 h-full ">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {category.title}
                  </h3>
                  <div className="flex flex-row flex-wrap ">
                    {category.features.map((feature, index) => (
                      <div key={index} className="flex items-center mr-4 mb-2">
                        <img
                          src={category.featureIcons[index]}
                          alt={feature}
                          className="w-10 h-10 object-contain mr-2"
                        />
                        <p className="text-md font-semibold leading-relaxed my-auto">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 animate-slide-up">
                    <Button
                      type="primary"
                      size="large"
                      className="!bg-[#323288] hover:!bg-[#2d1e4e] !border-none  !px-8 !h-auto !py-2 !text-base font-bold tracking-wider "
                    >
                      LEARN MORE
                    </Button>
                  </div>
                </div>

                {/* 1st column: Image */}
                <div className="col-span-1 mb-4 flex items-center justify-center h-auto hidden sm:block">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-auto max-w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
