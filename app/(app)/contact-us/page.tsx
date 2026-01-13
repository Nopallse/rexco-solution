"use client";

import React, { useState } from "react";
import { useLanguage } from '@/app/providers/LanguageProvider';

const ContactPage = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with backend/email service
    console.log("Contact form:", form);
    alert(t.pages?.contact?.success_message || "Thank you! We will contact you soon.");
  };

  return (
    <div className="bg-white py-8 sm:py-12 lg:py-20">
      <div className="container mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Form */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6 lg:mb-8">
              {t.pages?.contact?.title || 'Get In Touch'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Two-column rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder={t.pages?.contact?.name || "Name"}
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-md bg-[#eef1fa] px-4 py-3 sm:py-4 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t.pages?.contact?.email || "E-mail"}
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-md bg-[#eef1fa] px-4 py-3 sm:py-4 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="tel"
                  name="phone"
                  placeholder={t.pages?.contact?.phone || "Phone"}
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-md bg-[#eef1fa] px-4 py-3 sm:py-4 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="text"
                  name="subject"
                  placeholder={t.pages?.contact?.subject || "Subject"}
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-md bg-[#eef1fa] px-4 py-3 sm:py-4 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <textarea
                name="message"
                placeholder={t.pages?.contact?.message || "Message"}
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-md bg-[#eef1fa] px-4 py-3 sm:py-4 text-gray-800 h-32 sm:h-40 resize-none text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />

              <button
                type="submit"
                className="mt-2 w-full cursor-pointer bg-secondary text-primary font-bold tracking-wide px-6 sm:px-8 lg:px-10 py-4 sm:py-5 text-sm sm:text-base rounded-md hover:bg-primary hover:text-secondary transition-colors"
              >
                {t.pages?.contact?.send || 'SEND'}
                <svg aria-hidden="true" className="inline-block ml-2 w-4 h-4" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path></svg>
              </button>
            </form>
          </div>

          {/* Right: Contact Information */}
            <div className="flex flex-col h-full">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              {t.pages?.contact?.info_title || 'Contact Information'}
            </h2>
            <div className="bg-primary text-white rounded-xl p-6 sm:p-8 lg:p-10 flex flex-col gap-6 sm:gap-8 flex-1">
              {/* WhatsApp */}
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <div className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 bg-secondary flex items-center justify-center rounded-lg flex-shrink-0">
                {/* Phone Icon */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-primary"
                >
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1V21a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.47a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold">{t.pages?.contact?.whatsapp || 'Whatsapp'}</p>
                <a
                href="https://api.whatsapp.com/send?phone=6287777000966"
                target="_blank"
                rel="noopener noreferrer"
                className="!text-secondary font-bold text-sm sm:text-base break-all"
                >
                6287777000966
                </a>
              </div>
              </div>

              <hr className="opacity-40" />

              {/* Email */}
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <div className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 bg-secondary flex items-center justify-center rounded-lg flex-shrink-0">
                {/* Mail Icon */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-primary"
                >
                <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0l8 5 8-5H4zm16 12V8l-8 5-8-5v10h16z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold">{t.pages?.contact?.email || 'E-mail'}</p>
                <a
                href="mailto:rexco.indonesia@gmail.com"
                className="!text-secondary font-bold uppercase tracking-wide text-sm sm:text-base break-all"
                >
                rexco.indonesia@gmail.com
                </a>
              </div>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
