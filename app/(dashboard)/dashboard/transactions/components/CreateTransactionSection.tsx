"use client";

import PrimaryButton from "@/app/commons/PrimaryButtons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setIsOpen, setStage } from "@/lib/slices/createTransactionStateSlice";
import { useSession } from "next-auth/react";
import CreateTransactionModalContainer from "../../(components)/CreateTransactionModalContainer";
import TransactionDetailModalSection from "../../(components)/TransactionDetailModalSection";
import CreateTransactionTermAndAgreement from "../../(components)/CreateTransactionTermAndAgreement";
import SecondTransactorInfo from "../../(components)/SecondTransactorInfo";
import CreateTransactionGenerateLink from "../../(components)/CreateTransactionGenerateLink";

export default function CreateTransactionSection() {
  const session = useSession();
  const dispatch = useAppDispatch();
  const getCreateTransactionStateModal = useAppSelector(
    (state) => state.createTransactionStateModal,
  );
  return (
    <>
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <PrimaryButton
          onClick={() => {
            dispatch(setIsOpen(!getCreateTransactionStateModal.isOpen));
            dispatch(setStage(1));
          }}
          className="w-fit sm:px-6 px-3 h-fit sm:py-3  py-2  cursor-pointer"
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
