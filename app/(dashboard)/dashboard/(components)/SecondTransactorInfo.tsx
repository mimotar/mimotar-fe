"use client";

import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setStage } from "@/lib/slices/createTransactionStateSlice";
// import { setSecondTransactorInfo } from "@/lib/slices/createTransactionProcessDataSlice";
import {
  resetTransactionDetails,
  setTransactionDetails,
} from "@/lib/slices/createTransactionslice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Suspense, useEffect, useState } from "react";
import { countriesCode } from "@/app/data/CountryCode";
import { useMutateAction } from "@/app/hooks/useMutation";
import toast from "react-hot-toast";
import { AxiosErrorHandler } from "@/app/utils/axiosErrorHandler";
import {
  IStage1TicketSchema,
  IStage4TicketSchema,
  mergedTicketSchema,
  stage4TicketSchema,
} from "@/lib/schemas/CreateTransactionsSchema";
import z from "zod";
import { useSession } from "next-auth/react";
import { ITicketSuccessPayload } from "@/app/types.ts/ITicketSuccessPayload";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { createTicketSuccessPayload } from "@/lib/slices/TicketSuccessSlice";

export default function SecondTransactorInfo() {
  const [countryCode, setCountryCode] = useState<{
    code?: string;
    flag: string;
  }>({ flag: "https://flagcdn.com/16x12/ng.png" });

  const [isFlagDropdown, setIsFlagDropdown] = useState(false);
  const { stepState, transactionData } = useAppSelector((state) => ({
    stepState: state.createTransactionStateModal,
    transactionData: state.createTransaction,
  }));

  const session = useSession();
  const dispatch = useAppDispatch();
  const { isPending, mutate } = useMutateAction<
    { data: ITicketSuccessPayload },
    FormData
  >("post", "ticket");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IStage4TicketSchema>({
    resolver: zodResolver(stage4TicketSchema),
  });

  const onSubmit = async (data: IStage4TicketSchema) => {
    dispatch(setTransactionDetails(data));

    const creatorDetail: IStage1TicketSchema = {
      creator_fullname:
        (session.data?.user.firstName ?? "") +
        " " +
        (session.data?.user?.lastName ?? ""),
      creator_email: session.data?.user?.email as string,
      creator_no: "082728237",
      creator_role: "BUYER" as "SELLER" | "BUYER",
      creator_address: "Jigbo go",
    };
    const mergedData = { ...transactionData, ...data, ...creatorDetail };
    const dashboardCreateTicket = mergedTicketSchema.safeParse(mergedData);

    if (!dashboardCreateTicket.success) {
      const errorMsgObj = dashboardCreateTicket.error;
      let errorMsg = "";

      if (errorMsgObj instanceof z.ZodError) {
        errorMsg = errorMsgObj.errors.map((err) => err.message).join(" | ");
      }

      console.log("error", errorMsg);
      toast.error(errorMsg);
      return;
    }

    const formData = new FormData();

    // Append all fields except 'attachment'
    for (const [key, value] of Object.entries(mergedData)) {
      if (key !== "attachment" && value !== undefined) {
        formData.append(key, String(value));
      }
    }

    // const attachments = transactionData?.attachment as string[] | undefined;

    // if (attachments?.length) {
    //   attachments.forEach((file) => {
    //     formData.append("files", file);
    //   });
    // }
    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });

    // Submit to the server
    mutate(formData, {
      onError: (error) => {
        const errorObj = AxiosErrorHandler(error);
        toast.error(errorObj);
      },
      onSuccess: (data) => {
        console.log("Transaction created successfully:", data);
        dispatch(createTicketSuccessPayload(data.data));
        dispatch(resetTransactionDetails());
        toast.success("Transaction created successfully!");

        dispatch(setStage(4));
      },
    });
  };

  useEffect(() => {
    setValue("receiver_address", transactionData.receiver_address);
    setValue("receiver_fullname", transactionData.receiver_fullname);
    setValue("receiver_no", transactionData.receiver_no);
    setValue("reciever_email", transactionData.reciever_email);
    if (
      transactionData.reciever_role === "BUYER" ||
      transactionData.reciever_role === "SELLER"
    ) {
      setValue("reciever_role", transactionData.reciever_role);
    }
  }, [transactionData, setValue]);

  return (
    <section className="flex flex-col mx-auto sm:w-[580px] w-[95%]">
      <div className="flex flex-col">
        <h1 className="2xl:text-2xl text-xl font-bold">
          Second Transactor&apos;s Info
        </h1>
        <p className="2xl:text-lg  font-light">
          Input the personal details of the other party (whether buyer or
          seller).
        </p>
      </div>

      <div className="flex flex-col h-full w-full mt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col 2xl:gap-8 gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="full_name" className="text-neutral-600">
              Full name
            </label>
            <input
              id="full_name"
              {...register("receiver_fullname")}
              type="text"
              className="p-3 rounded-md border "
              placeholder="First name and Surname"
            />
            {errors.receiver_fullname && (
              <small className="text-red-400">
                {errors.receiver_fullname.message}
              </small>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-neutral-600 inline-flex gap-2"
            >
              Email
              <span className="px-2 bg-neutral-100 rounded-full">Optional</span>
            </label>
            <input
              {...register("reciever_email")}
              type="email"
              id="email"
              className="p-3 rounded-md border "
              placeholder="name@email.com"
            />
            {errors.reciever_email && (
              <small className="text-red-400">
                {errors.reciever_email.message}
              </small>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="phone_number"
              className="text-neutral-600 inline-flex gap-2"
            >
              Phone number
            </label>
            <div className="inline-flex">
              <div className="relative sm:flex hidden justify-between items-center gap-2 border rounded-l-lg w-20 px-2">
                <Image
                  src={countryCode.flag}
                  // {...register("countryCode.flag")}
                  width="20"
                  height="16"
                  alt="Ukraine"
                />

                <RiArrowDropDownLine
                  className={`text-3xl cursor-pointer ${
                    isFlagDropdown ? "rotate-180" : ""
                  }`}
                  onClick={() => setIsFlagDropdown(!isFlagDropdown)}
                />

                {isFlagDropdown && (
                  <div className="absolute top-12 left-0 w-full h-60 bg-white overflow-y-auto space-y-2 p-3">
                    {Object.keys(countriesCode).map((item: string, i) => (
                      <Suspense fallback="Loading ..." key={i}>
                        <Image
                          key={i}
                          onClick={() =>
                            setCountryCode({
                              flag: `https://flagcdn.com/16x12/${item}.webp`,
                            })
                          }
                          src={`https://flagcdn.com/16x12/${item}.webp`}
                          width="20"
                          height="16"
                          className="cursor-pointer"
                          alt=""
                        />
                      </Suspense>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="tel"
                {...register("receiver_no")}
                id="phone_number"
                className="p-3 outline-none border flex-grow rounded-r-lg"
                placeholder="+234"
              />
            </div>

            {errors.receiver_no && (
              <small className="text-red-400">
                {errors.receiver_no.message}
              </small>
            )}
            {/* {errors.countryCode?.flag && (
              <small className="text-red-400">
                {errors.countryCode.flag.message}
              </small>
            )} */}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="text-neutral-600 inline-flex gap-2"
            >
              Address
              <span className="px-2 bg-neutral-100 rounded-full">Optional</span>
            </label>
            <input
              {...register("receiver_address")}
              type="text"
              id="address"
              className="p-3 rounded-md border "
              placeholder="House number, Street, Town/City, State."
            />
            {errors.receiver_address && (
              <small className="text-red-400">
                {errors.receiver_address.message}
              </small>
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="inline-flex gap-2 items-center text-neutral-600 mb-2 font-medium">
              Select the option that describes the person
            </h1>
            <div className="inline-flex gap-8 items-center">
              <div className="inline-flex gap-2 items-center">
                <input
                  type="radio"
                  {...register("reciever_role")}
                  id="optionThatDesPerson_buyer"
                  value={"BUYER"}
                  className="p-2 rounded-md border w-5 h-5 cursor-pointer accent-purple-800"
                />

                <label
                  htmlFor="optionThatDesPerson_buyer"
                  className="text-neutral-900"
                >
                  Buyer
                </label>
              </div>
              <div className="inline-flex gap-2 items-center">
                <input
                  type="radio"
                  {...register("reciever_role")}
                  id="optionThatDesPerson_seller"
                  value="SELLER"
                  className="p-2 rounded-md border w-5 h-5 cursor-pointer accent-purple-800"
                />

                <label
                  htmlFor="optionThatDesPerson_seller"
                  className="text-neutral-900"
                >
                  Seller
                </label>
              </div>
            </div>

            {errors.reciever_role && (
              <small className="text-red-400">
                {errors.reciever_role.message}
              </small>
            )}
          </div>

          <div className="flex justify-between items-center">
            <PrimaryOutline
              type="button"
              onClick={() => dispatch(setStage(2))}
              className="px-6 cursor-pointer"
            >
              <IoMdArrowBack />
              Back
            </PrimaryOutline>

            <PrimaryButton
              type="submit"
              disabled={isPending}
              className="inline-flex cursor-pointer w-fit h-fit justify-center items-center gap-2 px-6 py-2"
            >
              Generate link{" "}
              {isPending && (
                <AiOutlineLoading3Quarters className="animate-spin text-yellow-300" />
              )}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
}
