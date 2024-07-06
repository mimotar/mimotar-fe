"use client";

import Input from "@/app/commons/Input";
import PrimaryButton from "@/app/commons/PrimaryButtons";
import RadioInput from "@/app/commons/RadioInput";
import SecondaryButton from "@/app/commons/SecondaryButton";
import TextAreaInput from "@/app/commons/TextAreaInput";
import Link from "next/link";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function StepThree() {
  const navigate = useRouter();
  return (
    <section className="flex flex-col w-full h-full">
      <h1 className="font-bold text-lg">Terms and Agreement</h1>
      <h3>
        Everything that should determine how the transaction goes. Both parties
        must agree to this.
      </h3>

      <div className="space-y-5 mt-6 ">
        <div className="flex flex-col">
          <p className="inline-flex items-center  gap-1 font-semibold">
            Who will pay the escrow fee?{" "}
            <Link title="gddgdbdhvjdhdh" href={"#"}>
              <AiOutlineExclamationCircle className="inline-flex" />
            </Link>
          </p>
          <div className="flex sm:flex-row flex-col gap-3 items-center w-full mt-2">
            <RadioInput
              labelClassName=""
              type="radio"
              id="buyer"
              name="buyer"
              labelName="Buyer (100%)"
              className="text-base h-4 w-4"
            />
            <RadioInput
              type="radio"
              id="seller"
              name="seller"
              labelName="Seller (100%)"
              className="text-base h-4 w-4"
            />

            <RadioInput
              type="radio"
              id="both"
              name="both"
              labelName="Both (50% - 50%)"
              className="text-base h-4 w-4"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p className="inline-flex items-center  gap-1 font-semibold">
            How long is the inspection period?{" "}
            <Link title="gddgdbdhvjdhdh" href={"#"}>
              <AiOutlineExclamationCircle className="inline-flex" />
            </Link>
          </p>
          <Input isShowLabel={false} placeholder="between 1 to 30 days" />
        </div>

        <div className="flex flex-col">
          <p className="inline-flex items-center  gap-1 font-semibold">
            Who will pay shipping costs?{" "}
            <Link title="gddgdbdhvjdhdh" href={"#"}>
              <AiOutlineExclamationCircle className="inline-flex" />
            </Link>
          </p>
          <div className="flex sm:flex-row flex-col gap-3 items-center w-full mt-2">
            <RadioInput
              type="radio"
              id="buyer"
              name="buyer"
              labelName="Buyer (100%)"
              className="text-base h-4 w-4"
            />
            <RadioInput
              type="radio"
              id="seller"
              name="seller"
              labelName="Seller (100%)"
              className="text-base h-4 w-4"
            />

            <RadioInput
              type="radio"
              id="both"
              name="both"
              labelName="Both (50% - 50%)"
              className="text-base h-4 w-4"
            />
          </div>
        </div>

        <TextAreaInput
          labelName="Additional agreement (Optional)"
          id="how_long"
          rows={5}
          placeholder="Discuss with the other person before you add any terms."
          isShowLabel={true}
        />
      </div>

      <div className="flex justify-between w-full h-fit mt-10">
        <PrimaryButton
          onClick={() => navigate.push("generate-link?step=2")}
          className="bg-white text-[#A21CAF] border border-[#A21CAF] text-lg w-36"
        >
          <span className="inline-flex gap-1 items-center ">
            <IoMdArrowBack />
            Back
          </span>
        </PrimaryButton>

        <SecondaryButton
          onClick={() => navigate.push("generate-link?step=4")}
          className="w-36 text-lg bg-[#A21CAF] text-white"
        >
          <span className="inline-flex gap-1 items-center ">
            Next <IoMdArrowBack className="rotate-180" />
          </span>
        </SecondaryButton>
      </div>
    </section>
  );
}
