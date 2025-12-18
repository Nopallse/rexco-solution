'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeftOutlined, ClockCircleOutlined } from '@ant-design/icons';

// Hardcoded article data
const articles = [
  {
    id: 1,
    image: '/images/article.jpg',
    title: 'Solusi Perawatan Terbaik untuk Kendaraan & Industri – REXCO',
    date: '22 October 2025',
    category: 'Product',
    content: `
      <div class="elementor-widget-container">
					
<p>Menjaga performa kendaraan atau mesin bukan cuma soal servis rutin, tapi juga tentang memilih produk perawatan yang tepat. Sering kali, masalah kecil seperti karat, kotoran, atau komponen macet bisa jadi besar kalau diabaikan.</p>



<p>Di <a href="https://rexco-solution.com/" target="_blank" rel="noopener">REXCO</a>, kami percaya bahwa perawatan harus simpel, praktis, dan efektif. Itulah kenapa produk <a href="https://rexco-solution.com/" target="_blank" rel="noopener">REXCO</a> hadir sebagai solusi perawatan serbaguna—baik untuk kendaraan, industri, maupun kebutuhan rumah tangga.</p>



<figure class="wp-block-image size-large"><img decoding="async" width="1024" height="683" src="https://rexco-solution.com/wp-content/uploads/2025/09/image-1024x683.png" alt="" class="wp-image-1462" srcset="https://rexco-solution.com/wp-content/uploads/2025/09/image-1024x683.png 1024w, https://rexco-solution.com/wp-content/uploads/2025/09/image-300x200.png 300w, https://rexco-solution.com/wp-content/uploads/2025/09/image-150x100.png 150w, https://rexco-solution.com/wp-content/uploads/2025/09/image-768x512.png 768w, https://rexco-solution.com/wp-content/uploads/2025/09/image-600x400.png 600w, https://rexco-solution.com/wp-content/uploads/2025/09/image.png 1228w" sizes="(max-width: 1024px) 100vw, 1024px"></figure>



<h2 class="wp-block-heading">Kenapa <a href="https://rexco-solution.com/" target="_blank" rel="noopener">REXCO</a> Jadi Pilihan?</h2>



<p><a href="https://rexco-solution.com/" target="_blank" rel="noopener">REXCO</a> dikenal luas sebagai brand chemical maintenance asal Indonesia dengan standar kualitas internasional. Produk kami dirancang untuk menjawab kebutuhan sehari-hari: membersihkan, melindungi, sekaligus memperpanjang umur pakai mesin dan peralatan.</p>



<p>Kami tidak sekadar menawarkan produk, tapi juga memberikan solusi praktis yang sudah digunakan oleh mekanik, teknisi, hingga penghobi otomotif di seluruh Indonesia. Selain itu, produk <a href="https://rexco-solution.com/" target="_blank" rel="noopener">REXCO</a> juga terbukti memiliki berbagai keunggulan dengan performa lebih baik, efektif, dan efisien setelah dilakukan pengujian dibandingkan dengan merek lainnya. Dengan harga yang jauh lebih terjangkau, <a href="https://rexco-solution.com/" target="_blank" rel="noopener">REXCO</a> menawarkan pelumas serbaguna dengan banyak keunggulan untuk kebutuhan sehari-hari.</p>



<h3 class="wp-block-heading"><a href="https://rexco-solution.com/product/rexco-50-multipurpose-lubricant/" target="_blank" rel="noopener">1. REXCO 50 – Multipurpose Lubricant</a></h3>



<p>Produk andalan yang serbaguna untuk melumasi, membersihkan, dan melindungi berbagai komponen. <a href="https://rexco-solution.com/product/rexco-50-multipurpose-lubricant/" target="_blank" rel="noopener">REXCO 50</a> cocok untuk mesin industri, engsel pintu, aki mobil, hingga body mobil.</p>



<p><strong>Apa yang kamu dapatkan:</strong></p>



<ul class="wp-block-list">
<li>Melindungi metal dari karat &amp; korosi</li>
<li>Melepaskan mur dan baut yang berkarat dengan penetrasi cepat</li>
<li>Menghilangkan bunyi derit akibat gesekan</li>
<li>Membersihkan kotoran, oli, aspal, dan debu</li>
</ul>



<p><a href="https://rexco-solution.com/product/rexco-50-multipurpose-lubricant/" target="_blank" rel="noopener">REXCO 50</a> menawarkan penetrasi lebih cepat, lubrikasi lebih efektif, perlindungan anti karat lebih lama, dan harga lebih terjangkau dibanding merek lain.</p>



<h3 class="wp-block-heading"><a href="https://rexco-solution.com/product/rexco-18-contact-cleaner/" target="_blank" rel="noopener">2. REXCO 18 – Contact Cleaner</a></h3>



<p>Buat kamu yang sering berurusan dengan kelistrikan, <a href="https://rexco-solution.com/product/rexco-18-contact-cleaner/" target="_blank" rel="noopener">REXCO 18</a> jadi solusi pembersih komponen elektronik yang aman. Produk ini cocok untuk panel elektrik mobil, papan PCB, komputer, hingga kumparan dinamo.</p>



<p><strong>Keuntungan:</strong></p>



<ul class="wp-block-list">
<li>Membersihkan kotoran, debu, dan oksidasi pada kontak listrik</li>
<li>Mengering cepat tanpa meninggalkan residu</li>
<li>Aman digunakan pada berbagai peralatan elektronik</li>
<li>Tidak menghantarkan listrik</li>
</ul>



<p><a href="https://rexco-solution.com/product/rexco-18-contact-cleaner/" target="_blank" rel="noopener">REXCO 18</a> terbukti lebih efektif, cepat menguap, dan tetap dengan harga lebih terjangkau dibanding merek lain.</p>



<h3 class="wp-block-heading"><a href="https://rexco-solution.com/product/rexco-81-carb-injector-cleaner/" target="_blank" rel="noopener">3. REXCO 81 – Carb &amp; Injector Cleaner</a></h3>



<p>Untuk menjaga performa mesin kendaraan, <a href="https://rexco-solution.com/product/rexco-81-carb-injector-cleaner/" target="_blank" rel="noopener">REXCO 81</a> hadir sebagai pembersih karburator dan injector. Produk ini efektif digunakan pada karburator, katup, ruang bakar, dan injektor.</p>



<p><strong>Yang kamu dapatkan:</strong></p>



<ul class="wp-block-list">
<li>Membersihkan kotoran, karbon, varnish, dan gum</li>
<li>Dilengkapi anti korosi</li>
<li>Menurunkan emisi gas buang</li>
<li>Penetrasi cepat untuk hasil maksimal</li>
</ul>



<p><a href="https://rexco-solution.com/product/rexco-81-carb-injector-cleaner/" target="_blank" rel="noopener">REXCO 81</a> membantu menjaga performa karburator dan injektor dengan daya bersih lebih efektif, umur komponen mesin lebih panjang, dan harga lebih kompetitif dibanding produk lain.</p>



<h2 class="wp-block-heading">Bagaimana <a href="https://rexco-solution.com/" target="_blank" rel="noopener">REXCO</a> Membantu Kamu</h2>



<p>Kami memahami setiap orang punya kebutuhan berbeda, dari otomotif sampai industri. Karena itu <a href="https://rexco-solution.com/" target="_blank" rel="noopener">REXCO</a> menghadirkan berbagai varian produk yang sudah teruji efektivitasnya.</p>



<p><strong>Langkah mudah menggunakan <a href="https://rexco-solution.com/" target="_blank" rel="noopener">REXCO</a>:</strong></p>



<ul class="wp-block-list">
<li>Pilih produk sesuai kebutuhan perawatanmu</li>
<li>Ikuti instruksi penggunaan yang praktis</li>
<li>Nikmati hasil maksimal untuk performa dan ketahanan mesin</li>
</ul>



<h2 class="wp-block-heading">Miliki Produk <a href="https://rexco-solution.com/" target="_blank" rel="noopener">REXCO</a> Sekarang</h2>



<p>Jangan tunggu sampai masalah kecil jadi besar. Dengan <a href="https://rexco-solution.com/" target="_blank" rel="noopener">REXCO</a>, kamu bisa merawat kendaraan, mesin, dan peralatan dengan lebih mudah, cepat, dan efisien.</p>



<hr class="wp-block-separator has-alpha-channel-opacity">

				</div>
    `
  },
  {
    id: 2,
    image: '/images/article.jpg',
    title: 'RYU Power Tools: Solusi Andal & Terjangkau untuk Konstruksi, Bengkel, dan DIY',
    date: '25 September 2025',
    category: 'Tips',
    content: `
      <figure class="wp-block-image size-large mb-8">
        <img src="/images/article.jpg" alt="RYU Power Tools Solutions" class="w-full h-auto rounded-lg shadow-md">
      </figure>

      <p class="mb-6">Dalam dunia konstruksi, bengkel, dan proyek DIY, memiliki peralatan yang andal dan berkualitas adalah kunci kesuksesan. RYU Power Tools hadir sebagai solusi terpercaya yang menggabungkan kualitas premium dengan harga yang terjangkau.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Untuk Konstruksi</h3>
      <p class="mb-6">RYU menyediakan berbagai power tools untuk kebutuhan konstruksi profesional, mulai dari bor, gerinda, hingga mesin pemotong. Semua dirancang untuk tahan terhadap kondisi kerja yang berat dan memberikan hasil yang presisi.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Untuk Bengkel</h3>
      <p class="mb-6">Bengkel membutuhkan peralatan yang dapat diandalkan setiap hari. RYU Power Tools menawarkan produk dengan daya tahan tinggi dan performa konsisten untuk mendukung operasional bengkel Anda.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Untuk DIY</h3>
      <p class="mb-6">Bagi penggemar proyek DIY, RYU menyediakan tools yang mudah digunakan namun tetap powerful. Cocok untuk renovasi rumah, pembuatan furniture, dan berbagai proyek kreatif lainnya.</p>

      <figure class="wp-block-image size-large mb-8 mt-8">
        <img src="/images/article.jpg" alt="RYU DIY Projects" class="w-full h-auto rounded-lg shadow-md">
      </figure>
    `
  },
  {
    id: 3,
    image: '/images/article.jpg',
    title: 'Gathering dan Seminar Welding RYU Power Tools',
    date: '4 September 2025',
    category: 'Event',
    content: `
      <figure class="wp-block-image size-large mb-8">
        <img src="/images/article.jpg" alt="Gathering RYU" class="w-full h-auto rounded-lg shadow-md">
      </figure>

      <p class="mb-6">Hari Sabtu tanggal 30 Agustus, Marketing mengadakan Seminar dan Gathering Welding untuk para Bengkel Las di Bogor dan sekitarnya. Sekitar 48 orang hadir yang berasal dari Komunitas Bengkel Las Indonesia, Asosiasi Pengelasan Indonesia dan Balai Latihan Kerja.</p>

      <p class="mb-6">Tujuan diadakan even ini adalah selain mengenalkan produk-produk welding terbaru juga mengenalkan produk Rexco yang bisa digunakan untuk pengerjaan welding di rumah dan tempat kerjanya.</p>

      <p class="mb-6">Sebagian peserta sudah mengenal produk Ryu dan sudah menggunakannya, selain itu mereka menggunakan merek Lakoni dan Rhino. Alasan memilih produk berdasarkan : Harga Terjangkau, Ketersediaan Barang di toko dan Brand Terpercaya.</p>

      <p class="mb-6">Sekitar 88% sudah mengenal produk Ryu dari Social Media, Toko dan Teman.</p>

      <p class="mb-6">Pada acara tersebut para pengunjung juga bisa mencoba langsung produk-produk Ryu Welding.</p>

      <figure class="wp-block-image size-large mb-8 mt-8">
        <img src="/images/article.jpg" alt="Seminar Welding" class="w-full h-auto rounded-lg shadow-md">
      </figure>

      <figure class="wp-block-image size-large mb-8">
        <img src="/images/article.jpg" alt="Product Demo" class="w-full h-auto rounded-lg shadow-md">
      </figure>

      <figure class="wp-block-image size-large mb-8">
        <img src="/images/article.jpg" alt="Peserta Seminar" class="w-full h-auto rounded-lg shadow-md">
      </figure>

      <figure class="wp-block-image size-large mb-8">
        <img src="/images/article.jpg" alt="Gathering RYU" class="w-full h-auto rounded-lg shadow-md">
      </figure>
    `
  },
  {
    id: 4,
    image: '/images/article.jpg',
    title: 'Hadir di GIIAS 2024, Ryu Powertools Deretan Perkakas Otomotif Terbaiknya',
    date: '23 July 2024',
    category: 'Event',
    content: `
      <figure class="wp-block-image size-large mb-8">
        <img src="/images/article.jpg" alt="GIIAS 2024" class="w-full h-auto rounded-lg shadow-md">
      </figure>

      <p class="mb-6">RYU Power Tools dengan bangga berpartisipasi dalam ajang Gaikindo Indonesia International Auto Show (GIIAS) 2024. Dalam pameran bergengsi ini, kami memamerkan deretan perkakas otomotif terbaik yang dirancang khusus untuk memenuhi kebutuhan industri otomotif Indonesia.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Produk Unggulan di GIIAS 2024</h3>

      <p class="mb-6">Di booth RYU, pengunjung dapat melihat langsung berbagai produk unggulan seperti impact wrench, air compressor, polisher, dan berbagai tools otomotif lainnya. Semua produk yang dipamerkan telah melalui quality control ketat untuk memastikan performa terbaik.</p>

      <p class="mb-6">Antusiasme pengunjung GIIAS 2024 terhadap produk-produk RYU sangat tinggi. Banyak profesional otomotif dan penggemar mobil yang tertarik dengan kombinasi kualitas premium dan harga kompetitif yang ditawarkan RYU.</p>

      <figure class="wp-block-image size-large mb-8 mt-8">
        <img src="/images/article.jpg" alt="RYU Booth GIIAS" class="w-full h-auto rounded-lg shadow-md">
      </figure>

      <p class="mb-6">Kehadiran RYU di GIIAS 2024 membuktikan komitmen kami untuk terus berinovasi dan memberikan solusi terbaik bagi industri otomotif Indonesia.</p>
    `
  },
  {
    id: 5,
    image: '/images/article.jpg',
    title: 'Tips Memilih Power Tools yang Tepat untuk Proyek Anda',
    date: '15 June 2024',
    category: 'Tips',
    content: `
      <figure class="wp-block-image size-large mb-8">
        <img src="/images/article.jpg" alt="Choosing Power Tools" class="w-full h-auto rounded-lg shadow-md">
      </figure>

      <p class="mb-6">Memilih power tools yang tepat sangat penting untuk kesuksesan proyek Anda. Berikut adalah panduan lengkap untuk membantu Anda membuat keputusan yang tepat.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">1. Tentukan Kebutuhan Proyek</h3>
      <p class="mb-6">Sebelum membeli, tentukan jenis pekerjaan yang akan dilakukan. Apakah untuk konstruksi berat, renovasi rumah, atau proyek DIY? Setiap jenis pekerjaan membutuhkan spesifikasi tools yang berbeda.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">2. Perhatikan Spesifikasi Teknis</h3>
      <p class="mb-6">Cek daya motor, kecepatan rotasi, dan fitur-fitur tambahan. Pastikan spesifikasi sesuai dengan kebutuhan pekerjaan Anda.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">3. Pertimbangkan Budget</h3>
      <p class="mb-6">RYU menawarkan berbagai pilihan dengan range harga yang berbeda. Pilih yang sesuai dengan budget namun tetap memenuhi kebutuhan kualitas.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">4. Cek Garansi dan Layanan Purna Jual</h3>
      <p class="mb-6">Pastikan produk dilengkapi dengan garansi resmi dan tersedia service center terdekat.</p>

      <figure class="wp-block-image size-large mb-8 mt-8">
        <img src="/images/article.jpg" alt="RYU Product Selection" class="w-full h-auto rounded-lg shadow-md">
      </figure>
    `
  },
  {
    id: 6,
    image: '/images/article.jpg',
    title: 'Perawatan Power Tools untuk Performa Maksimal',
    date: '8 May 2024',
    category: 'Tips',
    content: `
      <figure class="wp-block-image size-large mb-8">
        <img src="/images/article.jpg" alt="Power Tools Maintenance" class="w-full h-auto rounded-lg shadow-md">
      </figure>

      <p class="mb-6">Perawatan yang tepat akan memperpanjang usia power tools dan menjaga performanya tetap optimal. Berikut panduan perawatan lengkap untuk tools Anda.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Pembersihan Rutin</h3>
      <p class="mb-6">Bersihkan debu dan kotoran setelah setiap penggunaan. Gunakan kuas lembut atau air compressor untuk membersihkan bagian dalam tools.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Pelumasan</h3>
      <p class="mb-6">Lakukan pelumasan pada bagian yang bergerak secara berkala. Gunakan pelumas yang direkomendasikan oleh produsen.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Penyimpanan yang Tepat</h3>
      <p class="mb-6">Simpan tools di tempat kering dan terhindar dari kelembaban. Gunakan case atau toolbox untuk melindungi dari benturan.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Pengecekan Berkala</h3>
      <p class="mb-6">Periksa kondisi kabel, switch, dan komponen lainnya secara rutin. Segera lakukan perbaikan jika ditemukan kerusakan.</p>

      <figure class="wp-block-image size-large mb-8 mt-8">
        <img src="/images/article.jpg" alt="Tool Maintenance" class="w-full h-auto rounded-lg shadow-md">
      </figure>
    `
  },
  {
    id: 7,
    image: '/images/article.jpg',
    title: 'Inovasi Terbaru dalam Teknologi Power Tools',
    date: '22 April 2024',
    category: 'Technology',
    content: `
      <figure class="wp-block-image size-large mb-8">
        <img src="/images/article.jpg" alt="Power Tools Innovation" class="w-full h-auto rounded-lg shadow-md">
      </figure>

      <p class="mb-6">Industri power tools terus berkembang dengan teknologi yang semakin canggih. RYU selalu mengikuti perkembangan terkini untuk menghadirkan produk-produk inovatif bagi pelanggan.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Motor Brushless</h3>
      <p class="mb-6">Teknologi motor brushless memberikan efisiensi energi lebih baik, daya tahan lebih lama, dan minim perawatan dibanding motor konvensional.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Battery Technology</h3>
      <p class="mb-6">Perkembangan teknologi baterai lithium-ion memberikan daya lebih besar dengan waktu charging lebih cepat dan usia pakai lebih panjang.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Smart Features</h3>
      <p class="mb-6">Beberapa tools terbaru dilengkapi dengan fitur smart seperti LED indicator, auto shut-off, dan speed control untuk kemudahan dan keamanan penggunaan.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Ergonomic Design</h3>
      <p class="mb-6">Desain yang lebih ergonomis mengurangi kelelahan saat penggunaan jangka panjang dan meningkatkan kontrol serta presisi.</p>

      <figure class="wp-block-image size-large mb-8 mt-8">
        <img src="/images/article.jpg" alt="RYU Innovation" class="w-full h-auto rounded-lg shadow-md">
      </figure>
    `
  },
  {
    id: 8,
    image: '/images/article.jpg',
    title: 'RYU Power Tools di Berbagai Industri',
    date: '10 March 2024',
    category: 'Industry',
    content: `
      <figure class="wp-block-image size-large mb-8">
        <img src="/images/article.jpg" alt="RYU in Industries" class="w-full h-auto rounded-lg shadow-md">
      </figure>

      <p class="mb-6">RYU Power Tools telah dipercaya oleh berbagai industri di Indonesia. Dari konstruksi hingga manufaktur, produk-produk RYU memberikan solusi yang andal dan efisien.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Industri Konstruksi</h3>
      <p class="mb-6">Kontraktor dan pekerja konstruksi memilih RYU karena ketahanan dan performa tools yang konsisten dalam kondisi kerja berat.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Industri Otomotif</h3>
      <p class="mb-6">Bengkel dan workshop otomotif menggunakan RYU untuk berbagai keperluan maintenance dan reparasi kendaraan.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Industri Furniture</h3>
      <p class="mb-6">Produsen furniture memilih RYU untuk proses cutting, sanding, dan finishing produk-produk kayu mereka.</p>

      <h3 class="text-2xl font-bold text-[#2d5016] mb-4 mt-8">Industri Manufaktur</h3>
      <p class="mb-6">Pabrik-pabrik manufaktur menggunakan RYU untuk berbagai keperluan produksi dan maintenance mesin.</p>

      <figure class="wp-block-image size-large mb-8 mt-8">
        <img src="/images/article.jpg" alt="RYU Applications" class="w-full h-auto rounded-lg shadow-md">
      </figure>

      <p class="mb-6">Kepercayaan berbagai industri terhadap RYU Power Tools membuktikan kualitas dan reliability produk kami.</p>
    `
  }
];

const relatedArticles = [
  { id: 5, title: 'Tips Memilih Power Tools yang Tepat untuk Proyek Anda', date: '15 June 2024' },
  { id: 6, title: 'Perawatan Power Tools untuk Performa Maksimal', date: '8 May 2024' },
  { id: 7, title: 'Inovasi Terbaru dalam Teknologi Power Tools', date: '22 April 2024' }
];

export default function BlogDetailPage() {
  const params = useParams();
  const articleId = parseInt(params.id as string);
  const article = articles.find(a => a.id === articleId);

  if (!article) {
    return (
      <div className="bg-white py-20">
        <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-[#2d5016] hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">

        {/* Hero Section with Overlay */}
        <div className="relative w-full h-fit mb-12 ">
          <img 
            src={article.image} 
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
                <ClockCircleOutlined className="text-xl" />
                <time>{article.date}</time>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <span>{article.category}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article */}
        <article className="bg-white">

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none
              [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:text-base
              [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-secondary [&_h3]:mb-4 [&_h3]:mt-8
              [&_ul]:list-disc [&_ul]:list-inside [&_ul]:mb-6 [&_ul]:space-y-2
              [&_li]:text-gray-700
              [&_figure]:mb-8 [&_figure]:mt-8
              [&_img]:w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:shadow-md"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* Related Posts */}
        <section className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold  mb-6 text-center text-primary items-center justify-center flex gap-3">
            SHARE
          </h3>
          
            <div className="flex flex-row items-center justify-center gap-6">
            {/* Facebook */}
            <Link href="#" className="w-12 h-12 flex items-center justify-center rounded-none" style={{ background: "#3b5998" }}>
              <svg aria-hidden="true" className="w-7 h-7" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="white">< path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
            </Link>
            {/* WhatsApp */}
            <Link href="#" className="w-12 h-12 flex items-center justify-center rounded-none" style={{ background: "#25d366" }}>
              <svg aria-hidden="true" className="w-7 h-7" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
            </Link>
            {/* X (Twitter) */}
            <Link href="#" className="w-12 h-12 flex items-center justify-center rounded-none" style={{ background: "#000" }}>
              <svg aria-hidden="true" className="w-7 h-7" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
            </Link>
            {/* LinkedIn */}
            <Link href="#" className="w-12 h-12 flex items-center justify-center rounded-none" style={{ background: "#0077b5" }}>
              <svg aria-hidden="true" className="w-7 h-7" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
            </Link>
            {/* Email */}
            <Link href="#" className="w-12 h-12 flex items-center justify-center rounded-none" style={{ background: "#e74c3c" }}>
              <svg aria-hidden="true" className="w-7 h-7" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
            </Link>
            {/* Print */}
            <Link href="#" className="w-12 h-12 flex items-center justify-center rounded-none" style={{ background: "#aaa" }}>
              <svg aria-hidden="true" className="w-7 h-7" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"></path></svg>
            </Link>
            </div>
        </section>
      </div>
    </div>
  );
}
