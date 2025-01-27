"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { div } from "framer-motion/client";

interface FooterLogo {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

interface LinkItem {
  name: string;
  url: string;
}

interface MenuItem {
  heading: string;
  links: LinkItem[];
}

interface FooterColumn {
  heading: string;
  menus: MenuItem[];
}

interface FooterContactIcon {
  id: number;
  url: string;
  alternative_text: string;
  footer_contact_text: string;
}

interface FooterTerms {
  id: number;
  name: string;
  url: string | null;
}

interface FooterSocialIcon {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  url: string;
}

interface FooterData {
  Footer_Logo: FooterLogo;
  footer_social_icon: FooterSocialIcon[];
  footer_columns: FooterColumn[];
  footer_contact_icons: FooterContactIcon[];
  footer_terms: FooterTerms[];
  footer_copyright: string;
  footer_text: string;
}

const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const params = useParams();
  const locale = params.lang;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: FooterData }>(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/footer`,
          {
            params: {
              locale,
              populate: [
                "Footer_Logo",
                "footer_columns",
                "footer_columns.menus.links",
                "footer_contact_icons",
                "footer_terms",
                "footer_social_icon",
              ],
            },
          }
        );

        setFooterData(response.data.data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchData();
  }, [locale]);

  if (!footerData) {
    return <div>Loading...</div>;
  }

  const {
    Footer_Logo,
    footer_columns = [],
    footer_contact_icons = [],
    footer_terms = [],
    footer_text,
    footer_copyright,
    footer_social_icon,
  } = footerData;

  const currentYear = new Date().getFullYear();
  const formattedCopyright = footer_copyright
    ? footer_copyright.replace(/(\d{4})/, currentYear.toString())
    : `${currentYear}`;

  const socialIcons = Array.isArray(footer_social_icon)
    ? footer_social_icon
    : [footer_social_icon];

  return (
    <footer className="bg-white dark:bg-[#001C29] text-gray-900 dark:text-white">
      {/* Divider */}
      <div className="mx-auto w-full border border-gray-100 dark:border-gray-700"></div>

      {/* Footer Content */}
      <div className="flex flex-col w-full px-4 py-6 md:px-10 md:py-10 lg:w-4/5 lg:mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-10">
          {/* Logo Section */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center">
              {Footer_Logo && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${Footer_Logo.url}`}
                  alt={Footer_Logo.alternativeText || "Default Logo Alt Text"}
                  width={80}
                  height={35}
                  className="h-[35px] text-[#344b80]"
                />
              )}
              <p className="font-semibold text-[#313F5B] text-4xl dark:text-slate-300">
                Valopt<span className="text-[#079C57]">.</span>
              </p>
            </div>
            <p className="font-inter mt-4 text-sm md:text-base text-center lg:text-left max-w-[19.8rem] font-light dark:text-slate-300">
              {footer_text}
            </p>

            {/* Social Icons */}
            <div className="flex flex-row gap-2 mt-4 justify-center lg:justify-start">
              {socialIcons.length > 0 ? (
                socialIcons.map((social: FooterSocialIcon, index: number) => (
                  <Link
                    key={social.id || index}
                    href="#"
                    className="p-2 rounded-lg flex items-center border border-gray-300 dark:border-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${social.url}`}
                      alt={
                        social.alternativeText || social.name || "Social Icon"
                      }
                      width={24}
                      height={24}
                      className="dark:filter dark:invert"
                    />
                  </Link>
                ))
              ) : (
                <div>No social icons available.</div>
              )}
            </div>
          </div>

          {/* Footer Columns */}
          <div className="grid grid-cols-2 gap-6 mt-8 lg:flex lg:grow lg:justify-between lg:mt-0">
            {footer_columns.map((column, columnIndex) => (
              <div
                key={column.heading || columnIndex}
                className="flex flex-col space-y-3"
              >
                <h2 className="font-inter font-medium text-black dark:text-[#F5C228] text-sm md:text-base">
                  {column.heading}
                </h2>
                {column.menus.map((menu, menuIndex) => (
                  <div
                    key={menu.heading || menuIndex}
                    className="flex flex-col gap-y-3"
                  >
                    {menu.links.map((link, linkIndex) => (
                      <Link
                        key={link.url || linkIndex}
                        href={link.url || "#"}
                        className="font-inter font-light text-[#344b80] text-sm md:text-base leading-8 dark:text-slate-300"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Location & Support */}
          <div className="flex flex-col mt-8 gap-y-3 lg:mt-0">
            {footer_contact_icons.length > 0 ? (
              footer_contact_icons.map((contact) => (
                <div key={contact.id} className="flex items-center gap-x-3">
                  <Image
                    src={contact.url}
                    alt={contact.alternative_text || "Contact Icon"}
                    width={30}
                    height={30}
                    className="w-6 h-6 fill-red md:w-8 md:h-8 dark:filter dark:invert dark:fill-slate-300"
                  />
                  <span className="font-inter font-light text-[#344b80] text-sm md:text-base dark:text-slate-300">
                    {contact.footer_contact_text || "No contact text available"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-slate-300 py-5">
                No contact icons available
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto my-6 w-5/6 border border-gray-100 dark:border-gray-700 lg:my-5"></div>

      {/* Copyright and Terms */}
      <div className="flex flex-col max-w-screen-2xl mx-auto md:max-w-screen-xl lg:flex-row justify-between items-center text-center gap-y-4 pb-4 px-4">
        <p className="font-inter text-sm dark:text-slate-300">
          {formattedCopyright}
        </p>
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
          {footer_terms.length > 0 ? (
            footer_terms.map((term, index) => (
              <span key={term.id} className="mx-1">
                <Link
                  href={term.url || "#"}
                  className="font-inter text-sm text-[#344b80] dark:text-slate-300"
                >
                  {term.name}
                </Link>
                {index < footer_terms.length - 1 && <span> |</span>}
              </span>
            ))
          ) : (
            <span>No terms available</span>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
