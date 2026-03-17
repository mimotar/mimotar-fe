import { IoFilterOutline } from "react-icons/io5";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

export default function DisputeFilter() {
  const [openFilter, setOpenFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date("2025-06-01"));
  const [dateTo, setDateTo] = useState<Date | undefined>(
    new Date("2025-06-01"),
  );
  const [month, setMonth] = useState<Date | undefined>(date);
  const [monthTo, setMonthTo] = useState<Date | undefined>(date);
  const [value, setValue] = useState(formatDate(date));
  const [valueTo, setValueTo] = useState(formatDate(date));

  function formatDate(date: Date | undefined) {
    if (!date) {
      return "";
    }

    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function isValidDate(date: Date | undefined) {
    if (!date) {
      return false;
    }
    return !isNaN(date.getTime());
  }
  return (
    <div className="flex justify-end relative">
      <button
        type="button"
        onClick={() => setOpenFilter(!openFilter)}
        className="flex gap-2 items-center border cursor-pointer rounded-md py-1 px-2 text-neutral-900 "
      >
        <IoFilterOutline />
        Filter
      </button>
      {openFilter && (
        <div className="absolute top-10 bg-white rounded-md p-2 shadow-md sm:w-80 w-[90%] right-0 flex flex-col space-y-3">
          <Accordion
            type="multiple"
            className="max-w-lg"
            defaultValue={["notifications"]}
          >
            {/* status */}
            <AccordionItem key="status" value="status" className="border-b-0">
              <AccordionTrigger className="bg-[#FDF4FF] p-2 text-neutral-900 rounded-md">
                Status
              </AccordionTrigger>
              <AccordionContent className="inline-flex gap-4 flex-wrap items-center">
                <div className="inline-flex gap-1  items-center">
                  <input
                    type="checkbox"
                    name="negotiation"
                    value={"negotiation"}
                    id="negotiation"
                  />
                  <label htmlFor="negotiation">In Negotiation</label>
                </div>
                <div className="inline-flex gap-1  items-center">
                  <input
                    type="checkbox"
                    name="review"
                    value={"review"}
                    id="review"
                  />
                  <label htmlFor="review">In Review</label>
                </div>

                <div className="inline-flex gap-1  items-center">
                  <input
                    type="checkbox"
                    name="resolved"
                    value={"resolved"}
                    id="resolved"
                  />
                  <label htmlFor="resolved">Resolved</label>
                </div>

                <div className="inline-flex gap-1  items-center">
                  <input
                    type="checkbox"
                    name="cancelled"
                    value={"cancelled"}
                    id="cancelled"
                  />
                  <label htmlFor="cancelled">Cancelled</label>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* amount */}
            <AccordionItem key="status" value="amount" className="border-b-0">
              <AccordionTrigger className="bg-[#FDF4FF] p-2 rounded-md  text-neutral-900">
                Amount
              </AccordionTrigger>
              <AccordionContent className="grid grid-cols-2 gap-4 items-center">
                <input
                  type="number"
                  name=""
                  className="p-2 rounded-md border border-neutral-300"
                  placeholder="min"
                />

                <input
                  type="number"
                  name=""
                  className="p-2 rounded-md border border-neutral-300"
                  placeholder="max"
                />
              </AccordionContent>
            </AccordionItem>

            {/* date */}
            <AccordionItem key="date" value="date" className="border-b-0">
              <AccordionTrigger className="bg-[#FDF4FF] p-2  rounded-md text-neutral-900">
                Date
              </AccordionTrigger>
              <AccordionContent className="grid grid-cols-2 gap-4 items-center  ">
                <Field className="mx-auto">
                  {/* <FieldLabel htmlFor="date-required">From</FieldLabel> */}
                  <InputGroup>
                    <InputGroupInput
                      id="date-required"
                      value={value}
                      placeholder="From"
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        setValue(e.target.value);
                        if (isValidDate(date)) {
                          setDate(date);
                          setMonth(date);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setOpen(true);
                        }
                      }}
                    />
                    <InputGroupAddon align="inline-end">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <InputGroupButton
                            id="date-picker"
                            variant="ghost"
                            size="icon-xs"
                            aria-label="Select date"
                          >
                            <CalendarIcon />
                            <span className="sr-only">Select date</span>
                          </InputGroupButton>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0 bg-white"
                          align="end"
                          alignOffset={-8}
                          sideOffset={10}
                        >
                          <Calendar
                            mode="single"
                            selected={date}
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(date) => {
                              setDate(date);
                              setValue(formatDate(date));
                              setOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>

                <Field className="mx-auto">
                  <InputGroup>
                    <InputGroupInput
                      id="date-required"
                      value={valueTo}
                      placeholder="To"
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        setValueTo(e.target.value);
                        if (isValidDate(dateTo)) {
                          setDateTo(date);
                          setMonthTo(date);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setOpenTo(true);
                        }
                      }}
                    />
                    <InputGroupAddon align="inline-end">
                      <Popover open={openTo} onOpenChange={setOpenTo}>
                        <PopoverTrigger asChild>
                          <InputGroupButton
                            id="date-picker"
                            variant="ghost"
                            size="icon-xs"
                            aria-label="Select date"
                          >
                            <CalendarIcon />
                            <span className="sr-only">Select date</span>
                          </InputGroupButton>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0 bg-white"
                          align="end"
                          alignOffset={-8}
                          sideOffset={10}
                        >
                          <Calendar
                            mode="single"
                            selected={dateTo}
                            month={monthTo}
                            onMonthChange={setMonthTo}
                            onSelect={(date) => {
                              setDateTo(date);
                              setValueTo(formatDate(date));
                              setOpenTo(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex sm:justify-end items-center gap-2 mt-4">
            <button
              type="button"
              className="border border-brand-primary py-1 px-4 text-brand-primary cursor-pointer rounded-md"
            >
              Clear all
            </button>
            <button
              type="button"
              className=" bg-brand-primary py-1 px-4 text-white cursor-pointer rounded-md"
            >
              {" "}
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
