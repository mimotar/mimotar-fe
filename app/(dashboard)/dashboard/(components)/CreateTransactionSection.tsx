"use client";

import PrimaryButton from "@/app/commons/PrimaryButtons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setStage, setIsOpen } from "@/lib/slices/createTransactionStateSlice";
import CreateTransactionModalContainer from "./CreateTransactionModalContainer";
import TransactionDetailModalSection from "./TransactionDetailModalSection";
import CreateTransactionTermAndAgreement from "./CreateTransactionTermAndAgreement";
import SecondTransactorInfo from "./SecondTransactorInfo";
import CreateTransactionGenerateLink from "./CreateTransactionGenerateLink";

export default function CreateTransactionSection() {
  const dispatch = useAppDispatch();
  const getCreateTransactionStateModal = useAppSelector(
    (state) => state.createTransactionStateModal
  );

  return (
    <>
      <PrimaryButton
        onClick={() => {
          dispatch(setIsOpen(!getCreateTransactionStateModal.isOpen));
          dispatch(setStage(1));
        }}
        className="w-fit sm:px-6 px-3 h-fit sm:py-4 py-2"
      >
        Create transaction
      </PrimaryButton>
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
