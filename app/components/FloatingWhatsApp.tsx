'use client';

import React from 'react';

const FloatingWhatsApp: React.FC = () => {
  const url = 'https://api.whatsapp.com/send?phone=6287777000966&text=Hi,%20Saya%20tertarik%20dengan%20produk%20yang%20ditawarkan%20https://rexco-solution.com//contact-us/';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 h-16 w-16 bg-[#25D366] shadow-lg flex items-center justify-center hover:brightness-105 border-2 border-white"
      aria-label="WhatsApp Chat"
      style={{ borderRadius: '50%' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-8 w-8">
        <path d="M20.52 3.48A11.86 11.86 0 0012.07 0C5.46 0 .08 5.38.08 12a11.84 11.84 0 001.6 6l-1.68 6 6.19-1.63a11.84 11.84 0 005.9 1.58h.01c6.61 0 12-5.38 12-12a11.86 11.86 0 00-3.58-8.47zM12.1 21.34a9.32 9.32 0 01-4.75-1.3l-.34-.2-3.67.97.98-3.57-.22-.37a9.3 9.3 0 01-1.38-4.97c0-5.15 4.2-9.35 9.38-9.35 2.5 0 4.85.97 6.62 2.73a9.29 9.29 0 012.75 6.62c0 5.15-4.2 9.35-9.37 9.35zm5.4-7.03c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.63.15-.19.29-.73.94-.9 1.13-.16.2-.33.22-.62.08-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.43-1.72-1.6-2.01-.17-.29-.02-.45.13-.6.14-.14.29-.36.44-.54.15-.18.2-.31.3-.5.1-.19.05-.37-.02-.52-.08-.15-.63-1.52-.86-2.08-.23-.56-.46-.48-.63-.49h-.54c-.19 0-.5.07-.76.37-.26.29-1 1-1 2.42s1.03 2.81 1.17 3c.14.19 2.03 3.1 4.91 4.35.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.12.56-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z" />
      </svg>
    </a>
  );
};

export default FloatingWhatsApp;
