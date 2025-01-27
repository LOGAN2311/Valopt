"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

interface MenuItem {
  id?: string;
  title: string;
  url?: string;
  menus?: SubmenuItem[];
}

interface SubmenuItem {
  id?: string;
  name: string;
  links?: { id?: string; url: string; name: string }[];
}

interface ApiResponse {
  data: {
    MainMenuItems: MenuItem[];
    Logo?: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface Translations {
  [key: string]: string | Translations;
}

const BASE_URL = "https://api.vaopt.com";

const Navbar: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>("");
  const [translations, setTranslations] = useState<Translations>({});

  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  // Fetch translations from Strapi
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await axios.get<Translations>(
          `${BASE_URL}/api/translations?locale=${language}`
        );
        setTranslations(response.data);
      } catch (error) {
        console.error("Error fetching translations:", error);
      }
    };

    fetchTranslations();
  }, [language]);

  // Set language in localStorage and update state
  const handleLanguageChange = (newLanguage: string) => {
    localStorage.setItem("site-language", newLanguage); // Save to localStorage
    setLanguage(newLanguage); // Update context
    const newPath = `/${newLanguage}${pathname.replace(/^\/[a-z]{2}/, "")}`;
    router.push(newPath); // Update URL
    setIsOpen(false); // Close mobile menu
  };

  // Fetch menu data (client-side only)
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `${BASE_URL}/api/header?populate[0]=MainMenuItems&populate[1]=MainMenuItems.menus&populate[2]=MainMenuItems.menus.links&populate[3]=Logo&locale=${language}`
        );
        const data = response.data;
        console.log("response navbar", response.data);
        setMenuItems(data.data.MainMenuItems);
        setLogoUrl(
          data.data.Logo?.url ? `${BASE_URL}${data.data.Logo.url}` : null
        );
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, [language]);

  // Initialize language from localStorage on mount (client-side only)
  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language");
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
      setLanguage(savedLanguage);
    }
  }, [setLanguage]);

  // Toggle dropdown
  const handleDropdownToggle = useCallback((id: string | null) => {
    setActiveDropdownId((prevId) => (prevId === id ? null : id));
  }, []);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => setIsOpen(false), []);

  // Simple translation function
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: string | Translations = translations;
    for (const k of keys) {
      if (typeof value === "object" && value !== null) {
        value = value[k];
      } else {
        return key; // Fallback to the key if translation not found
      }
    }
    return typeof value === "string" ? value : key;
  };

  return (
    <section className="bg-white/90 dark:bg-[#001C29] backdrop-blur-md text-gray-900 dark:text-white shadow-sm fixed w-full top-0 z-50">
      <nav className="font-inter mx-auto h-auto w-full max-w-screen-2xl">
        <div className="flex flex-col px-6 py-4 justify-center lg:flex-row lg:items-center lg:justify-between lg:px-10 xl:px-20">
          {/* Logo */}
          {logoUrl && (
            <Link href={`/${language}`} passHref>
              <div className="relative">
                <div className="flex items-center">
                  <Image
                    src={logoUrl}
                    alt="Header Logo"
                    width={80}
                    height={35}
                    priority
                    className="h-[35px]"
                  />
                  <p className="font-semibold text-[#313F5B] text-4xl dark:text-slate-300">
                    Valopt<span className="text-[#079C57]">.</span>
                  </p>
                </div>
              </div>
            </Link>
          )}

          {/* Hamburger Menu Button */}
          <button
            className="lg:hidden absolute right-5 top-6 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden mt-4 flex flex-col gap-y-4 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
              >
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex flex-col px-6 py-2"
                  >
                    <button
                      className="flex items-center w-full text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      onClick={() => handleDropdownToggle(item.id!)}
                    >
                      {t(item.title)} {/* Use translations */}
                      {item.menus && <ChevronDown className="w-4 h-4 ml-2" />}
                    </button>
                    {item.menus && activeDropdownId === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 ml-4 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-md"
                      >
                        {item.menus.map((submenu) => (
                          <div
                            key={submenu.id}
                            className="flex flex-col gap-y-2 py-4"
                          >
                            {submenu.links?.map((link) => (
                              <Link
                                key={link.id}
                                href={`/${language}${link.url}`}
                                className="px-5 py-1 hover:bg-[#F0F5FF] dark:hover:bg-gray-700/50 rounded-md text-gray-900 dark:text-white transition-colors"
                                onClick={closeMobileMenu}
                              >
                                {t(link.name)} {/* Use translations */}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}

                {/* Language Switcher for Mobile */}
                <div className="px-6 py-2 flex space-x-4">
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      language === "en"
                        ? "bg-[#4945FF] text-white"
                        : "bg-gray-200/50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                    } transition-colors`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => handleLanguageChange("fr")}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      language === "fr"
                        ? "bg-[#4945FF] text-white"
                        : "bg-gray-200/50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                    } transition-colors`}
                  >
                    FR
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:flex-row lg:items-center lg:space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col"
                onMouseEnter={() => setActiveDropdownId(item.id!)}
                onMouseLeave={() => setActiveDropdownId(null)}
              >
                <Link href={`/${language}${item.url ?? "#"}`} passHref>
                  <button className="flex items-center font-semibold text-[#292875] dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    {t(item.title)} {/* Use translations */}
                    {item.menus && <ChevronDown className="w-4 h-4 ml-1" />}
                  </button>
                </Link>
                {item.menus && activeDropdownId === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-50 w-[200px] min-w-max top-6 left-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg rounded-lg p-4"
                  >
                    {item.menus.map((submenu) => (
                      <div
                        key={submenu.id}
                        className="py-2 flex flex-col gap-y-2"
                      >
                        {submenu.links?.map((link) => (
                          <Link
                            key={link.id}
                            href={`/${language}${link.url}`}
                            className="block px-2 py-2 font-medium hover:bg-[#F0F5FF] dark:hover:bg-gray-700/50 hover:rounded-md text-[#344b80] dark:text-white transition-colors"
                          >
                            {t(link.name)} {/* Use translations */}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            {/* Language Switcher for Desktop */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  language === "en"
                    ? "bg-[#4945FF] text-white"
                    : "bg-gray-200/50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                } transition-colors`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange("fr")}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  language === "fr"
                    ? "bg-[#4945FF] text-white"
                    : "bg-gray-200/50 dark:bg-gray-700/50 text-gray-900 dark:text-white"
                } transition-colors`}
              >
                FR
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200/50 dark:bg-gray-700/50 hover:bg-gray-300/50 dark:hover:bg-gray-600/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </nav>
    </section>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
