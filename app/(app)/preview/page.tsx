"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/app/lib/image-utils";
import { forceWrapHtml } from "@/app/lib/forceWrapHtml";

type PreviewData = {
  title: string;
  contentHtml: string;
  primaryImage: string;
  publishedAt: string;
};

export default function PreviewPage() {
  const router = useRouter();
  const [preview, setPreview] = useState<PreviewData | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("articlePreview");
    if (!raw) {
      router.replace("/blogs");
      return;
    }
    try {
      const data = JSON.parse(raw) as PreviewData;
      setPreview(data);
    } catch {
      router.replace("/blogs");
    }
  }, [router]);

  if (!preview) {
    return (
      <div className="bg-white py-20">
        <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16 text-center">
          <p className="text-gray-600">Memuat preview...</p>
        </div>
      </div>
    );
  }

  const fixContentHtml = (html: string) => {
    if (!html) return "";
    let out = html.replace(
      /src=\"(\/[^\"]+)\"/g,
      (_m: string, p1: string) => `src="${getImageUrl(p1)}"`,
    );
    out = out.replace(/srcset=\"([^\"]+)\"/g, (_m: string, p1: string) => {
      const parts = p1
        .split(",")
        .map((s: string) => s.trim())
        .map((entry: string) => {
          const [url, size] = entry.split(/\s+/);
          const fixedUrl =
            url && url.startsWith("/") ? getImageUrl(url) : url;
          return size ? `${fixedUrl} ${size}` : `${fixedUrl}`;
        });
      return `srcset="${parts.join(", ")}"`;
    });
    return out;
  };

  const html = forceWrapHtml(fixContentHtml(preview.contentHtml));

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
        <div className="relative w-full h-fit mb-12">
          <img
            src={getImageUrl(preview.primaryImage) || "/images/article.jpg"}
            alt={preview.title}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16 text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
              {preview.title}
            </h1>
            <div className="flex items-center gap-6 text-white text-base">
              <div className="flex items-center gap-2">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path>
                </svg>
                <time>
                  {preview.publishedAt
                    ? new Date(preview.publishedAt).toLocaleDateString(
                        "id-ID",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )
                    : "Tanpa tanggal"}
                </time>
              </div>
            </div>
          </div>
        </div>

        <article className="bg-white px-4 sm:px-8 lg:px-16 max-w-5xl mx-auto overflow-x-hidden">
          <div
            className="
              prose prose-lg max-w-3xl mx-auto
              [&_p]:text-gray-700
              [&_p]:leading-relaxed
              [&_p]:text-base
              [&_p]:mb-4

              [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-secondary [&_h2]:mb-4 [&_h2]:mt-8
              [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-secondary [&_h3]:mb-4 [&_h3]:mt-8

              [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-6 [&_ul]:space-y-2
              [&_li]:text-gray-700

              [&_figure]:mb-8 [&_figure]:mt-8
              [&_img]:w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:shadow-md

              [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-800
            "
            style={{
              whiteSpace: "normal",
              wordBreak: "normal",
              overflowWrap: "normal",
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    </div>
  );
}
