"use client";

import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  TermAndAgreementSchema,
  TermAndAgreementSchemaType,
} from "@/lib/schemas/createTransactionSchema";
import { setIsOpen, setStage } from "@/lib/slices/createTransactionStateSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function SecondTransactorInfo() {
  const getCreateTransactionStateModal = useAppSelector(
    (state) => state.createTransactionStateModal
  );
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TermAndAgreementSchemaType>({
    resolver: zodResolver(TermAndAgreementSchema),
  });

  const handleNext = (data: TermAndAgreementSchemaType) => {
    console.log(data);
    dispatch(setStage(3));
  };
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
          <div className="flex justify-between items-center">
            <PrimaryOutline
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
              Next
              <IoMdArrowBack className="rotate-180" />
            </PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
}
