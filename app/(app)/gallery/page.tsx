"use client";

import { useEffect, useState } from "react";
import { listInstagram, type InstagramDto } from "@/app/lib/instagram-client";
import { listGallery, type GalleryDto } from "@/app/lib/gallery-client";
import { getImageUrl } from "@/app/lib/image-utils";
import { useLanguage } from '@/app/providers/LanguageProvider';

export default function GalleryPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("instagram");
  const [instagramItems, setInstagramItems] = useState<InstagramDto[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      try {
        const [ig, gal] = await Promise.all([
          listInstagram().catch(() => []),
          listGallery().catch(() => []),
        ]);
        if (!cancelled) {
          setInstagramItems(ig || []);
          setGalleryItems(gal || []);
        }
      } catch (e) {
        console.error("Failed to load gallery data", e);
        if (!cancelled) {
          setInstagramItems([]);
          setGalleryItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-white py-8 sm:py-12 lg:py-20">
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-8 lg:px-16">
          <div className="text-primary">{t.pages?.gallery?.loading || 'Memuat galeri…'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8 sm:py-12 lg:py-20">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-8 lg:px-16">
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-blue-900 mb-4">
            {t.pages?.gallery?.title || 'Gallery'}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
          <button
            onClick={() => setActiveTab("instagram")}
            className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold text-sm sm:text-base lg:text-lg transition-colors cursor-pointer hover:bg-primary hover:text-secondary  ${
              activeTab === "instagram"
                ? "bg-primary text-secondary"
                : "bg-secondary text-primary"
            }`}
          >
            {t.pages?.gallery?.instagram || 'Instagram'}
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold text-sm sm:text-base lg:text-lg transition-colors cursor-pointer hover:bg-primary hover:text-secondary ${
              activeTab === "gallery"
                ? "bg-primary text-secondary"
                : "bg-secondary text-primary"
            }`}
          >
            {t.pages?.gallery?.web_gallery || 'Web Gallery'}
          </button>
        </div>

        {/* Instagram Grid - 4 columns */}
        {activeTab === "instagram" && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {(instagramItems.length ? instagramItems : []).map(
                (item, index) => {
                  const imageSrc = getImageUrl(item.image);
                  const href = item.link || "#";
                  return (
                    <div
                      key={index}
                      className="relative overflow-hidden group cursor-pointer rounded-lg aspect-[4/5]"
                    >
                      <a
                        href={href}
                        target={item.link ? "_blank" : undefined}
                        rel={item.link ? "noopener noreferrer" : undefined}
                        className="block w-full h-full"
                      >
                        <img
                          src={imageSrc}
                          alt={item.title || "Instagram"}
                          className="w-full h-full object-cover transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-secondary bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-center items-center px-4 sm:px-6 line-clamp-5">
                            {item.title || "Instagram"}
                          </span>
                        </div>
                      </a>
                    </div>
                  );
                }
              )}
            </div>
            <div className="flex justify-center mt-6 sm:mt-8">
                <a
                href="https://www.instagram.com/rexco.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 !bg-secondary font-extrabold !text-primary text-xs sm:text-sm md:text-base transition-colors cursor-pointer hover:!bg-primary hover:!text-secondary rounded-lg shadow"
                >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                </svg>
                {t.pages?.gallery?.visit_instagram || 'VISIT OUR INSTAGRAM'}
                </a>
            </div>
          </div>
        )}

        {/* Web Gallery - Bento Grid */}
        {activeTab === "gallery" && (
          <div className="columns-1 sm:columns-2 gap-4 sm:gap-6 lg:gap-8">
            {(galleryItems.length ? galleryItems : []).map((item, index) => {
              const imageSrc = getImageUrl(item.image);
              const content = (
                <div className="relative mb-4 sm:mb-6 lg:mb-8 break-inside-avoid overflow-hidden rounded-lg group">
                  <img
                    src={imageSrc}
                    alt={item.title || "Gallery"}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm sm:text-base font-semibold leading-snug line-clamp-2">
                      {item.title || "Gallery"}
                    </p>
                  </div>
                </div>
              );

              return item.link ? (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  {content}
                </a>
              ) : (
                <div key={index} className="block w-full">
                  {content}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
