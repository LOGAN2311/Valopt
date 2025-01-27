// app/[lang]/contact/ContactPageClient.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";
import ContactForm from "@/components/ContactForm";
import { FormData, ContactData } from "@/app/types";
import { MapPin, Phone, Mail, Clock } from "lucide-react"; // Lucide icons

interface ContactPageClientProps {
  initialData: ContactData;
  lang: string;
}

export default function ContactPageClient({
  initialData,
  lang,
}: ContactPageClientProps) {
  const { language, setLanguage } = useLanguage();
  const [contactData, setContactData] = useState<ContactData>(initialData);
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setLanguage(lang);
  }, [lang, setLanguage]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("");

    if (
      !formData.first_name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setStatus("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const strapiResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-forms`,
        {
          data: {
            first_name: formData.first_name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          },
        }
      );

      if (strapiResponse.status === 201) {
        console.log("Form data saved to Strapi successfully.");
      } else {
        throw new Error(
          `Strapi responded with an unexpected status: ${strapiResponse.status}`
        );
      }

      const emailResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          first_name: formData.first_name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: "New Contact Form Submission",
          from_name: formData.first_name,
        }),
      });

      const emailData = await emailResponse.json();

      if (emailData.success) {
        alert("Your message has been sent successfully!");
        setFormData({
          first_name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error(
          emailData.message || "Something went wrong with email submission."
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus(
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0E2F3F] py-16 mt-8">
      <div className="max-w-7xl mx-auto px-4 pt-12 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold dark:text-white">
            {contactData.contact_page_heading}
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-lg dark:text-gray-300">
            {contactData.contact_page_description}
          </p>
        </div>

        {/* Left and Right Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Contact Information */}
          <div className="space-y-8 pt-10">
            <h2 className="text-2xl font-bold dark:text-white">
              Contact Information
            </h2>
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-full">
                  <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold dark:text-white">
                    Address
                  </h3>
                  <p className="dark:text-gray-300">
                    123 Main Street, City, Country
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 dark:bg-green-900 rounded-full">
                  <Phone className="w-6 h-6 text-green-600 dark:text-green-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold dark:text-white">
                    Phone
                  </h3>
                  <p className="dark:text-gray-300">+1 (123) 456-7890</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-50 dark:bg-purple-900 rounded-full">
                  <Mail className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold dark:text-white">
                    Email
                  </h3>
                  <p className="dark:text-gray-300">info@example.com</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold dark:text-white">
                    Working Hours
                  </h3>
                  <p className="dark:text-gray-300">Mon - Fri: 9 AM - 5 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-[#F9FAFB] dark:bg-[#184055] p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold dark:text-white mb-4">
              {contactData.contact_form_heading}
            </h2>
            <p className="dark:text-gray-300 mb-6">
              {contactData.contact_form_description}
            </p>

            <ContactForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              contactData={contactData}
              status={status}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
