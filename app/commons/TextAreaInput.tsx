import { HTMLAttributes, InputHTMLAttributes } from "react";

interface TextAreaInputType extends InputHTMLAttributes<HTMLTextAreaElement> {
  labelName: string;
  isShowLabel: boolean;
  id: string;
}

export default function TextAreaInput({
  labelName,
  id,
  ...props
}: TextAreaInputType) {
  return (
    <section className="flex flex-col">
      <label htmlFor={id}>{labelName}</label>
      <textarea
        {...props}
        rows={5}
        placeholder="What is this payment for?"
        className="active:border active:border-[#86198F] focus:border-[#86198F] outline-none border rounded-md p-2"
      ></textarea>
    </section>
  );
}
