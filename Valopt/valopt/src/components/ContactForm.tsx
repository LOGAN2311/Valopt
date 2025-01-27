"use client";
import React from "react";

export default function ContactForm({
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
  contactData,
  status,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* First Name */}
      <div>
        <label
          htmlFor="first_name"
          className="block text-sm font-medium dark:text-gray-300"
        >
          {contactData.first_name_label}
        </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#7C3AED] focus:border-[#7C3AED] dark:bg-gray-700 dark:text-white"
          placeholder={contactData.first_name_placeholder}
          required
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium dark:text-gray-300"
        >
          {contactData.email_label}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#7C3AED] focus:border-[#7C3AED] dark:bg-gray-700 dark:text-white"
          placeholder={contactData.email_placeholder}
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium dark:text-gray-300"
        >
          {contactData.phone_label}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#7C3AED] focus:border-[#7C3AED] dark:bg-gray-700 dark:text-white"
          placeholder={contactData.phone_placeholder}
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium dark:text-gray-300"
        >
          {contactData.message_label}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-[#7C3AED] focus:border-[#7C3AED] dark:bg-gray-700 dark:text-white"
          placeholder={contactData.message_placeholder}
          rows="4"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-[#4945FF] text-white font-semibold rounded-md hover:bg-[#3C82F6] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : contactData.submit_button_label}
      </button>

      {/* Status Message */}
      {status && (
        <p className="mt-4 text-sm text-red-500 dark:text-red-400">{status}</p>
      )}
    </form>
  );
}
