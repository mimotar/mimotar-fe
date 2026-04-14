"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PhoneInput from "react-phone-number-input";
// @ts-ignore: no type declarations for the package's CSS side-effect import
import "react-phone-number-input/style.css";
import phoneInputStyle from "../css.module/phoneInputStyle.module.css";
import { useSession } from "next-auth/react";
import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import { useRouter } from "next/navigation";
import { Country, City } from "country-state-city";
import editProfileInfoFormSchema, {
  type IEditProfileInfoFormSchemaType,
} from "../schema/EditProfileSchema";
import { useMutateAction } from "@/app/hooks/useMutation";
import { AxiosError } from "axios";
import { UpdateProfileResponse } from "../types/IUpdateProfileResponse";
import Avata from "@/app/(dashboard)/commons/Avartar";
import { UploadProfilePic } from "../actions/uploadProfile";
import { Button } from "@/components/ui/button";
import { TbEdit } from "react-icons/tb";

export type InitialStateType = {
  error: boolean;
  msg: string;
  avatarUrl: string;
};
const EditProfileInfoFormSection = () => {
  const { data: session, status, update } = useSession();
  console.log("edit profile", session);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [initialState, _] = useState<InitialStateType>({
    error: false,
    msg: "",
    avatarUrl: "",
  });

  const router = useRouter();
  const firstName = session?.user.firstName ?? "";
  const lastName = session?.user.lastName ?? "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  const profileAcronyms = `${firstName[0] ?? ""}${lastName[0] ?? ""}`;

  const FileRef = useRef<HTMLInputElement | null>(null);

  const [state, dispatchAction, ispending] = useActionState(
    UploadProfilePic,
    initialState,
  );

  const formatPhone = (phone?: string) => {
    if (!phone) return "";

    // already correct
    if (phone.startsWith("+")) return phone;

    // Nigeria example (adjust if needed)
    if (phone.startsWith("0")) {
      return "+234" + phone.slice(1);
    }

    return "+" + phone;
  };

  const { mutateAsync, isPending } = useMutateAction<
    UpdateProfileResponse,
    IEditProfileInfoFormSchemaType
  >("put", "profile");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEditProfileInfoFormSchemaType>({
    resolver: zodResolver(editProfileInfoFormSchema),
    defaultValues: {
      fullName: fullName ?? "",
      // email: "",
      phone_no: formatPhone(session?.user.phone_no) ?? "",
      address: session?.user.address ?? "",
      city: session?.user.city ?? "",
      country: session?.user.country ?? "",
      postal_code: session?.user.postal_code ?? "",
      id_number: String(session?.user.id_number) ?? "",
    },
  });

  const handleSubmitEdit = async (data: IEditProfileInfoFormSchemaType) => {
    try {
      const result = await mutateAsync(data);
      console.log("update", result.data);

      const [firstName, ...rest] = result.data.fullName.split(" ");
      const lastName = rest.join(" ") || "";
      await update({
        ...session,
        firstName,
        lastName,
        phone_no: formatPhone(result.data.phone_no!) ?? undefined,
        address: result.data.address ?? undefined,
        city: result.data.city ?? undefined,
        country: result.data.country ?? undefined,
        postal_code: result.data.postal_code ?? undefined,
        id_number: result.data.id_number ?? undefined,
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Failed to update profile");
        return;
      }

      if (error instanceof Error) {
        toast.error(error.message || "Failed to update profile");
        return;
      }
      toast.error("Failed to update profile");
    }
  };

  useEffect(() => {
    if (!session?.user) return;

    const firstName = session.user.firstName ?? "";
    const lastName = session.user.lastName ?? "";
    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    reset({
      fullName,
      phone_no: formatPhone(session.user.phone_no) ?? "",
      address: session.user.address ?? "",
      city: session.user.city ?? "",
      country: session.user.country ?? "",
      postal_code: session.user.postal_code ?? "",
      id_number: String(session.user.id_number ?? ""),
    });
  }, [session?.user, reset]);

  useEffect(() => {
    if (state?.msg) {
      setMessage(state.msg);
      setIsError(state.error);
      setAvatarUrl(state.avatarUrl);

      const id = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(id);
    }
  }, [state]);
  return (
    <section className="flex flex-col mt-3">
      <form
        action={dispatchAction}
        className="flex flex-col justify-center items-center mb-2 rela"
      >
        {status === "loading" || !session ? (
          <AiOutlineLoading3Quarters className="animate-spin size-12 mb-2 text-brand-primary" />
        ) : (
          <div className="relative bg-red-200">
            <Avata
              imgUrl={avatarUrl || session?.user.avatar}
              className="border size-16 mb-2 cursor-pointer"
              nameAcronyms={profileAcronyms}
              onClick={() => FileRef.current?.click()}
            />
            <TbEdit className="text-xl absolute bottom-4 right-0" />
          </div>
        )}
        <input
          ref={FileRef}
          type="file"
          name="profilePic"
          // id="profilePic"
          className="hidden"
        />
        <Button variant={"outline"} type="submit" className="cursor-pointer">
          Update Profile
        </Button>
        {message && (
          <small
            className={`mt-2 ${isError ? "text-red-400" : "text-green-400"}`}
          >
            {message}
          </small>
        )}
        {ispending && (
          <AiOutlineLoading3Quarters className="animate-spin text-brand-primary" />
        )}
      </form>

      <form onSubmit={handleSubmit(handleSubmitEdit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col">
            <label htmlFor="full_name" className="text-neutral-600">
              Full name
            </label>
            <input
              type="text"
              id="full_name"
              {...register("fullName")}
              placeholder="Olawale Ade"
              className="border border-neutral-400 p-3 outline-none rounded-md "
            />
            {errors.fullName && (
              <small className="text-red-400">{errors.fullName.message}</small>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-neutral-600">
              Email address
            </label>
            <input
              disabled
              readOnly
              type="email"
              id="email"
              // {...register("email")}
              value={session?.user.email}
              placeholder="olawaleade@gmail.com"
              className="border border-neutral-400 p-3 outline-none rounded-md "
            />
            {/* {errors.email && (
              <small className="text-red-400">{errors.email.message}</small>
            )} */}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col w-full">
            <label
              htmlFor="phone_number"
              className="text-neutral-600 inline-flex gap-2"
            >
              Phone number
            </label>

            <div className={phoneInputStyle.wrapperStyle}>
              <Controller
                name="phone_no"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    international
                    defaultCountry="NG"
                    id="phone_number"
                    placeholder="Enter phone number"
                    value={field.value}
                    onChange={(value) => field.onChange(value ?? "")}
                  />
                )}
              />
            </div>

            {errors.phone_no && (
              <small className="text-red-400">{errors.phone_no.message}</small>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="text-neutral-600">
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address")}
              placeholder="13 Washington Square South"
              className="border border-neutral-400 p-3 outline-none rounded-md"
            />
            {errors.address && (
              <small className="text-red-400">{errors.address.message}</small>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col">
            <label htmlFor="city" className="text-neutral-600">
              City
            </label>
            <input
              type="text"
              id="city"
              {...register("city")}
              placeholder=" City"
              className="border border-neutral-400 p-3 outline-none rounded-md "
            />
            {errors.city && (
              <small className="text-red-400">{errors.city.message}</small>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="country" className="text-neutral-600">
              Country
            </label>
            <input
              type="text"
              id="country"
              {...register("country")}
              placeholder="Select country"
              className="border border-neutral-400 p-3 outline-none rounded-md "
            />
            {errors.country && (
              <small className="text-red-400">{errors.country.message}</small>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col">
            <label htmlFor="postal_code" className="text-neutral-600">
              Postal code
            </label>
            <input
              type="text"
              id="postal_code"
              {...register("postal_code")}
              placeholder="110222"
              className="border border-neutral-400 p-3 outline-none rounded-md"
            />
            {errors.postal_code && (
              <small className="text-red-400">
                {errors.postal_code.message}
              </small>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="id_number" className="text-neutral-600">
              ID number
            </label>
            <input
              type="text"
              id="id_number"
              {...register("id_number")}
              placeholder="64484****"
              className="border border-neutral-400 p-3 outline-none rounded-md "
            />
            {errors.id_number && (
              <small className="text-red-400">{errors.id_number.message}</small>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <PrimaryButton
            type="submit"
            disabled={isPending}
            className="text-white cursor-pointer w-32 h-14 "
          >
            {isPending ? "Saving..." : "Save"}
          </PrimaryButton>

          <PrimaryOutline
            type="button"
            onClick={() => router.push("/dashboard/profile")}
            className="text-primary w-32 h-14 text-brand-primary"
          >
            Cancel
          </PrimaryOutline>
        </div>
      </form>
    </section>
  );
};

export default EditProfileInfoFormSection;
