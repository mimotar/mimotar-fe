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
import { useEffect, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { Switch } from "@/components/ui/switch";
import { useFetch } from "@/app/hooks/useFetch";
import { GetSettingsResponse } from "../types/ISetting";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";
import { useMutateAction } from "@/app/hooks/useMutation";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type ICurrency = "NGN" | "USD" | "GBP";
type INotification = "SMS" | "EMAIL" | "BOTH";

type InitiateState = { msg: string; state: "error" | "success" | "" };

export default function TransactionSetting() {
  const [defaultCurrency, setDefaultCurrency] = useState<
    ICurrency | undefined
  >();
  const [notification, setNotification] = useState<INotification | undefined>();

  const queryclient = useQueryClient();

  const { data, isLoading, isError, error } = useFetch<
    GetSettingsResponse,
    Error,
    GetSettingsResponse
  >(["settings"], "settings");

  useEffect(() => {
    if (data?.data) {
      setDefaultCurrency((prev) => prev ?? data?.data?.defaultCurrency);
      setNotification((prev) => prev ?? data?.data?.notificationPreference);
    }
  }, [data]);

  const { isPending, mutateAsync } = useMutateAction<
    GetSettingsResponse,
    {
      defaultCurrency: ICurrency | undefined;
      notificationPreference: INotification | undefined;
    }
  >("put", "settings");

  const handleSubmitSetting = async () => {
    if (!defaultCurrency && !notification) {
      toast.error("Preference are not selected");
      return;
    }

    try {
      await mutateAsync({
        defaultCurrency,
        notificationPreference: notification,
      });

      await queryclient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Preference updated successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || "updating Preference failed");
        return;
      }

      if (error instanceof Error) {
        toast.error(error.message || "updating Preference failed");
        return;
      }

      toast.error("updating Preference failed");
    }
  };

  return (
    <>
      {isLoading ? (
        <section className="flex flex-col h-52 justify-center items-center mt-6 w-full">
          <AiOutlineLoading3Quarters className="text-brand-primary text-2xl animate-spin" />
        </section>
      ) : isError ? (
        <section className="flex flex-col h-52 justify-center items-center mt-6 w-full text-red-300">
          {error.message || "Something went wrong"}
        </section>
      ) : (
        <section className="flex flex-col mt-6 w-full space-y-10 pb-6">
          {/* currency */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <h1 className="text-neutral-900">Default Currency</h1>

              <Select onValueChange={(e) => setDefaultCurrency(e as ICurrency)}>
                <SelectTrigger className="w-[120px] font-bold">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent className="bg-white">
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
                  <Image
                    src={poundFlag}
                    width={20}
                    height={20}
                    alt="pound flag"
                  />{" "}
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
                  <Image
                    src={ngnFlag}
                    width={20}
                    height={20}
                    alt="Nigeria flag"
                  />
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
              onClick={() =>
                setNotification((prev) => (prev === "SMS" ? undefined : "SMS"))
              }
              type="button"
              className="p-2 rounded-md border border-neutral-400 flex justify-between items-center cursor-pointer"
            >
              SMS <Switch id="SMS" checked={notification === "SMS"} />
            </button>

            <button
              onClick={() =>
                setNotification((prev) =>
                  prev === "EMAIL" ? undefined : "EMAIL",
                )
              }
              type="button"
              className="p-2 rounded-md border border-neutral-400 flex justify-between items-center cursor-pointer"
            >
              EMAIL <Switch id="EMAIL" checked={notification === "EMAIL"} />
            </button>
            <button
              onClick={() =>
                setNotification((prev) =>
                  prev === "BOTH" ? undefined : "BOTH",
                )
              }
              type="button"
              className="p-2 rounded-md border border-neutral-400 flex justify-between items-center cursor-pointer"
            >
              BOTH <Switch id="BOTH" checked={notification === "BOTH"} />
            </button>
          </div>

          <button
            onClick={handleSubmitSetting}
            type="button"
            disabled={isPending}
            className="bg-brand-primary text-white cursor-pointer p-2 rounded-md inline-flex gap-1 items-center justify-center"
          >
            Save Settings{" "}
            {isPending && (
              <AiOutlineLoading3Quarters className="text-brand-primary text-xl animate-spin" />
            )}
          </button>
        </section>
      )}
    </>
  );
}
