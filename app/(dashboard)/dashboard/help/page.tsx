import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { helpdata } from '@/app/data/helpdata';

export default function page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 bg-white min-h-[80vh] pl-2 md:pl-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold sm:text-2xl text-lg">
          Frequently Asked Questions
        </h1>
        <p className=" font-normal max-w-lg">
          Find answers to common questions here. If you can’t find what you are looking for, feel free to <span className=" text-primary">
            contact us</span>
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">

        {
          helpdata.map((data, i) => {
            return (
              <AccordionItem value={`item-${i + 1}`} key={i} className={`border border-gray-300 rounded mb-2 focus-within:border-primary px-2`}>
                <AccordionTrigger className={`
                   p-4 text-left no-underline hover:no-underline focus:outline-none
                  `}>{data.title} </AccordionTrigger>
                <AccordionContent>
                  {data.body}
                </AccordionContent>
              </AccordionItem>
            )
          })
        }
      </Accordion>

    </div>
  )
}
