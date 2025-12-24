"use client";

import React, { useMemo, useState } from "react";

type VideoItem = {
  id: number;
  videoId: string;
  title: string;
  duration: string;
  thumb: string;
};

const videos: VideoItem[] = [
  {
    id: 1,
    videoId: "kfzbMfCZBN4",
    title: "Pelumasan REXCO 50 pada mesin",
    duration: "00:28",
    thumb: "https://i.ytimg.com/vi/kfzbMfCZBN4/hqdefault.jpg",
  },
  {
    id: 2,
    videoId: "6dY6ahshVX0",
    title: "REXCO HACKS #06 - SOLUSI SAAT MUR DAN BAUT MACET KARENA KARAT",
    duration: "00:49",
    thumb: "https://i.ytimg.com/vi/6dY6ahshVX0/hqdefault.jpg",
  },
  {
    id: 3,
    videoId: "b3fV6eE_yPw",
    title: "REXCO 50 - SOLUSI PADA SEGMENT INDUSTRIAL",
    duration: "00:15",
    thumb: "https://i.ytimg.com/vi/b3fV6eE_yPw/hqdefault.jpg",
  },
  {
    id: 4,
    videoId: "NMiG_zUv-88",
    title: "REXCO HACKS #4 - MELUMASI KUNCI GEMBOK MACET",
    duration: "00:58",
    thumb: "https://i.ytimg.com/vi/NMiG_zUv-88/hqdefault.jpg",
  },
  {
    id: 5,
    videoId: "U011L9Gk4-A",
    title: "REXCO HACKS #03 - MELUMASI KRAN AIR",
    duration: "01:02",
    thumb: "https://i.ytimg.com/vi/U011L9Gk4-A/hqdefault.jpg",
  },
  {
    id: 6,
    videoId: "C3jYvu-25cw",
    title: "REXCO HACKS #02 - BERSIHKAN KARAT PADA ALAT PERKAKAS",
    duration: "00:56",
    thumb: "https://i.ytimg.com/vi/C3jYvu-25cw/hqdefault.jpg",
  },
  {
    id: 7,
    videoId: "_m3BaVmZ4Mw",
    title: "REXCO - MINING & CONCRETE SHOW RECAP 2025",
    duration: "00:43",
    thumb: "https://i.ytimg.com/vi/_m3BaVmZ4Mw/hqdefault.jpg",
  },
  {
    id: 8,
    videoId: "1EdDRvnyBYk",
    title: "REXCO HACKS #01 - MELUMASI ENGSEL PINTU",
    duration: "00:48",
    thumb: "https://i.ytimg.com/vi/1EdDRvnyBYk/hqdefault.jpg",
  },
  {
    id: 9,
    videoId: "luWwWNq0OHM",
    title: "POV : Day 1 Introvert Jualan",
    duration: "00:46",
    thumb: "https://i.ytimg.com/vi/luWwWNq0OHM/hqdefault.jpg",
  },
  {
    id: 10,
    videoId: "96DzN_wgwwQ",
    title: "REXCO 25 - SOLUSI MENGATASI BUNYI RANTAI",
    duration: "00:49",
    thumb: "https://i.ytimg.com/vi/96DzN_wgwwQ/hqdefault.jpg",
  },
];

export default function UsesSection() {
  const [activeId, setActiveId] = useState<number>(videos[0].id);

  const activeVideo = useMemo(
    () => videos.find((v) => v.id === activeId) ?? videos[0],
    [activeId]
  );

  const embedUrl = useMemo(
    () => `https://www.youtube.com/embed/${activeVideo.videoId}?rel=0&showinfo=0&enablejsapi=1`,
    [activeVideo.videoId]
  );

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16">
        <div className="mb-10 sm:mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 decoration-2 underline-offset-4">
            3000++ USES OF REXCO
          </h2>
          <hr className="mb-8" />

        </div>

        <div className="">
          {/* Main player */}
          <div className="w-full bg-black/70 rounded-lg overflow-hidden shadow-md">
            <div className="relative w-full aspect-[9/16] sm:aspect-video bg-black">
              <iframe
                key={activeVideo.videoId}
                src={embedUrl}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          {/* Playlist below */}
          <div className="rounded-lg shadow-md overflow-hidden bg-[#0f0f0f]">
            <div className="flex flex-col lg:flex-row">
              {/* Left info bar */}
              <div className="bg-secondary text-white w-full lg:w-48 px-6 py-6 flex flex-col items-center justify-center gap-3 text-center">
                <svg
                  aria-hidden="true"
                  className="h-10 w-10 text-white"
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                </svg>
                <div>
                  <p className="font-bold uppercase">Video Playlist</p>
                  <p className="font-semibold text-lg">{activeVideo.id}/{videos.length} videos</p>
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="flex-1 overflow-x-auto bg-[#0f0f0f]">
                <div className="flex min-w-[960px]">
                  {videos.map((video) => (
                    <button
                      key={video.id}
                      onClick={() => setActiveId(video.id)}
                      className={`relative flex-shrink-0 w-64 bg-[#111] text-left transition hover:brightness-110 border border-transparent ${
                        activeId === video.id ? "ring-2 ring-secondary" : ""
                      }`}
                    >
                      <div className="relative w-full h-40 overflow-hidden">
                        <img
                          src={video.thumb}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-sm">
                          {video.id}
                        </div>
                      </div>
                      <div className="p-3 text-white space-y-1">
                        <p className="font-semibold leading-snug text-sm sm:text-base line-clamp-2">
                          {video.title}
                        </p>
                        <p className="text-gray-300 text-xs sm:text-sm">{video.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
