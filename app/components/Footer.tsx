'use client';

import React, { useState } from 'react';
import { Button, Input } from 'antd';
import Link from 'next/link';

const socialIcons = [
  { icon: '/images/icon/facebook.png', link: 'https://facebook.com', alt: 'Facebook' },
  { icon: '/images/icon/instagram.png', link: 'https://instagram.com', alt: 'Instagram' },
  { icon: '/images/icon/youtube.png', link: 'https://youtube.com', alt: 'Youtube' },
  { icon: '/images/icon/tik-tok.png', link: 'https://tiktok.com', alt: 'TikTok' }
];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-primary">
      {/* Top Section */}
        <div className="secondary py-1 px-10 text-center">
      </div>

      {/* Main Content */}
      <div className="py-10 border-b border-gray-200">
        <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-8">
            {/* Logo */}
            <div className="md:col-span-2">
              <div className="w-32 sm:w-64 rounded flex items-center justify-center">
                <img src="/images/logo-rexco.png" alt="REXCO Logo" className="w-full h-full object-contain" />
              </div>
            </div>

        

            {/* Official Store */}
            <div className="md:col-span-3">
              <h3 className="font-bold text-lg  text-white mb-2 underline ">PRODUCT</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/category/power-tools" className="text-white text-md font-bold no-underline">
                  REXCO 50 | MULTIPURPOSE LUBRICANT
                  </Link>
                </li>
                <li>
                  <Link href="/category/engine" className="text-white text-md font-bold no-underline">
                  REXCO 18 | SPECIALIST CONTACT CLEANER
                  </Link>
                </li>
                <li>
                  <Link href="/category/accessories" className="text-white text-md font-bold no-underline">
                  REXCO 81 | CARB & INJECTOR CLEANER
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <ul className="space-y-3">
                <li>
                  <Link href="/contact"  className="text-white text-md font-bold no-underline">
                    GALLERY
                  </Link>
                </li>
                <li>
                  <Link href="/service-center"  className="text-white text-md font-bold no-underline">
                    ARTICLE
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <ul className="space-y-3">
                <li>
                  <Link href="/contact"  className="text-white text-md font-bold no-underline">
                    CONTACT US
                  </Link>
                </li>
                <li>
                  <Link href="/service-center"  className="text-white text-md font-bold no-underline">
                    WHERE TO BUY
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg  text-white mb-2 ">FOLLOW US ON</h3>
              <div className="flex gap-1">
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10  flex items-center justify-center transition"
                  >
                    <img src={social.icon} alt={social.alt} className="w-7 h-7 object-contain" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
