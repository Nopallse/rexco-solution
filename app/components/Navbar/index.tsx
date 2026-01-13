"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/app/providers/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "antd";
import { SearchOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import styles from "./navbar.module.css";
import { listProducts, ProductDto } from "@/app/lib/product-client";

interface MenuItem {
  key: string;
  label: string | React.ReactNode;
  href?: string;
  children?: MenuItem[];
}


const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

  const pathname = usePathname();

  // Derive active menu from current path
  useEffect(() => {
    const p = pathname || "/";
    if (p.startsWith("/product/")) {
      setActiveMenuItem("product");
    } else if (p === "/brochures" || p === "/documents") {
      setActiveMenuItem("documents");
    } else if (p.startsWith("/blogs")) {
      setActiveMenuItem("articles");
    } else if (p.startsWith("/gallery")) {
      setActiveMenuItem("gallery");
    } else if (p.startsWith("/where-to-buy")) {
      setActiveMenuItem("where-to-buy");
    } else if (p.startsWith("/contact-us")) {
      setActiveMenuItem("contact-us");
    } else {
      setActiveMenuItem(null);
    }
  }, [pathname]);

  // Fetch products from BE
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await listProducts();
        setProducts(data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Build menu items dynamically
  const menuItems: MenuItem[] = [
    {
      key: "product",
      label: t.nav?.product || "Product",
      children: loadingProducts
        ? [{ key: "loading", label: t.nav?.loading || "Loading...", href: "#" }]
        : products.map((product) => ({
            key: product.slug,
            label: product.name,
            href: `/product/${product.slug}`,
          })),
    },
    {
      key: "documents",
      label: t.nav?.documents || "Documents",
      children: [
        { key: "brochures", label: t.nav?.brochures || "Brochures", href: "/brochures" },
        { key: "documents-msds-tds", label: t.nav?.msds_tds || "MSDS DAN TDS", href: "/documents" },
      ],
    },
    { key: "articles", label: t.nav?.articles || "Articles", href: "/blogs" },
    { key: "gallery", label: t.nav?.gallery || "Gallery", href: "/gallery" },
    { key: "where-to-buy", label: t.nav?.where_to_buy || "Where To Buy", href: "/where-to-buy" },
    { key: "contact-us", label: t.nav?.contact_us || "Contact Us", href: "/contact-us" },
  ];

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setOpenSubmenu(null);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const switchLanguage = (lang: "en" | "id") => {
    setLanguage(lang);
  };

  const toggleSubmenu = (key: string) => {
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  return (
    <>
      {/* Top Bar - Purple with Logo - Sticky */}
      <div className="bg-[#323288] w-full shadow-md">
        <div className="max-w-[1400px] mx-auto px-8 flex justify-center">
          <Link href="/" className="inline-flex items-center py-4">
            <Image
              src="/images/logo-rexco.png"
              alt="Rexco Logo"
              width={180}
              height={60}
              priority
              className="h-24 w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Main Navigation - Sticky below topbar */}
      <header className="w-full bg-white sticky top-0 z-50 shadow-md">
        <div className="h-2.5 bg-[#ffd300]"></div>

        <div className="flex items-center justify-between gap-6 px-8 py-3 max-w-[1400px] mx-auto">
          {/* Hamburger Menu - Mobile */}
          <button
            className="lg:hidden flex items-center justify-center p-2 text-[#1d1b1b] hover:bg-gray-100 rounded transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <CloseOutlined className="text-2xl" />
            ) : (
              <MenuOutlined className="text-2xl" />
            )}
          </button>

          {/* Desktop Logo & Menu */}
          <nav className="hidden lg:flex flex-1 items-center gap-8">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/logo-rexco-secondary.png"
                alt="Rexco Logo"
                width={180}
                height={60}
                priority
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="flex items-center gap-1">
              {menuItems.map((item) => (
                <div key={item.key} className={styles.desktopMenuItem}>
                  {item.children ? (
                    <div className={styles.desktopMenuDropdown}>
                      <button className={`${styles.desktopMenuButton} ${activeMenuItem === item.key ? '!border-b-3 !border-secondary' : ''}`}>
                        {item.label}
                        <svg aria-hidden="true" className="w-3 h-3 ml-1" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>
                      </button>
                      <div className={styles.desktopMenuPanel}>
                        {item.children.map((child) => (
                          <Link
                            key={child.key}
                            href={child.href || "#"}
                            className={styles.desktopMenuLink}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link href={item.href || "#"} className={`${styles.desktopMenuButton} ${activeMenuItem === item.key ? '!border-b-3 !border-secondary' : ''}`} onClick={() => setActiveMenuItem(item.key)}>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button - Mobile */}
            

            {/* Search Input - Desktop */}
            <Input
              size="large"
              allowClear
              prefix={<SearchOutlined className="text-gray-400" />}
              placeholder={t.nav?.search_placeholder || "Type to searching"}
              className="hidden lg:block w-full max-w-[220px] rounded-full"
            />

            {/* Language Switcher - Desktop */}
            <div className="hidden lg:flex items-center gap-1.5 bg-gray-100 p-1 rounded-lg">
              <button
                type="button"
                className={`w-9 h-8 rounded-md border-none cursor-pointer flex items-center justify-center transition-all ${
                  language === "en"
                    ? "bg-white shadow-sm"
                    : "bg-transparent hover:bg-gray-200"
                }`}
                onClick={() => switchLanguage("en")}
                aria-label="English"
              >
                <img
                  src="/images/flags/uk.png"
                  alt="English"
                  className="w-6 h-4 object-cover rounded-sm"
                />
              </button>
              <button
                type="button"
                className={`w-9 h-8 rounded-md border-none cursor-pointer flex items-center justify-center transition-all ${
                  language === "id"
                    ? "bg-white shadow-sm"
                    : "bg-transparent hover:bg-gray-200"
                }`}
                onClick={() => switchLanguage("id")}
                aria-label="Bahasa Indonesia"
              >
                <img
                  src="/images/flags/indonesia.png"
                  alt="Indonesia"
                  className="w-6 h-4 object-cover rounded-sm"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchVisible && (
          <div className="lg:hidden px-4 py-3 border-t border-gray-200 bg-white">
            <Input
              size="large"
              allowClear
              autoFocus
              prefix={<SearchOutlined className="text-gray-400" />}
              placeholder="Search Model, Product, etc"
              className="w-full rounded-full"
            />
          </div>
        )}

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-[calc(100vh-180px)]" : "max-h-0"
          }`}
        >
          <nav className="bg-white border-t border-gray-200">
            <div className="max-h-[calc(100vh-240px)] overflow-y-auto">
              {menuItems.map((item) => (
                <div key={item.key} className="border-b border-gray-100">
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.key)}
                        className="w-full flex items-center justify-between px-6 py-4 text-[#323288] font-semibold uppercase text-sm tracking-wide hover:bg-gray-50 transition-colors"
                      >
                        <span>{item.label}</span>
                        <svg
                          aria-hidden="true"
                          className={`w-3 h-3 transition-transform duration-200 ${
                            openSubmenu === item.key ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 320 512"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                        >
                          <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
                        </svg>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openSubmenu === item.key ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <div className="bg-gray-50">
                          {item.children.map((child) => (
                            <Link
                              key={child.key}
                              href={child.href || "#"}
                              onClick={toggleMobileMenu}
                              className="block px-10 py-3 text-[#323288] font-medium text-sm hover:bg-gray-100 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={() => {
                        toggleMobileMenu();
                        setActiveMenuItem(item.key);
                      }}
                      className="block px-6 py-4 text-[#323288] font-semibold uppercase text-sm tracking-wide hover:bg-gray-50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Language Switcher - Mobile */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {t.nav?.language || "Language"}
                </span>
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-gray-200">
                  <button
                    type="button"
                    className={`w-9 h-8 rounded-md border-none cursor-pointer flex items-center justify-center transition-all ${
                      language === "en"
                        ? "bg-gray-100 shadow-sm"
                        : "bg-transparent hover:bg-gray-50"
                    }`}
                    onClick={() => switchLanguage("en")}
                    aria-label="English"
                  >
                    <img
                      src="/images/flags/uk.png"
                      alt="English"
                      className="w-6 h-4 object-cover rounded-sm"
                    />
                  </button>
                  <button
                    type="button"
                    className={`w-9 h-8 rounded-md border-none cursor-pointer flex items-center justify-center transition-all ${
                      language === "id"
                        ? "bg-gray-100 shadow-sm"
                        : "bg-transparent hover:bg-gray-50"
                    }`}
                    onClick={() => switchLanguage("id")}
                    aria-label="Bahasa Indonesia"
                  >
                    <img
                      src="/images/flags/indonesia.png"
                      alt="Indonesia"
                      className="w-6 h-4 object-cover rounded-sm"
                    />
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Overlay - Mobile */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
          style={{ top: "var(--navbar-height, 180px)" }}
        />
      )}
    </>
  );
};

export default Navbar;