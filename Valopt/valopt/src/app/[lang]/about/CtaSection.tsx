import { motion, Variants } from "framer-motion";

interface CtaSectionProps {
  heading: string;
  description: string;
  placeholder: string;
  buttonText: string;
}

const fadeInVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 40,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.1,
    },
  },
};

export default function CtaSection({
  heading,
  description,
  placeholder,
  buttonText,
}: CtaSectionProps) {
  return (
    <section className="bg-white dark:bg-[#03042C] py-16 md:py-24">
      <div className="container max-w-8xl mx-auto px-5 md:px-10 lg:px-20">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
          className="bg-[#1D1B84] dark:bg-[#10157A] rounded-2xl p-8 sm:p-10 md:p-16 text-center md:text-start md:flex md:items-center md:justify-between"
        >
          {/* Text Content */}
          <div className="mb-8 md:mb-0 md:max-w-xl">
            <h2 className="text-5xl font-bold text-white dark:text-slate-300 md:text-4xl lg:text-5xl">
              {heading}
            </h2>
            <p className="mt-4 text-lg text-white dark:text-slate-300">
              {description}
            </p>
          </div>

          {/* Email Form */}
          <form className="w-full max-w-md md:ml-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder={placeholder}
                className="w-full max-w-6xl h-14 px-6 rounded-lg text-base text-gray-900 dark:bg-[#080664] dark:text-white ring-transparent"
              />
              <button
                type="submit"
                className="h-14 w-2/4 max-w-2xl bg-[#1D16FF] text-base font-semibold text-white rounded-lg hover:bg-[#e0b123] transition-colors dark:bg-[#03032C]"
              >
                {buttonText}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
