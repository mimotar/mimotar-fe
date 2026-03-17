"use client";

import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import editPasswordSchema, {
  EditPasswordSchemaType,
} from "@/lib/schemas/editPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuEye } from "react-icons/lu";

type PasswordVisibility = {
  currentPassword: boolean;
  confirmPassword: boolean;
  newPassword: boolean;
};

const EditPasswordFormSection = () => {
  const navigate = useRouter();
  const [passwordVisibility, setPasswordVisibility] =
    useState<PasswordVisibility>({
      confirmPassword: false,
      currentPassword: false,
      newPassword: false,
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPasswordSchemaType>({
    resolver: zodResolver(editPasswordSchema),
  });

  const handleSubmitEditPassword = (data: EditPasswordSchemaType) => {
    console.log(data);
    toast.success("password updated successfully");
  };

  return (
    <section className="flex flex-col mt-3 ">
      <form
        onSubmit={handleSubmit(handleSubmitEditPassword)}
        className="space-y-4"
      >
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col relative">
            <label htmlFor="current_password" className="text-neutral-600">
              Current password
            </label>
            <input
              type={passwordVisibility.currentPassword ? "text" : "password"}
              {...register("currentPassword")}
              id="current_password"
              placeholder={passwordVisibility.currentPassword ? "" : "********"}
              className="border border-neutral-400 p-3 outline-none rounded-md  placeholder:text-neutral-900 placeholder:text-sm"
            />
            {errors.currentPassword && (
              <small className="text-red-400">
                {errors.currentPassword.message}
              </small>
            )}
            <LuEye
              className="absolute top-10 right-3 cursor-pointer"
              onClick={() =>
                setPasswordVisibility((prev) => ({
                  ...prev,
                  currentPassword: !prev.currentPassword,
                }))
              }
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col relative">
            <label htmlFor="new_password" className="text-neutral-600">
              New password
            </label>
            <input
              type={passwordVisibility.newPassword ? "text" : "password"}
              id="new_password"
              {...register("newPassword")}
              placeholder={passwordVisibility.newPassword ? "" : "********"}
              className="border border-neutral-400 p-3 outline-none rounded-md placeholder:text-neutral-900"
            />
            <LuEye
              className="absolute top-10 right-3 cursor-pointer"
              onClick={() =>
                setPasswordVisibility((prev) => ({
                  ...prev,
                  newPassword: !prev.newPassword,
                }))
              }
            />
            {errors.newPassword && (
              <small className="text-red-400">
                {errors.newPassword.message}
              </small>
            )}
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="confirm_new_password" className="text-neutral-600">
              Confirm new password
            </label>
            <input
              type={passwordVisibility.confirmPassword ? "text" : "password"}
              id="confirm_new_password"
              {...register("confirmPassword")}
              placeholder={passwordVisibility.confirmPassword ? "" : "********"}
              className="border border-neutral-400 p-3 outline-none rounded-md placeholder:text-neutral-900"
            />
            <LuEye
              className="absolute top-10 right-3 cursor-pointer"
              onClick={() =>
                setPasswordVisibility((prev) => ({
                  ...prev,
                  confirmPassword: !prev.confirmPassword,
                }))
              }
            />
            {errors.confirmPassword && (
              <small className="text-red-400">
                {errors.confirmPassword.message}
              </small>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <PrimaryButton className="text-white cursor-pointer w-32 h-14">
            Saves
          </PrimaryButton>
          <PrimaryOutline
            onClick={() => navigate.push("/dashboard/profile")}
            className="text-primary w-32 h-14 cursor-pointer"
          >
            Cancel
          </PrimaryOutline>
        </div>
      </form>
    </section>
  );
};

EditPasswordFormSection.displayName = "EditPasswordFormSection";
export default EditPasswordFormSection;
