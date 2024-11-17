"use client";

import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  SecondTransactorInfoSchema,
  SecondTransactorInfoSchemaType,
  TermAndAgreementSchema,
  TermAndAgreementSchemaType,
} from "@/lib/schemas/createTransactionSchema";
import { setIsOpen, setStage } from "@/lib/slices/createTransactionStateSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Suspense, useEffect, useState } from "react";
import axiosService from "@/lib/services/axiosService";
import axios from "axios";
import { countriesCode } from "@/app/data/CountryCode";

export default function SecondTransactorInfo() {
  const [countryCode, setCountryCode] = useState<{
    code?: string;
    flag: string;
  }>({ flag: "https://flagcdn.com/16x12/ng.png" });

  const [isFlagDropdown, setIsFlagDropdown] = useState(false);
  const getCreateTransactionStateModal = useAppSelector(
    (state) => state.createTransactionStateModal
  );
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SecondTransactorInfoSchemaType>({
    resolver: zodResolver(SecondTransactorInfoSchema),
    defaultValues: {
      countryCode: { flag: countryCode.flag },
    },
  });

  const handleNext = (data: SecondTransactorInfoSchemaType) => {
    console.log(data);
    dispatch(setStage(4));
  };
  console.log(errors);

  return (
    <section className="flex flex-col mx-auto sm:w-[580px] w-[90%]">
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
          onSubmit={handleSubmit(handleNext)}
          className="flex flex-col 2xl:gap-8 gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="full_name" className="text-neutral-600">
              Full name
            </label>
            <input
              id="full_name"
              {...register("full_name")}
              type="text"
              className="p-3 rounded-md border "
              placeholder="First name and Surname"
            />
            {errors.full_name && (
              <small className="text-red-400">{errors.full_name.message}</small>
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
              {...register("email")}
              type="email"
              id="email"
              className="p-3 rounded-md border "
              placeholder="name@email.com"
            />
            {errors.email && (
              <small className="text-red-400">{errors.email.message}</small>
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
              <div className="relative flex justify-between items-center gap-2 border rounded-l-lg w-20 px-2">
                <Image
                  src={countryCode.flag}
                  {...register("countryCode.flag")}
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
                {...register("phone_number")}
                id="phone_number"
                className="p-3 outline-none border flex-grow rounded-r-lg"
                placeholder="+234"
              />
            </div>

            {errors.phone_number && (
              <small className="text-red-400">
                {errors.phone_number.message}
              </small>
            )}
            {errors.countryCode?.flag && (
              <small className="text-red-400">
                {errors.countryCode.flag.message}
              </small>
            )}
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
              {...register("address")}
              type="text"
              id="address"
              className="p-3 rounded-md border "
              placeholder="House number, Street, Town/City, State."
            />
            {errors.address && (
              <small className="text-red-400">{errors.address.message}</small>
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
                  {...register("optionThatDesPerson")}
                  id="optionThatDesPerson_buyer"
                  value={"Buyer (100%)"}
                  className="p-2 rounded-md border w-5 h-5 cursor-pointer accent-purple-800"
                />

                <label
                  htmlFor="optionThatDesPerson_buyer"
                  className="text-neutral-900"
                >
                  Buyer (100%)
                </label>
              </div>
              <div className="inline-flex gap-2 items-center">
                <input
                  type="radio"
                  {...register("optionThatDesPerson")}
                  id="optionThatDesPerson_seller"
                  value="Seller (100%)"
                  className="p-2 rounded-md border w-5 h-5 cursor-pointer accent-purple-800"
                />

                <label
                  htmlFor="optionThatDesPerson_seller"
                  className="text-neutral-900"
                >
                  Seller (100%)
                </label>
              </div>
            </div>

            {errors.optionThatDesPerson && (
              <small className="text-red-400">
                {errors.optionThatDesPerson.message}
              </small>
            )}
          </div>

          <div className="flex justify-between items-center">
            <PrimaryOutline
              type="button"
              onClick={() => dispatch(setStage(2))}
              className="px-6"
            >
              <IoMdArrowBack />
              Back
            </PrimaryOutline>

            <PrimaryButton
              type="submit"
              className="inline-flex w-fit h-fit justify-center items-center gap-2 px-6 py-2"
            >
              Generate link
            </PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
}
