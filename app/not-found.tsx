'use client';

import Link from 'next/link';
import { Button } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useLanguage } from '@/app/providers/LanguageProvider';

export default function NotFound() {
  const { language } = useLanguage();
  const withLang = (href: string) => (href.startsWith('/') ? `/${language}${href}` : href);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. 
            Halaman mungkin telah dipindahkan atau tidak tersedia.
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href={withLang("/")}>
            <Button 
              type="primary" 
              size="large" 
              icon={<HomeOutlined />}
              className="bg-red-600 hover:bg-red-700"
            >
              Kembali ke Beranda
            </Button>
          </Link>
          <Button 
            size="large" 
            icon={<ArrowLeftOutlined />}
            onClick={() => window.history.back()}
          >
            Halaman Sebelumnya
          </Button>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Butuh bantuan? <Link href={withLang("/contact-us")} className="text-red-600 hover:text-red-700 underline">Hubungi Kami</Link></p>
        </div>
      </div>
    </div>
  );
}
