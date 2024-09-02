import {
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

// interface TextAreaInputType extends InputHTMLAttributes<HTMLTextAreaElement> {
interface TextAreaInputType
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
        className="active:border active:border-[#86198F] focus:border-[#86198F] outline-none border rounded-md p-2"
      ></textarea>
    </section>
  );
}
