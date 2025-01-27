import { motion } from "framer-motion";

interface ServiceCard {
  heading?: string;
  description?: string;
}

interface ServicesProps {
  title?: string;
  description?: string;
  items?: ServiceCard[];
}

export default function Services({ title, description, items }: ServicesProps) {
  return (
    <section>
      <div className="bg-[#F6F6FF] dark:bg-[#0E2F3F] text-text-light dark:text-text-dark">
        <motion.div
          className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-extrabold text-center dark:text-slate-300 md:text-5xl mb-6">
            {title || "Default Services Heading"}
          </h2>
          <p className="mb-10 max-w-2xl mx-auto text-center md:mb-12 lg:mb-16 dark:text-slate-300">
            {description || "Default Services Description"}
          </p>

          {/* Grid of service cards */}
          <div className="grid grid-cols-1 max-w-5xl mx-auto sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {items && items.length > 0 ? (
              items.map((service, index) => (
                <motion.div
                  key={index}
                  className="max-w-xs mx-auto bg-white p-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl dark:bg-[#184055] "
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold mb-4 dark:text-slate-300">
                    {service.heading || "Default Service Heading"}
                  </h3>
                  <p className="text-sm text-pretty dark:text-slate-300">
                    {service.description || "Default Service Description"}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No services available.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
