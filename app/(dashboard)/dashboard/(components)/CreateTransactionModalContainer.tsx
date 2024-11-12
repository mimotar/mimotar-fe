"use client";

import ModalOverlay from "../../commons/ModalOverlay";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setStage, setIsOpen } from "@/lib/slices/createTransactionStateSlice";
import { RiCheckLine } from "react-icons/ri";

interface CreateTransactionModalContainerProps {
  children: React.ReactNode;
  className?: string;
}
export default function CreateTransactionModalContainer({
  children,
  className,
}: CreateTransactionModalContainerProps) {
  const dispatch = useAppDispatch();
  const getCreateTransactionModalStage = useAppSelector(
    (state) => state.createTransactionStateModal
  );

  return (
    <ModalOverlay
      closeOverLayModal={() => {
        dispatch(setIsOpen(!getCreateTransactionModalStage.isOpen));
      }}
    >
      <section
        className={`flex flex-col ${className} min-w-[730px] h-full bg-white rounded-md shadow-md p-6`}
      >
        <div className="flex flex-col space-y-3 mb-10">
          <div className="flex w-[90%] mx-auto items-center justify-center">
            <div
              className={`${
                getCreateTransactionModalStage.stage > 1
                  ? "border-2 border-[#2DD4BF] "
                  : "bg-black"
              } flex flex-col items-center justify-center rounded-full w-8 h-8 `}
            >
              <RiCheckLine
                className={`text-2xl ${
                  getCreateTransactionModalStage.stage > 1
                    ? "text-[#2DD4BF]"
                    : "text-black"
                }`}
              />
            </div>

            <div className="flex flex-1 h-0.5 bg-gray-200"></div>
            <div
              className={`flex flex-col items-center justify-center rounded-full w-8 h-8 bg-gray-200`}
            >
              <RiCheckLine className={`text-2xl`} />
            </div>
            <div className="flex flex-1 h-0.5 bg-gray-200"></div>

            <div
              className={`flex flex-col items-center justify-center rounded-full w-8 h-8 bg-gray-200`}
            >
              <RiCheckLine className={`text-2xl`} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <h1 className="">Step 1</h1>
              <p className="">Transaction Details</p>
            </div>

            <div className="flex flex-col items-center">
              <h1 className="">Step 2</h1>
              <p className="">Terms and Agreement</p>
            </div>

            <div className="flex flex-col items-center">
              <h1 className="">Step 3</h1>
              <p className="">2nd Transactor&apos;s Info</p>
            </div>
          </div>
        </div>

        <div className="h-full overflow-y-auto">{children}</div>
      </section>
    </ModalOverlay>
  );
}
