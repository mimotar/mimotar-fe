import React from "react";
import ForgetPassword from "./components/ForgetPassword";
import CheckMail from "./components/CheckEmail";
import SetNewPassword from "./components/SetNewPassword";

export default function page({
  searchParams,
}: {
  searchParams: { type: string | string[] | undefined };
}) {
  const params = searchParams.type;
  return (
    <section className="flex flex-col items-center h-full w-full ">
      {/* {JSON.stringify(params)} */}
      {params == undefined ? (
        <ForgetPassword />
      ) : params === "check-mail" ? (
        <CheckMail />
      ) : params === "set-newPassword" ? (
        <SetNewPassword />
      ) : (
        ""
      )}
    </section>
  );
}
