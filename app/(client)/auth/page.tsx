"use client";

import React, { useState, useEffect } from "react";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

import SignIn from "./components/SignIn";
import Login from "./components/Login";

export default function Page() {
  const searchParams = useSearchParams();

  const activePage =
    (searchParams.get("auth") as "login" | "signup" | null) ?? "signup";

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

  // Simulation conditions/states
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [otpTries, setOtpTries] = useState(0);
  const [otpExpired, setOtpExpired] = useState(false);
  const [suspiciousLoginState, setSuspiciousLoginState] = useState(false);

  // Trigger demo logins easily for reviewers

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText(null);

    if (otpCode !== "1234" && otpCode !== "123456") {
      setOtpTries((p) => p + 1);

      if (otpTries >= 2) {
        setOtpExpired(true);
        setErrorText(
          "OTP has expired! Click resend code to refresh code validity parameters.",
        );
        return;
      }

      setErrorText(
        'Invalid verification OTP code. Type "1234" to pass simulation authorized parameters!',
      );
      return;
    }

    // verifyUserOtp();
  };

  const triggerResendOtp = () => {
    setOtpExpired(false);
    setOtpTries(0);
    setErrorText(null);
    setOtpCode("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  //section

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

        {mode === "otp" && (
          <>
            <h2 className="text-center text-xl font-bold text-gray-900">
              Enter authorization code
            </h2>
            <p className="mt-1 pb-1 text-center text-xs text-gray-400">
              Verification OTP dispatched to{" "}
              <span className="font-semibold text-gray-700">
                {/* {currentUser.email} */}
                josephuzuegbu55@gmail.com
              </span>
            </p>

            <div className="mt-4 text-center bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-3.5 flex flex-col gap-1">
              <span className="text-[11px] text-gray-500 font-medium">
                Visual Sandbox Token
              </span>
              <span className="text-sm font-black tracking-widest text-brand-primary font-mono">
                1 2 3 4
              </span>
            </div>

            <form onSubmit={handleOtpSubmit} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="otp-verification-code"
                  className="block text-xs font-bold text-gray-500 mb-1.5 text-center"
                >
                  6-Digit Verification Pin
                </label>
                <input
                  id="otp-verification-code"
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="0 0 0 0"
                  className="w-full text-center px-4 py-3.5 tracking-widest text-base font-bold text-gray-800 rounded-xl border border-gray-100 placeholder-gray-300 focus:outline-none focus:border-brand-primary bg-gray-50"
                />
              </div>

              {errorText && (
                <div className="p-3 bg-red-50 text-red-700 text-[11px] font-medium rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                  <span>{errorText}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold rounded-xl transition active:scale-95 bg-brand-primary"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  "Authorize OTP Session"
                )}
              </button>
            </form>

            <div className="mt-5 text-center flex flex-col gap-2">
              <button
                onClick={triggerResendOtp}
                className="text-xs font-semibold text-brand-primary hover:underline cursor-pointer"
              >
                Resend verification token
              </button>

              <button
                onClick={() => setMode("signup")}
                className="text-[11px] text-gray-400 hover:text-gray-600 transition"
              >
                Change Registration email
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
