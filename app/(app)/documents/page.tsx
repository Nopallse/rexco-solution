"use client";

import Link from "next/link";
export default function DocumentsPage() {
  const products = [
    {
      id: "rexco-50",
      name: "REXCO 50 MULTIPURPOSE LUBRICANT",
      variant: ["120ml", "500ml", "220ml", "3800ml", "350ml"],
      image: [
        "/images/product/120-ML-REXCO-50.webp",
        "/images/product/350-ML-REXCO-50-scaled.webp",
        "/images/product/3800ML-REXCO-50-scaled.webp",
      ],
      youtube: "https://youtu.be/Pz-cZSshpZE",
      dokument: [
        "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-50-Multipurpose-Lubricant.pdf",
        "https://rexco-solution.com/wp-content/uploads/2024/11/1-Technical-Data-Sheet_REXCO-50.pdf",
      ],
      categories: ["Lubricant", "Multipurpose"],
      description: `<div class="">
                          <p><span data-sheets-root="1">REXCO 50 MULTI PURPOSE LUBRICANT adalah cairan multifungsi yang berfungsi untuk membersihkan, melumasi dan memproteksi mesin serta peralatan yang terbuat dari metal. Dengan penetrasi 2x lebih cepat, lubrikasi 3x lebih efektif, dan formula anti karat 3x lebih lama dari merk lain, rexco 50 sangat baik dalam melindungi metal dari karat dan korosi, melepaskan mur dan baut yang berkarat dengan kemampuan penetrasi yang cepat, menghilangkan bunyi derit akibat gesekan, dan dapat membersihkan kotoran oli, aspal, serta debu dari komponen barang anda. Cairan ini sangat efektif untuk digunakan pada mesin industri, engsel pintu, aki mobil, dan bagian dari body mobil ataupun motor.</span></p>
      <p>Variasi :<br>
      120 ML / 100 G / 4.2 fl OZ<br>
      220 ML / 180 G / 7.4 fl OZ<br>
      350 ML / 287 G / 11.8 fl OZ<br>
      500 ML / 485 G / 16.9 fl OZ<br>
      3800 ML / 3,8 LITER</p>
      <p>FUNGSI :<br>
      1. MELINDUNGI MESIN INDUSTRI DARI KARAT<br>
      2. MELUMASI ENGSEL PINTU<br>
      3. MELINDUNGI PIPA KILANG DARI KARAT<br>
      4. MELINDUNGI KEPALA AKI DARI PROSES OKSIDASI<br>
      5. MENGHILANGKAN KELEMBAPAN PADA BUSI MOTOR<br>
      6. MEMBERSIHKAN ASPAL DI BADAN MOBIL<br>
      7. MELONGGARKAN BAGIAN YANG BERKARAT<br>
      8. MELINDUNGI DARI KARAT<br>
      9. MENGHILANGKAN KELEMBAPAN<br>
      10. MENGHILANGKAN BUNYI DERIT<br>
      11. MEMBERSIHKAN &amp; MENGHILANGKAN OLI, ASPAL, &amp; DEBU</p>
      <p>Unique Selling Point :<br>
      Dijamin Kualitas 3x lebih baik &amp; Harga lebih murah.</p>
                      </div>`,
    },
    {
      id: "rexco-70",
      name: "REXCO 70 MULTI-PURPOSE DEGREASER",
      variant: ["500ml", "1L", "5L"],
      image: ["/images/product/1.webp"],
      youtube: "https://youtu.be/example70",
      dokument: [
        "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-70.pdf",
      ],
      categories: ["Degreaser", "Cleaner"],
      description: `REXCO 70 Multi-Purpose Degreaser effectively removes grease, oil, and grime from various surfaces.`,
    },
    {
      id: "rexco-18",
      name: "REXCO 18 CONTACT CLEANER",
      variant: ["200ml", "400ml"],
      image: ["/images/product/2.webp"],
      youtube: "https://youtu.be/example18",
      dokument: [
        "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-18.pdf",
      ],
      categories: ["Cleaner", "Electronics"],
      description: `REXCO 18 Contact Cleaner safely cleans electronic components and contacts.`,
    },
    {
      id: "rexco-25",
      name: "REXCO 25 BRAKE & PARTS CLEANER",
      variant: ["500ml"],
      image: ["/images/product/3.webp"],
      youtube: "https://youtu.be/example25",
      dokument: [
        "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-25.pdf",
      ],
      categories: ["Automotive", "Cleaner"],
      description: `REXCO 25 Brake & Parts Cleaner quickly removes brake fluid, grease, and oil.`,
    },
    {
      id: "rexco-20",
      name: "REXCO 20 BELT DRESSING",
      variant: ["400ml"],
      image: ["/images/product/4.webp"],
      youtube: "https://youtu.be/example20",
      dokument: [
        "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-20.pdf",
      ],
      categories: ["Automotive", "Maintenance"],
      description: `REXCO 20 Belt Dressing stops belt slipping and extends belt life.`,
    },
    {
      id: "rexco-60",
      name: "REXCO 60 SILICONE SPRAY",
      variant: ["400ml"],
      image: ["/images/product/6.webp"],
      youtube: "https://youtu.be/example60",
      dokument: [
        "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-60.pdf",
      ],
      categories: ["Lubricant", "Silicone"],
      description: `REXCO 60 Silicone Spray provides long-lasting lubrication and protection.`,
    },
    {
      id: "rexco-81",
      name: "REXCO 81 ANTI SPATTER",
      variant: ["400ml"],
      image: ["/images/product/8.webp"],
      youtube: "https://youtu.be/example81",
      dokument: [
        "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-81.pdf",
      ],
      categories: ["Welding", "Protection"],
      description: `REXCO 81 Anti Spatter prevents welding spatter adhesion.`,
    },
    {
      id: "rexco-82",
      name: "REXCO 82 CHAIN LUBE",
      variant: ["400ml"],
      image: ["/images/product/7.webp"],
      youtube: "https://youtu.be/example82",
      dokument: [
        "https://rexco-solution.com/wp-content/uploads/2024/11/MSDS-REXCO-82.pdf",
      ],
      categories: ["Lubricant", "Chain"],
      description: `
          <div>
                          <p><span data-sheets-root="1">REXCO 5s0 MULTI PURPOSE LUBRICANT adalah cairan multifungsi yang berfungsi untuk membersihkan, melumasi dan memproteksi mesin serta peralatan yang terbuat dari metal. Dengan penetrasi 2x lebih cepat, lubrikasi 3x lebih efektif, dan formula anti karat 3x lebih lama dari merk lain, rexco 50 sangat baik dalam melindungi metal dari karat dan korosi, melepaskan mur dan baut yang berkarat dengan kemampuan penetrasi yang cepat, menghilangkan bunyi derit akibat gesekan, dan dapat membersihkan kotoran oli, aspal, serta debu dari komponen barang anda. Cairan ini sangat efektif untuk digunakan pada mesin industri, engsel pintu, aki mobil, dan bagian dari body mobil ataupun motor.</span></p>
      <p>Variasi :<br>
      120 ML / 100 G / 4.2 fl OZ<br>
      220 ML / 180 G / 7.4 fl OZ<br>
      350 ML / 287 G / 11.8 fl OZ<br>
      500 ML / 485 G / 16.9 fl OZ<br>
      3800 ML / 3,8 LITER</p>
      <p>FUNGSI :<br>
      1. MELINDUNGI MESIN INDUSTRI DARI KARAT<br>
      2. MELUMASI ENGSEL PINTU<br>
      3. MELINDUNGI PIPA KILANG DARI KARAT<br>
      4. MELINDUNGI KEPALA AKI DARI PROSES OKSIDASI<br>
      5. MENGHILANGKAN KELEMBAPAN PADA BUSI MOTOR<br>
      6. MEMBERSIHKAN ASPAL DI BADAN MOBIL<br>
      7. MELONGGARKAN BAGIAN YANG BERKARAT<br>
      8. MELINDUNGI DARI KARAT<br>
      9. MENGHILANGKAN KELEMBAPAN<br>
      10. MENGHILANGKAN BUNYI DERIT<br>
      11. MEMBERSIHKAN &amp; MENGHILANGKAN OLI, ASPAL, &amp; DEBU</p>
      <p>Unique Selling Point :<br>
      Dijamin Kualitas 3x lebih baik &amp; Harga lebih murah.</p>
                      </div>
          
          `,
    },
  ];
  return (
    <div className="bg-white py-8 sm:py-12 lg:py-20">
      <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary mb-4 decoration-2 underline-offset-4">
            Dokumen (MSDS dan TDS)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {products.slice(0, 8).map((item) => (
            <Link href={`/product/${item.id}`} key={item.id}>
              <div className="flex flex-col items-center h-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                {/* Square image area with light background */}
                <div className="w-full aspect-square flex items-center justify-center transition-transform duration-300 hover:translate-y-[-6px] bg-[#f7f8fc] p-4 sm:p-6">
                  <img
                    src={item.image?.[0] || "/images/product.jpg"}
                    alt={item.name}
                    className="max-h-[70%] w-full aspect-square object-contain mx-2 sm:mx-4"
                  />
                </div>
                <div className="p-4 sm:p-6 lg:p-8 pt-0 flex flex-col flex-1 w-full">
                  {/* Title - clamp to 2 lines */}
                  <h4
                    className="
              text-base sm:text-lg lg:text-2xl
              font-extrabold
              uppercase
              leading-tight
              line-clamp-2
              min-h-[2.5rem] sm:min-h-[3rem] lg:min-h-[3.5rem]
              flex
              mb-3 sm:mb-4 lg:mb-6
            "
                  >
                    {item.name}
                  </h4>

                  <div className="flex w-full mt-auto">
                    <button className="w-1/2 bg-primary text-white font-extrabold h-12 sm:h-14 text-sm sm:text-base uppercase flex items-center justify-center hover:bg-secondary hover:text-black transition-colors">
                      <span className="flex items-center gap-2">
                        MSDS
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 512 512"
                          fill="currentColor"
                        >
                          <path d="M216 0h80v192h87.7L256 378.3 128.3 192H216zM0 376h512v112H0z" />
                        </svg>
                      </span>
                    </button>

                    <button className="w-1/2 bg-secondary text-black font-extrabold h-12 sm:h-14 text-sm sm:text-base uppercase flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <span className="flex items-center gap-2">
                        TDS
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 512 512"
                          fill="currentColor"
                        >
                          <path d="M216 0h80v192h87.7L256 378.3 128.3 192H216zM0 376h512v112H0z" />
                        </svg>
                      </span>
                    </button>
                  </div>
                  {/* Button */}
                  <button
                    className="
              
              w-full
              h-12 sm:h-14 lg:h-16
              text-sm sm:text-base
              text-gray-600
              font-extrabold
              uppercase
              flex
              items-center
              hover:text-black
              transition-colors
            "
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col items-start">
                        <span>Ke halaman Produk</span>
                      </div>
                      <span className="flex items-center justify-center transition-transform group-hover:translate-x-1">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 448 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
                        </svg>
                      </span>
                      <span className="flex items-center justify-center">
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
                    </div>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
