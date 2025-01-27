import { motion } from "framer-motion";

interface GuideStep {
  guide_steps_no?: string;
  guide_steps_heading?: string;
  guide_steps_description?: string;
}

interface GuideProps {
  title?: string;
  description?: string;
  items?: GuideStep[];
}

export default function Guide({ title, description, items }: GuideProps) {
  return (
    <section>
      <motion.div
        className="py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-5 py-16 md:px-10 md:py-20 dark:bg-[]">
          <h2 className="text-3xl font-extrabold dark:text-slate-300 md:text-5xl">
            {title || "Default Guide Heading"}
          </h2>
          <p className="mb-6 mt-4 max-w-lg md:mb-10 lg:mb-12 dark:text-slate-300">
            {description || "Default Guide Description"}
          </p>

          <div className="flex flex-col lg:flex-row gap-1">
            {items && items.length > 0 ? (
              items.map((step: GuideStep, index: number) => (
                <motion.div
                  key={index}
                  className="relative flex flex-1 max-w-xs w-full rounded-xl p-6 lg:mx-2 lg:flex-col bg-white shadow-md border border-gray-200 dark:bg-[#184055] dark:border-0"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                >
                  <div className="flex items-center justify-center mb-4 w-24 h-12 text-xl px-2 md:w-16 md:h-16 rounded-full bg-[#75E4A2] text-[#1D1B84] dark:bg-[#001C29] dark:text-slate-300 lg:text-2xl">
                    {step.guide_steps_no || `Step ${index + 1}`}
                  </div>

                  <div className="ml-6 lg:ml-0 flex-grow flex flex-col justify-around">
                    <h3 className="mb-4 text-xl font-semibold dark:text-slate-300">
                      {step.guide_steps_heading || "Default Guide Step Heading"}
                    </h3>
                    <p className="text-sm dark:text-slate-300">
                      {step.guide_steps_description ||
                        "Default Guide Step Description"}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p>No guide steps available.</p>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
