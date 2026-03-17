"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import phoneInputStyle from "../css.module/phoneInputStyle.module.css";
import { useSession } from "next-auth/react";
import PrimaryButton, { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import { useRouter } from "next/navigation";
import { Country, City } from "country-state-city";
import editProfileInfoFormSchema, {
  type IEditProfileInfoFormSchemaType,
} from "../schema/EditProfileSchema";

const EditProfileInfoFormSection = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedCountryIso, setSelectedCountryIso] = useState("");

  const countries = useMemo(() => Country.getAllCountries(), []);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IEditProfileInfoFormSchemaType>({
    resolver: zodResolver(editProfileInfoFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      idNumber: "",
    },
  });

  console.log(errors);

  const cities = selectedCountryIso
    ? City.getCitiesOfCountry(selectedCountryIso)
    : [];

  useEffect(() => {
    if (status !== "authenticated" || !session?.user) return;

    const firstName = session.user.firstName ?? "";
    const lastName = session.user.lastName ?? "";
    const fullName = [firstName, lastName].filter(Boolean).join(" ");

    reset({
      fullName,
      email: session.user.email ?? "",
      phoneNumber: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      idNumber: "",
    });

    setSelectedCountryIso("");
  }, [session, status, reset]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isoCode = e.target.value;

    const selectedCountry = countries.find(
      (country) => country.isoCode === isoCode,
    );

    setSelectedCountryIso(isoCode);

    setValue("country", selectedCountry?.name ?? "", {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("city", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleSubmitEdit = async (data: IEditProfileInfoFormSchemaType) => {
    try {
      console.log("submitted data:", data);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <section className="flex flex-col mt-3">
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
              className="border border-neutral-400 p-3 outline-none rounded-md placeholder:text-neutral-900"
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
              type="email"
              id="email"
              {...register("email")}
              placeholder="olawaleade@gmail.com"
              className="border border-neutral-400 p-3 outline-none rounded-md placeholder:text-neutral-900"
            />
            {errors.email && (
              <small className="text-red-400">{errors.email.message}</small>
            )}
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
                name="phoneNumber"
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

            {errors.phoneNumber && (
              <small className="text-red-400">
                {errors.phoneNumber.message}
              </small>
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
              className="border border-neutral-400 p-3 outline-none rounded-md placeholder:text-neutral-900"
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

            <select
              id="city"
              {...register("city")}
              disabled={!selectedCountryIso}
              className="border border-neutral-400 p-3 rounded-md"
            >
              <option value="">
                {selectedCountryIso ? "Select city" : "Select country first"}
              </option>
              {cities?.map((city, i) => (
                <option key={`${city.name}-${i}`} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>

            {errors.city && (
              <small className="text-red-400">{errors.city.message}</small>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="country" className="text-neutral-600">
              Country
            </label>

            <select
              id="country"
              onChange={handleCountryChange}
              defaultValue=""
              className="border border-neutral-400 p-3 rounded-md"
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>

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
              {...register("postalCode")}
              placeholder="110222"
              className="border border-neutral-400 p-3 outline-none rounded-md placeholder:text-neutral-900"
            />
            {errors.postalCode && (
              <small className="text-red-400">
                {errors.postalCode.message}
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
              {...register("idNumber")}
              placeholder="64484****"
              className="border border-neutral-400 p-3 outline-none rounded-md placeholder:text-neutral-900"
            />
            {errors.idNumber && (
              <small className="text-red-400">{errors.idNumber.message}</small>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <PrimaryButton
            type="submit"
            disabled={isSubmitting}
            className="text-white cursor-pointer w-32 h-14"
          >
            {isSubmitting ? "Saving..." : "Save"}
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
