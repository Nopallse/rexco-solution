'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/app/providers/LanguageProvider';

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function GoogleTranslateProvider() {
  const { language } = useLanguage();
  const [isTranslating, setIsTranslating] = useState(false);
  const sourceLang = 'id';

  useEffect(() => {
    // Set cookie untuk pre-select language
    const setCookie = (lang: string) => {
      const value = `/${sourceLang}/${lang}`;
      document.cookie = `googtrans=${value};path=/`;
      document.cookie = `googtrans=${value};path=/;domain=${window.location.hostname}`;
    };

    setIsTranslating(true);
    setCookie(language);

    // Init Google Translate jika belum ada
    if (!document.getElementById('google-translate-script')) {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: sourceLang,
              includedLanguages: 'en,id',
              autoDisplay: false,
            },
            'google_translate_element'
          );
        }
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // Trigger translation setelah script load
    const timer = setTimeout(() => {
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select && select.value !== language) {
        select.value = language;
        select.dispatchEvent(new Event('change'));
      }
      
      // Hide loading after translation applied
      setTimeout(() => setIsTranslating(false), 2000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [language]);

  // Remove banner Google Translate
  useEffect(() => {
    const removeBanner = () => {
      // Remove iframe banner
      const frames = document.querySelectorAll('iframe.goog-te-banner-frame, .goog-te-banner-frame');
      frames.forEach(frame => frame.remove());
      
      // Hide skiptranslate div
      const topDiv = document.querySelector('.skiptranslate') as HTMLElement;
      if (topDiv?.style) {
        topDiv.style.display = 'none';
      }
      
      // Reset body position
      document.body.style.top = '0';
      document.body.style.position = 'static';
    };

    const interval = setInterval(removeBanner, 100);
    removeBanner();

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        id="google_translate_element"
        style={{
          position: 'fixed',
          top: -9999,
          left: -9999,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
      
      {isTranslating && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(2px)',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '24px 48px',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #323288',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
            <p style={{ margin: 0, fontSize: '16px', color: '#323288', fontWeight: 600 }}>
              {language === 'id' ? 'Menerjemahkan...' : 'Translating...'}
            </p>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

