"use client";

import { countriesCode } from "@/app/data/CountryCode";
import editProfileInfoFormSchema, {
  editProfileInfoFormSchemaType,
} from "@/lib/schemas/editProfileInfoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { forwardRef, Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiArrowDropDownLine } from "react-icons/ri";

const EditProfileInfoFormSection = forwardRef<HTMLFormElement>((props, ref) => {
  const [countryCode, setCountryCode] = useState<{
    code?: string;
    flag: string;
  }>({ flag: "https://flagcdn.com/16x12/ng.png" });

  const [isFlagDropdown, setIsFlagDropdown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editProfileInfoFormSchemaType>({
    resolver: zodResolver(editProfileInfoFormSchema),
    defaultValues: {
      countryCode: {
        flag: "https://flagcdn.com/16x12/ng.png",
      },
    },
  });

  const handleSubmitEdit = (data: editProfileInfoFormSchemaType) => {
    console.log(data);
    toast.success("Profile updated successfully");
  };

  return (
    <section className="flex flex-col mt-3 ">
      <form
        ref={ref}
        onSubmit={handleSubmit(handleSubmitEdit)}
        className="space-y-4"
      >
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col ">
            <label htmlFor="full_name" className="text-neutral-600">
              Full name
            </label>
            <input
              type="text"
              {...register("fullName")}
              id="full_name"
              placeholder="Olawale Ade"
              className="border p-3 outline-none rounded-md placeholder:text-neutral-900"
            />
            {errors.fullName && (
              <small className="text-red-400">{errors.fullName.message}</small>
            )}
          </div>

          <div className="flex flex-col ">
            <label htmlFor="email" className="text-neutral-600">
              Email address
            </label>
            <input
              type="email"
              {...register("email")}
              id="email"
              placeholder="olawaleade@gmail.com"
              className="border p-3 outline-none rounded-md placeholder:text-neutral-900"
            />
            {errors.email && (
              <small className="text-red-400">{errors.email.message}</small>
            )}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="phone_number"
              className="text-neutral-600 inline-flex gap-2"
            >
              Phone number
            </label>
            <div className="inline-flex">
              <div className="relative flex justify-between items-center gap-2 border rounded-l-lg w-20 px-2">
                <Image
                  src={countryCode.flag}
                  {...register("countryCode.flag")}
                  width="35"
                  height="35"
                  alt="Ukraine"
                />

                <RiArrowDropDownLine
                  className={`text-3xl cursor-pointer ${
                    isFlagDropdown ? "rotate-180" : ""
                  }`}
                  onClick={() => setIsFlagDropdown(!isFlagDropdown)}
                />

                {isFlagDropdown && (
                  <div className="absolute top-12 left-0 w-full h-60 bg-white overflow-y-auto space-y-2 p-3">
                    {Object.keys(countriesCode).map((item: string, i) => (
                      <Suspense fallback="Loading ..." key={i}>
                        <Image
                          key={i}
                          onClick={() =>
                            setCountryCode({
                              flag: `https://flagcdn.com/16x12/${item}.webp`,
                            })
                          }
                          src={`https://flagcdn.com/16x12/${item}.webp`}
                          width="20"
                          height="16"
                          className="cursor-pointer"
                          alt=""
                        />
                      </Suspense>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="tel"
                {...register("phoneNumber")}
                id="phone_number"
                className="p-3 outline-none border w-full rounded-r-lg"
                placeholder="+234"
              />
            </div>

            {errors.phoneNumber && (
              <small className="text-red-400">
                {errors.phoneNumber.message}
              </small>
            )}
            {errors.countryCode?.flag && (
              <small className="text-red-400">
                {errors.countryCode.flag.message}
              </small>
            )}
          </div>

          <div className="flex flex-col ">
            <label htmlFor="address" className="text-neutral-600">
              Address
            </label>
            <input
              type="text"
              {...register("address")}
              id="address"
              placeholder="13 Washington Square South"
              className="border p-3 outline-none rounded-md placeholder:text-neutral-900"
            />
            {errors.address && (
              <small className="text-red-400">{errors.address.message}</small>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col ">
            <label htmlFor="city" className="text-neutral-600">
              City
            </label>
            <input
              type="text"
              id="city"
              {...register("city")}
              placeholder="Abeokuta"
              className="border p-3 outline-none rounded-md placeholder:text-neutral-900"
            />
            {errors.city && (
              <small className="text-red-400">{errors.city.message}</small>
            )}
          </div>

          <div className="flex flex-col ">
            <label htmlFor="country" className="text-neutral-600">
              Country
            </label>
            <input
              type="text"
              {...register("country")}
              id="country"
              placeholder="Nigeria"
              className="border p-3 outline-none rounded-md placeholder:text-neutral-900"
            />
            {errors.country && (
              <small className="text-red-400">{errors.country.message}</small>
            )}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col ">
            <label htmlFor="postal_code" className="text-neutral-600">
              Postal code
            </label>
            <input
              type="text"
              id="postal_code"
              {...register("postalCode")}
              placeholder="110222"
              className="border p-3 outline-none rounded-md placeholder:text-neutral-900"
            />
            {errors.postalCode && (
              <small className="text-red-400">
                {errors.postalCode.message}
              </small>
            )}
          </div>

          <div className="flex flex-col ">
            <label htmlFor="id_number" className="text-neutral-600">
              ID number
            </label>
            <input
              type="text"
              id="id_number"
              {...register("idNumber")}
              placeholder="64484****"
              className="border p-3 outline-none rounded-md placeholder:text-neutral-900"
            />
            {errors.idNumber && (
              <small className="text-red-400">{errors.idNumber.message}</small>
            )}
          </div>
        </div>
      </form>
    </section>
  );
});

export default EditProfileInfoFormSection;
