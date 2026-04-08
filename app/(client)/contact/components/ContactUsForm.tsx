// "use client";

// import Input from "@/app/commons/Input";
// import PrimaryButton from "@/app/commons/PrimaryButtons";
// import TextAreaInput from "@/app/commons/TextAreaInput";
// import { useMutateAction } from "@/app/hooks/useMutation";

// export default function ContactUsForm() {
//   const { mutateAsync, isPending } = useMutateAction("post", "contact");

//   return (
//     <div className="grid gap-4 lg:gap-8 w-full ">
//       <div className="flex flex-col gap-2 w-full">
//         <h1 className=" font-bold text-[#0F172A] text-4xl"> Contact Us</h1>
//         <p className="text-bold text-[#0F172A] text-lg">
//           Have questions or need assistance?
//         </p>
//       </div>
//       <div className="flex flex-col gap-2">
//         <Input labelName="Name" isShowLabel placeholder="Name" />
//       </div>
//       <div className="flex flex-col gap-2">
//         <Input labelName="Email" isShowLabel placeholder="Email" />
//       </div>
//       <div className="flex flex-col gap-2">
//         <TextAreaInput
//           labelName="Message"
//           isShowLabel
//           id={""}
//           className="border border-neutral-400"
//         />
//       </div>
//       <div className=" grid grid-cols-2  w-full">
//         <div className="w-full"></div>

//         <PrimaryButton title="" className="w-full cursor-pointer">
//           Send message
//         </PrimaryButton>
//       </div>
//     </div>
//   );
// }

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/app/commons/Input";
import PrimaryButton from "@/app/commons/PrimaryButtons";
import TextAreaInput from "@/app/commons/TextAreaInput";
import { useMutateAction } from "@/app/hooks/useMutation";

import {
  contactSchema,
  type IContactFormValues,
} from "../schema/contactSchema";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export default function ContactUsForm() {
  const { mutateAsync, isPending } = useMutateAction<any, IContactFormValues>(
    "post",
    "contact",
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: IContactFormValues) => {
    try {
      await mutateAsync(data);
      toast.success("Message sent successfully. We'll get back to you soon!");
      reset();
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message ||
            "Something went wrong while sending your message. Please try again.",
        );
        return;
      }

      if (error instanceof Error) {
        toast.error(
          error.message || "Unexpected error occurred. Please try again.",
        );
        return;
      }

      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 lg:gap-8 w-full"
    >
      <div className="flex flex-col gap-2 w-full">
        <h1 className="font-bold text-[#0F172A] text-4xl">Contact Us</h1>
        <p className="text-[#0F172A] text-lg">
          Have questions or need assistance?
        </p>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <Input
          labelName="Name"
          isShowLabel
          placeholder="Name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Input
          labelName="Email"
          isShowLabel
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <TextAreaInput
          id=""
          labelName="Message"
          isShowLabel
          className="border !border-neutral-400"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 w-full">
        <div />
        <PrimaryButton
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer"
        >
          {isPending ? "Sending..." : "Send message"}
        </PrimaryButton>
      </div>
    </form>
  );
}
