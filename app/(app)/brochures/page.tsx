"use client";

import { DocumentDto, listDocuments } from "@/app/lib/document-client";
import { getFileUrl, getImageUrl } from "@/app/lib/image-utils";
import { useEffect, useState } from "react";

export default function BrochuresPage() {
  const [brochures, setBrochures] = useState<DocumentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBrochures() {
      try {
        setLoading(true);
        const data = await listDocuments();
        setBrochures(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch brochures:", err);
        setError("Gagal memuat data brosur");
      } finally {
        setLoading(false);
      }
    }

    fetchBrochures();
  }, []);

  if (loading) {
    return (
      <div className="bg-white py-20">
        <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <p className="text-gray-600">Memuat brosur...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white py-20">
        <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
        <div className="mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-primary mb-4 decoration-2 underline-offset-4">
            Brosur
          </h2>
          <p className="text-gray-600 mt-4">
            Unduh katalog dan brosur produk REXCO
          </p>
        </div>

        {brochures.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Belum ada brosur tersedia</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brochures.map((brochure) => (
              <div key={brochure.id} className="flex flex-col h-full">
                <img
                  src={getImageUrl(brochure.image)}
                  alt={brochure.title}
                  className="w-full h-60 object-cover mb-3 rounded-lg shadow-sm"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/brochures.jpg";
                  }}
                />
                <h3 className="text-lg font-semibold text-primary mb-3 mt-4 line-clamp-2">
                  {brochure.title}
                </h3>
                <a
                  href={getFileUrl(brochure.file)}
                  download
                  className="mt-auto !text-[#77716a] font-bold py-2 mr-auto rounded hover:!text-black transition-colors flex items-center gap-2"
                >
                  Unduh
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}