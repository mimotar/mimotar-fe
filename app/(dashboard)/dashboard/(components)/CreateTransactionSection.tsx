"use client";

import PrimaryButton from "@/app/commons/PrimaryButtons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setStage, setIsOpen } from "@/lib/slices/createTransactionStateSlice";
import CreateTransactionModalContainer from "./CreateTransactionModalContainer";
import TransactionDetailModalSection from "./TransactionDetailModalSection";
import CreateTransactionTermAndAgreement from "./CreateTransactionTermAndAgreement";
import SecondTransactorInfo from "./SecondTransactorInfo";
import CreateTransactionGenerateLink from "./CreateTransactionGenerateLink";
import { useSession } from "next-auth/react";

export default function CreateTransactionSection() {
  const dispatch = useAppDispatch();
  const getCreateTransactionStateModal = useAppSelector(
    (state) => state.createTransactionStateModal,
  );

  const session = useSession();

  return (
    <>
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <div className="flex flex-col">
          <h1 className="font-bold sm:text-2xl text-lg">
            Welcome back, {session?.data?.user?.firstName}
          </h1>
          <p className="text-neutral-900 text-sm">
            Stay updated with the overview of your escrow transactions.
          </p>
        </div>

        <PrimaryButton
          onClick={() => {
            dispatch(setIsOpen(!getCreateTransactionStateModal.isOpen));
            dispatch(setStage(1));
          }}
          className="w-fit sm:px-6 px-3 h-fit sm:py-4 py-2  cursor-pointer"
        >
          Create transaction
        </PrimaryButton>
      </div>

      {getCreateTransactionStateModal.isOpen && (
        <CreateTransactionModalContainer>
          {getCreateTransactionStateModal.stage == 1 && (
            <TransactionDetailModalSection />
          )}

          {getCreateTransactionStateModal.stage == 2 && (
            <CreateTransactionTermAndAgreement />
          )}

          {getCreateTransactionStateModal.stage == 3 && (
            <SecondTransactorInfo />
          )}
          {getCreateTransactionStateModal.stage == 4 && (
            <CreateTransactionGenerateLink />
          )}
        </CreateTransactionModalContainer>
      )}
    </>
  );
}
