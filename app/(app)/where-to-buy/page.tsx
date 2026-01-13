"use client";

import React, { useState } from "react";
import { useLanguage } from '@/app/providers/LanguageProvider';

type Marketplace = {
  name: string;
  url: string;
  logo?: string;
  textColor?: string;
  bgColor?: string;
};

type Country = {
  id: string;
  name: string;
  mapImage: string;
};

const countries: Country[] = [
  {
    id: "indonesia",
    name: "Indonesia",
    mapImage: "/images/buy/indonesia.webp",
  },
  { id: "malaysia", name: "Malaysia", mapImage: "/images/buy/malaysia.webp" },
  { id: "vietnam", name: "Vietnamese", mapImage: "/images/buy/vietnam.webp" },
  { id: "thailand", name: "Thailand", mapImage: "/images/buy/thailand.webp" },
  {
    id: "philippines",
    name: "Philippines",
    mapImage: "/images/buy/philippines.webp",
  },
];

const marketplaces: Marketplace[] = [
  {
    name: "Tokopedia",
    url: "https://www.tokopedia.com/rexcoofficial",
    logo: "/images/icon/tokopedia.png",
  },
  {
    name: "Shopee",
    url: "https://shopee.co.id/rexcoofficial",
    logo: "/images/icon/shopee.png",
  },
  {
    name: "TikTok Shop",
    url: "https://www.tiktok.com/shop/rexco-official-store-official",
    logo: "/images/icon/tiktok_shop.png",
  },
  {
    name: "Lazada",
    url: "https://www.lazada.co.id/",
    logo: "/images/icon/lazada.png",
  },
  {
    name: "Monotaro",
    url: "https://www.monotaro.id/shopbybrand/brand?brand=rexco",
    logo: "/images/icon/monotaro.jpg",
  },

  {
    name: "Fixcomart",
    url: "https://fixcomart.com/",
    logo: "/images/icon/fixcomart.jpg",
  },
  {
    name: "Indoteknik",
    url: "https://indoteknik.com/",
    logo: "/images/icon/indoteknik.webp",
  },
  {
    name: "Blibli",
    url: "https://www.blibli.com/",
    logo: "/images/icon/blibli.jpg",
  },
];

const modernMarkets: Marketplace[] = [
  {
    name: "Mr. DIY",
    url: "https://www.mrdiy.com/",
    logo: "/images/icon/mrdiy.png",
  },
  {
    name: "Mitra10",
    url: "https://www.mitra10.co.id/",
    logo: "/images/icon/mitra10.png",
  },
  {
    name: "Depo Bangunan",
    url: "https://www.depobangunan.com/",
    logo: "/images/icon/depo-bangunan.png",
  },
];

const WhereToBuyPage = () => {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string>("indonesia");

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-8 lg:px-16">
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-primary text-left mb-8">
          {t.pages?.where_to_buy?.title || 'WHERE TO BUY'}
        </h1>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-8">
          {/* Left Side: Map + Store Information */}
          <div className="flex flex-col gap-2">
            {/* Map */}
            <div className="flex flex-wrap gap-2 ">
              {countries.map((country) => (
                <button
                  key={country.id}
                  onClick={() => setSelectedCountry(country.id)}
                  className={`px-6 py-3 font-semibold text-base sm:text-lg transition-colors cursor-pointer ${
                    selectedCountry === country.id
                      ? "bg-primary text-secondary"
                      : "bg-secondary text-primary hover:bg-primary hover:text-secondary"
                  }`}
                >
                  {country.name}
                </button>
              ))}
            </div>
            <div className="bg-[#cecece] overflow-hidden p-4">
              <img
                src={countries.find((c) => c.id === selectedCountry)?.mapImage}
                alt={`${selectedCountry} map`}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>

            {/* Store Information */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                {t.pages?.where_to_buy?.store_info_title || 'Available at your nearest engineering store:'}
              </h2>
              <ul className="text-base sm:text-lg text-gray-700 space-y-2">
                <li>{t.pages?.where_to_buy?.building_materials || 'Building Materials Store'}</li>
                <li>{t.pages?.where_to_buy?.engineering_tool || 'Engineering Tool Store,'}</li>
                <li>{t.pages?.where_to_buy?.automotive || 'Automotive Workshop,'}</li>
                <li>{t.pages?.where_to_buy?.electronics || 'Electronics Store'}</li>
                <li>{t.pages?.where_to_buy?.tool_center || 'Tool Business Center (ITC Glodok, Kenari Market)'}</li>
              </ul>
            </div>
          </div>

          {/* Right Side: Online Stores + Modern Market */}
          <div className="flex flex-col gap-8">
            {/* Online Stores Section */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                {t.pages?.where_to_buy?.online_store_title || 'OFFICIAL ONLINE STORE'}
              </h2>
              <p className="text-lg text-primary mb-6">{t.pages?.where_to_buy?.available_at || 'We are available at'}</p>

              <div className="grid grid-cols-4 gap-4">
                {marketplaces.map((item, idx) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-full flex items-center justify-center ${
                      idx === 4 || idx === 6 ? "col-span-3" : ""
                    }`}
                  >
                    <div
                      className={`h-full flex items-center justify-center  transition-all duration-200 ${
                        idx === 5 || idx === 7 ? "scale-150" : ""
                      }`}
                    >
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={`${item.name} logo`}
                          className={`h-14 w-auto object-contain px-3 ${
                            idx === 5 || idx === 7 ? "h-20" : ""
                          }`}
                          style={{
                            height: idx === 5 || idx === 7 ? "80px" : "56px",
                            width: "auto",
                          }}
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-lg font-semibold text-primary">
                          {item.name}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Modern Market Section */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
              {t.pages?.where_to_buy?.modern_market_title || 'MODERN MARKET'}
              </h2>

              <div className="grid grid-cols-3 gap-4">
              {modernMarkets.map((item) => (
                <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-center"
                >
                <div className="w-full flex items-center justify-center rounded-xl bg-white transition-all duration-200">
                  {item.logo ? (
                  <img
                    src={item.logo}
                    alt={`${item.name} logo`}
                    className="h-14 sm:h-16 w-auto object-contain px-4"
                    style={{ height: "56px", width: "auto" }}
                    loading="lazy"
                  />
                  ) : (
                  <span className="text-lg font-semibold text-primary">
                    {item.name}
                  </span>
                  )}
                </div>
                </a>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhereToBuyPage;
