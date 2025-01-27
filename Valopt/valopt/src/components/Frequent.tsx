// FAQ.tsx
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./FAQ";
import { motion } from "framer-motion";

interface Faq {
  id: number;
  faq_heading: string;
  faq_description: string;
}

interface FaqProps {
  heading: string;
  description: string;
  faq: Faq[];
}

export default function FAQ({ heading, description, faq }: FaqProps) {
  return (
    <div className="relative text-gray-800 w-full pb-14">
      <motion.div className="mx-auto max-w-2xl px-6 pt-20 lg:px-8 relative grid gap-12">
        <div className="flex flex-col gap-6 w-full">
          <motion.h2 className="max-w-xl mx-auto text-center text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight dark:text-slate-300">
            {heading}
          </motion.h2>
          <motion.p className="text-center mx-auto mt-2 max-w-2xl dark:text-slate-300">
            {description}
          </motion.p>
          <Accordion type="single" collapsible className="w-full text-left">
            {faq.map((item) => (
              <motion.div key={item.id}>
                <AccordionItem value={`item-${item.id}`}>
                  <AccordionTrigger>
                    <h3 className="text-left py-1 transition-all duration-300 text-lg dark:text-slate-300 no-underline">
                      {item.faq_heading}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm dark:text-slate-300 ">
                      {item.faq_description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </motion.div>
    </div>
  );
}
