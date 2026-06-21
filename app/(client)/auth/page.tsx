"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import UserOtp from "./components/Otp";

export default function Page() {
  const searchParams = useSearchParams();

  const activePage =
    (searchParams.get("auth") as "login" | "signup" | "otp" | null) ?? "signup";

  const [mode, setMode] = useState<"login" | "signup" | "otp">(() => {
    return activePage === "login" ? "login" : "signup";
  });

  useEffect(() => {
    if (activePage === "login") {
      setMode("login");
    } else if (activePage === "signup") {
      setMode("signup");
    }
  }, [activePage]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans animate-fade-in">
      <div className="absolute top-6 left-6 ">
        <button
          //   onClick={() => setActivePage("home")}
          className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-brand-primary transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Landing Page
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 rounded-3xl shadow-xs">
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 bg-brand-primary rounded-xl text-white font-black text-lg flex items-center justify-center">
            M
          </div>
        </div>

        {mode === "signup" && <SignIn />}

        {mode === "login" && <Login />}

        {mode === "otp" && <UserOtp />}
      </div>
    </div>
  );
}
