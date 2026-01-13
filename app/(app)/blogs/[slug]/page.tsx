'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ClockCircleOutlined } from '@ant-design/icons';
import { getPublicArticleBySlug, Article } from '@/app/lib/article-api';
import { getImageUrl } from '@/app/lib/image-utils';
import { useLanguage } from '@/app/providers/LanguageProvider';

  export default function BlogDetailPage() {
    const { t } = useLanguage();
    const params = useParams();
    const slug = params.slug as string;
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      async function run() {
        try {
          setLoading(true);
          const data = await getPublicArticleBySlug(slug);
          setArticle(data);
          setError(null);
        } catch (e) {
          setError(t.pages?.blogs?.notfound || "Artikel tidak ditemukan");
          setArticle(null);
        } finally {
          setLoading(false);
        }
      }
      if (slug) run();
    }, [slug]);

    if (loading) {
      return (
        <div className="bg-white py-20">
          <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16 text-center">
            <p className="text-gray-600">{t.pages?.blogs?.loading || 'Memuat artikel...'}</p>
          </div>
        </div>
      );
    }

    if (error || !article) {
      return (
        <div className="bg-white py-20">
          <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{error || (t.pages?.blogs?.notfound || "Artikel Tidak Ditemukan")}</h1>
            <Link href="/blogs" className="text-[#2d5016] hover:underline">
              {t.pages?.blogs?.back || '← Kembali ke Blog'}
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white py-20">
        <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
          <div className="relative w-full h-fit mb-12 ">
            <img
              src={getImageUrl(article.primaryImage) || "/images/article.jpg"}
              alt={article.title}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16 text-white">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-6 text-white text-base">
                <div className="flex items-center gap-2">
                  <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"></path></svg>
                  <time>
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    : "Tanpa tanggal"}
                  </time>
                </div>
              </div>
            </div>
          </div>

          <article className="bg-white px-4 sm:px-8 lg:px-16 max-w-5xl mx-auto overflow-x-hidden">
            {
              /* Convert relative image URLs in contentHtml to absolute using API base */
            }
            {(() => {
              const fixContentHtml = (html: string) => {
                if (!html) return '';
                // Replace src="/..."
                let out = html.replace(
                  /src=\"(\/[^\"]+)\"/g,
                  (_m: string, p1: string) => `src="${getImageUrl(p1)}"`
                );
                // Replace srcset with potential relative URLs
                out = out.replace(/srcset=\"([^\"]+)\"/g, (_m: string, p1: string) => {
                  const parts = p1
                    .split(',')
                    .map((s: string) => s.trim())
                    .map((entry: string) => {
                      const [url, size] = entry.split(/\s+/);
                      const fixedUrl = url && url.startsWith('/') ? getImageUrl(url) : url;
                      return size ? `${fixedUrl} ${size}` : `${fixedUrl}`;
                    });
                  return `srcset="${parts.join(', ')}"`;
                });
                return out;
              };
              const html = fixContentHtml(article.contentHtml);
              return (
                <div
                  className="prose prose-lg max-w-3xl mx-auto break-words
                [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:text-base [&_p]:mb-4 [&_p]:break-words
                [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-secondary [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:break-words
                [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-secondary [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:break-words
                [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-6 [&_ul]:space-y-2
                [&_li]:text-gray-700 [&_li]:break-words
                [&_span]:break-words
                [&_figure]:mb-8 [&_figure]:mt-8
                [&_img]:w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:shadow-md
                [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-800 [&_a]:break-words
                [&_table]:w-full [&_th]:break-words [&_td]:break-words"
                  style={{ wordBreak: 'break-word' as const }}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              );
            })()}
          </article>

          <section className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold  mb-6 text-center text-primary items-center justify-center flex gap-3">
              BAGIKAN
            </h3>
            <div className="flex flex-row items-center justify-center gap-6">
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? window.location.href : ""}`}
                target="_blank"
                className="w-12 h-12 flex items-center justify-center rounded-none"
                style={{ background: "#3b5998" }}
              >
                <svg aria-hidden="true" className="w-7 h-7" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
              </Link>
              <Link
                href={`https://wa.me/?text=${article.title} ${typeof window !== "undefined" ? window.location.href : ""}`}
                target="_blank"
                className="w-12 h-12 flex items-center justify-center rounded-none"
                style={{ background: "#25d366" }}
              >
                <svg aria-hidden="true" className="w-7 h-7" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
              </Link>
              <Link
                href={`https://twitter.com/intent/tweet?url=${typeof window !== "undefined" ? window.location.href : ""}&text=${article.title}`}
                target="_blank"
                className="w-12 h-12 flex items-center justify-center rounded-none"
                style={{ background: "#000" }}
              >
                <svg aria-hidden="true" className="w-7 h-7" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
              </Link>
              <Link
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== "undefined" ? window.location.href : ""}`}
                target="_blank"
                className="w-12 h-12 flex items-center justify-center rounded-none"
                style={{ background: "#0077b5" }}
              >
                <svg aria-hidden="true" className="w-7 h-7" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
              </Link>
              <Link
                href={`mailto:?subject=${article.title}&body=${typeof window !== "undefined" ? window.location.href : ""}`}
                className="w-12 h-12 flex items-center justify-center rounded-none"
                style={{ background: "#e74c3c" }}
              >
                <svg aria-hidden="true" className="w-7 h-7" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
              </Link>
              <button onClick={() => window.print()} className="w-12 h-12 flex items-center justify-center rounded-none" style={{ background: "#aaa" }}>
                <svg aria-hidden="true" className="w-7 h-7" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"></path></svg>
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  }
      