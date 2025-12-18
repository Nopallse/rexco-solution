"use client";

import React from "react";
import Link from "next/link";

const articles = [
  {
    id: 1,
    image: "/images/article.jpg",
    title: "Power Tools Andal untuk Pekerjaan dan Kebutuhan Sehari-hari – RYU",
    description:
      "Temukan berbagai macam power tools berkualitas tinggi dari RYU yang dirancang untuk memenuhi kebutuhan konstruksi, bengkel, dan proyek DIY Anda.",
    category: "News",
    date: "22 October 2025",
  },
  {
    id: 2,
    image: "/images/article.jpg",
    title:
      "RYU Power Tools: Solusi Andal & Terjangkau untuk Konstruksi, Bengkel, dan DIY",
    description:
      "RYU Power Tools menawarkan solusi andal dan terjangkau untuk berbagai kebutuhan konstruksi, bengkel, dan proyek DIY Anda.",
    category: "News",
    date: "25 September 2025",
  },
  {
    id: 3,
    image: "/images/article.jpg",
    title: "Gathering dan Seminar Welding RYU Power Tools",
    description:
      "RYU Power Tools mengadakan acara gathering dan seminar welding untuk mempererat hubungan dengan pelanggan dan memberikan edukasi tentang produk-produk unggulan kami.",
    category: "News",
    date: "4 September 2025",
  },
  {
    id: 4,
    image: "/images/article.jpg",
    title:
      "Hadir di GIIAS 2024, Ryu Powertools Deretan Perkakas Otomotif Terbaiknya",
    description:
      "Temukan berbagai macam power tools berkualitas tinggi dari RYU yang dirancang untuk memenuhi kebutuhan konstruksi, bengkel, dan proyek DIY Anda.",

    category: "News",
    date: "23 July 2024",
  },
  {
    id: 5,
    image: "/images/article.jpg",
    title: "Tips Memilih Power Tools yang Tepat untuk Proyek Anda",
    description:
      "Temukan berbagai macam power tools berkualitas tinggi dari RYU yang dirancang untuk memenuhi kebutuhan konstruksi, bengkel, dan proyek DIY Anda.",

    category: "News",
    date: "15 June 2024",
  },
  {
    id: 6,
    image: "/images/article.jpg",
    title: "Perawatan Power Tools untuk Performa Maksimal",
    description:
      "Temukan berbagai macam power tools berkualitas tinggi dari RYU yang dirancang untuk memenuhi kebutuhan konstruksi, bengkel, dan proyek DIY Anda.",

    category: "News",
    date: "8 May 2024",
  },
  {
    id: 7,
    image: "/images/article.jpg",
    title: "Inovasi Terbaru dalam Teknologi Power Tools",
    description:
      "Temukan berbagai macam power tools berkualitas tinggi dari RYU yang dirancang untuk memenuhi kebutuhan konstruksi, bengkel, dan proyek DIY Anda.",

    category: "News",
    date: "22 April 2024",
  },
  {
    id: 8,
    image: "/images/article.jpg",
    title: "RYU Power Tools di Berbagai Industri",
    description:
      "Temukan berbagai macam power tools berkualitas tinggi dari RYU yang dirancang untuk memenuhi kebutuhan konstruksi, bengkel, dan proyek DIY Anda.",

    category: "Newss",
    date: "10 March 2024",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
        <div className="mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-primary mb-4  decoration-2 underline-offset-4">
            Artikel
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div className="flex flex-col h-full group  bg-white rounded-lg overflow-hidden border border-gray-200">
              <div className="overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto p-2 aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex-row px-6 pt-4">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 inline-block mr-2 text-[#717171]"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"
                  ></path>
                </svg>

                <span className=" text-lg font-semibold text-[#717171]">
                  {article.category}
                </span>
              </div>

              <div className="flex-row px-6 pt-4">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 inline-block mr-2 text-[#717171]"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"
                  ></path>
                </svg>
                <span className="text-lg font-semibold text-[#717171]">
                  {article.date}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold  mb-4  leading-tight ">
                  {article.title}
                </h3>
                <p className="text-[#717171] flex-grow">
                  {article.description}
                </p>

                <button className="mt-6 self-start text-[#717171] font-bold uppercase decoration-2 underline-offset-4 flex items-center gap-2 hover:text-black">
                  <Link href={`/blogs/${article.id}`}>
                  <span className="flex items-center justify-center gap-2">
                    Selengkapnya
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    viewBox="0 0 448 512"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
                  </svg>
                  </span>
                </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
