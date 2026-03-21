"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import poundFlag from "../../../../assets/png/poundFlag.png";
import ngnFlag from "../../../../assets/png/nigeriaFlag.png";
import usaFlag from "../../../../assets/png/USAFlag.png";
import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { Switch } from "@/components/ui/switch";

type ICurrency = "NGN" | "USD" | "GBP";
type INotification = "SMS" | "EMAIL" | "BOTH";

export default function TransactionSetting() {
  const [defaultCurrency, setDefaultCurrency] = useState<
    ICurrency | undefined
  >();
  const [notification, setNotification] = useState<INotification | undefined>();
  console.log(notification);
  return (
    <section className="flex flex-col mt-6 w-full space-y-10 pb-6">
      {/* currency */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-neutral-900">Default Currency</h1>

          <Select onValueChange={(e) => setDefaultCurrency(e as ICurrency)}>
            <SelectTrigger className="w-[120px] font-bold">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="NGN">NGN</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-3 mt-4">
          <button
            type="button"
            className="p-2 rounded-md border border-neutral-400 flex justify-between items-center cursor-pointer"
          >
            GBP
            <div className="inline-flex gap-2 items-center">
              <Image src={poundFlag} width={20} height={20} alt="pound flag" />{" "}
              {defaultCurrency === "GBP" && (
                <IoCheckmark className="text-brand-primary" />
              )}
            </div>
          </button>

          <button
            type="button"
            className="p-2 rounded-md border border-neutral-400 flex justify-between items-center cursor-pointer"
          >
            NGN
            <div className="inline-flex gap-2 items-center">
              <Image src={ngnFlag} width={20} height={20} alt="Nigeria flag" />
              {defaultCurrency === "NGN" && (
                <IoCheckmark className="text-brand-primary" />
              )}
            </div>
          </button>

          <button
            type="button"
            className="p-2 rounded-md border border-neutral-400 flex justify-between items-center cursor-pointer"
          >
            USD
            <div className="inline-flex gap-2 items-center">
              <Image src={usaFlag} width={20} height={20} alt="USA flag" />
              {defaultCurrency === "USD" && (
                <IoCheckmark className="text-brand-primary" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Notification Preferences */}

      <div className="flex flex-col space-y-3">
        <h1 className="text-neutral-900">Notification Preferences</h1>
        <button
          onClick={() => setNotification("SMS")}
          type="button"
          className="p-2 rounded-md border border-neutral-400 flex justify-between items-center cursor-pointer"
        >
          SMS <Switch checked={notification === "SMS"} />
        </button>

        <button
          onClick={() => setNotification("EMAIL")}
          type="button"
          className="p-2 rounded-md border border-neutral-400 flex justify-between items-center cursor-pointer"
        >
          EMAIL <Switch checked={notification === "EMAIL"} />
        </button>
        <button
          onClick={() => setNotification("BOTH")}
          type="button"
          className="p-2 rounded-md border border-neutral-400 flex justify-between items-center cursor-pointer"
        >
          BOTH <Switch checked={notification === "BOTH"} />
        </button>
      </div>
    </section>
  );
}
