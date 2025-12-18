"use client";

import { useState } from "react";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("instagram");

  const instagram = [
    {
      imageUrl: "/images/instagram/1.jpg",
      title: "IN INDUSTRIAL ENVIRONMENTS, MACHINES MUST ALWAYS BE READY TO...",
      link: "https://www.instagram.com/reel/DSUoQm-gaB2",
    },
    {
      imageUrl: "/images/instagram/2.jpg",
      title: "Gallery Image 2",
    },
    {
      imageUrl: "/images/instagram/3.jpg",
      title: "Gallery Image 3",
    },
    {
      imageUrl: "/images/instagram/4.jpg",
      title: "Gallery Image 4",
    },
    {
      imageUrl: "/images/instagram/5.jpg",
      title: "Gallery Image 5",
    },
    {
      imageUrl: "/images/instagram/6.jpg",
      title: "Gallery Image 6",
    },
    {
      imageUrl: "/images/instagram/7.jpg",
      title: "Gallery Image 7",
    },
    {
      imageUrl: "/images/instagram/8.jpg",
      title: "Gallery Image 8",
    },
  ];

  const gallery = [
    {
      imageUrl: "/images/gallery/1.jpg",
      title: "Gallery Image 1",
      link: "https://www.instagram.com/reel/DSUoQm-gaB2",
    },
    {
      imageUrl: "/images/gallery/2.jpg",
      title: "Gallery Image 2",
    },
    {
      imageUrl: "/images/gallery/3.jpg",
      title: "Gallery Image 3",
    },
    {
      imageUrl: "/images/gallery/4.jpg",
      title: "Gallery Image 4",
    },
    {
      imageUrl: "/images/gallery/5.jpg",
      title: "Gallery Image 5",
    },
    {
      imageUrl: "/images/gallery/6.jpg",
      title: "Gallery Image 6",
    },
    {
      imageUrl: "/images/gallery/7.jpg",
      title: "Gallery Image 7",
    },
    {
      imageUrl: "/images/gallery/8.jpg",
      title: "Gallery Image 8",
    },
    {
      imageUrl: "/images/gallery/9.jpg",
      title: "Gallery Image 9",
    },
  ];

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
        <div className="mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-blue-900 mb-4">
            Gallery
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-3 ">
          <button
            onClick={() => setActiveTab("instagram")}
            className={`px-6 py-3 font-semibold text-lg transition-colors cursor-pointer hover:bg-primary hover:text-secondary  ${
              activeTab === "instagram"
                ? "bg-primary text-secondary"
                : "bg-secondary text-primary"
            }`}
          >
            Instagram
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-6 py-3 font-semibold text-lg transition-colors cursor-pointer hover:bg-primary hover:text-secondary ${
              activeTab === "gallery"
                ? "bg-primary text-secondary"
                : "bg-secondary text-primary"
            }`}
          >
            Web Gallery
          </button>
        </div>

        {/* Instagram Grid - 4 columns */}
        {activeTab === "instagram" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {instagram.map((item, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden group cursor-pointer rounded-lg"
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-96 object-cover transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-secondary bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-lg font-semibold text-center items-center px-6 line-clamp-5">
                        {item.title}
                      </span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
            <a
              href="https://www.instagram.com/rexco.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary font-extrabold text-primary text-sm transition-colors cursor-pointer hover:bg-primary hover:text-secondary rounded-lg shadow"
            >
              <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
              VISIT OUR INSTAGRAM
            </a>
            </div>
          </div>
        )}

        {/* Web Gallery - Bento Grid */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {gallery.map((item, index) => {
              // Pola untuk membuat variasi ukuran bento
              const isLarge = index % 7 === 0; // Setiap item ke-7 jadi besar
              const isTall = index % 5 === 2; // Setiap item posisi tertentu jadi tinggi
              const isWide = index % 6 === 1; // Setiap item posisi tertentu jadi lebar

              let gridClass = "";
              if (isLarge) {
                gridClass = "col-span-2 row-span-2";
              } else if (isTall) {
                gridClass = "row-span-2";
              } else if (isWide) {
                gridClass = "col-span-2";
              }

              return (
                <div
                  key={index}
                  className={`overflow-hidden group cursor-pointer rounded-lg ${gridClass}`}
                >
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </a>
                  ) : (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
