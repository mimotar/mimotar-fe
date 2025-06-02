import {
  forwardRef,
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
    error?: string;
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputType> (({
  labelName,
  id,
    error,
  ...props

}, ref)=> {
  return (
    <section className="flex flex-col">
      <label htmlFor={id}>{labelName}</label>
      <textarea
        {...props}
        ref={ref}
        className="active:border active:border-[#86198F] focus:border-[#86198F] outline-none border rounded-md p-2"
      ></textarea>

        {error && <small className="text-sm text-red-300">{error}</small>}
    </section>
  );
})


TextAreaInput.displayName = "TextAreaInput";
export default TextAreaInput;
