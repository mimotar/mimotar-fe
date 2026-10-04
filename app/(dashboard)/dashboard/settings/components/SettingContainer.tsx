"use client";

import { useAuth } from "@/app/(client)/(page)/hooks/useAuth";
import toast from "react-hot-toast";
import {
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  Settings,
  Shield,
} from "lucide-react";
import { useState } from "react";

const countries = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "United Arab Emirates",
  "India",
  "Other",
];

export const SettingContainer = () => {
  //   const { currentUser, resetDemoData, showAlert, updatePhoneNumber } = useAppState();
  const session = useAuth();
  const [phone, setPhone] = useState(session.session?.phone_no || "");
  const [isResetting, setIsResetting] = useState(false);

  // Password States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Password Visibility States
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // KYC States
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDocument, setSelectedDocument] = useState("BVN");
  const [kycReference, setKycReference] = useState("");

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    // updatePhoneNumber(phone);
  };

  const handleCurrentPasswordBlur = () => {
    if (!currentPassword) {
      setPasswordError("Current password is required");
    } else if (passwordError === "Current password is required") {
      setPasswordError("");
    }
  };

  const handleNewPasswordBlur = () => {
    if (!newPassword) {
      setPasswordError("New password is required");
    } else {
      const hasLength = newPassword.length >= 8;
      const hasUpper = /[A-Z]/.test(newPassword);
      const hasNum = /[0-9]/.test(newPassword);

      if (!hasLength || !hasUpper || !hasNum) {
        setPasswordError(
          "New password must meet rules: at least 8 characters with 1 number and 1 capital letter.",
        );
      } else if (
        passwordError &&
        (passwordError.includes("New password") ||
          passwordError.includes("rules"))
      ) {
        setPasswordError("");
      }
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword && confirmPassword !== newPassword) {
      setPasswordError("New password and password confirmation do not match");
    } else if (
      passwordError === "New password and password confirmation do not match"
    ) {
      setPasswordError("");
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All password fields are required");
      return;
    }

    const hasLength = newPassword.length >= 8;
    const hasUpper = /[A-Z]/.test(newPassword);
    const hasNum = /[0-9]/.test(newPassword);

    if (!hasLength || !hasUpper || !hasNum) {
      setPasswordError(
        "New password does not meet security requirements: 8+ characters, at least 1 uppercase letter, and 1 number.",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and password confirmation do not match");
      return;
    }

    // Success simulation
    setPasswordSuccess(
      "Security password updated successfully! Your account credentials have been rotated safely.",
    );
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
    toast.success("Password updated successfully!");
  };

  const handleReset = () => {
    setIsResetting(true);
    setTimeout(() => {
      //   resetDemoData();
      setIsResetting(false);
    }, 1000);
  };

  const fullname = `${session.session?.firstName ?? ""} ${session.session?.lastName ?? ""}`;
  const phoneVerified: boolean = false;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in font-sans text-left">
      {/* General Settings Card */}
      <div className="bg-white rounded-3xl p-6.5 md:p-8 shadow-xs border border-gray-100 space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-950">
              Platform Profile
            </h2>
            <p className="text-xs text-brand-neutral mt-0.5">
              Customize verified credentials on your account.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveGeneral} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="settings-full-name"
                className="block text-xs font-bold text-slate-500 mb-1"
              >
                Registered Full Name (Locked)
              </label>
              <input
                id="settings-full-name"
                type="text"
                readOnly
                value={fullname}
                className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-100 rounded-xl font-medium text-gray-400 select-none cursor-not-allowed"
              />
              <span className="block text-[10px] text-gray-400 mt-1 leading-normal">
                ✓ Full legal name is bound to escrow KYC verified registry.
              </span>
            </div>
            <div>
              <label
                htmlFor="settings-email-address"
                className="block text-xs font-bold text-slate-500 mb-1"
              >
                Email Address (Locked)
              </label>
              <input
                id="settings-email-address"
                type="text"
                readOnly
                value={session.session?.email ?? ""}
                className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-100 rounded-xl font-mono text-gray-400 select-none cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="settings-whatsapp-phone"
                className="block text-xs font-bold text-slate-500"
              >
                WhatsApp Phone Number
              </label>
              {/* {currentUser.phoneVerified ? ( */}
              {!phoneVerified ? (
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">
                  ⚠️ Not Verified (Verifies during disputes/cashouts)
                </span>
              ) : phoneVerified ? (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                  ✓ Verified ✅
                </span>
              ) : phone ? (
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">
                  ⚠️ No Phone (Verifies during disputes/cashouts)
                </span>
              ) : (
                <span className="text-[10px] text-gray-400">
                  Required for disputes & cashouts
                </span>
              )}
            </div>
            <div className="flex gap-2 items-center w-full">
              <input
                id="settings-whatsapp-phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +234 803 123 4567"
                className="px-4 py-2.5 flex-1 min-w-0 text-xs bg-gray-50 border border-gray-100 rounded-xl font-medium focus:outline-none focus:border-brand-primary"
              />

              {!phoneVerified && (
                <button
                  type="button"
                  className="px-4 py-2.5 cursor-pointer shrink-0 bg-brand-primary  text-white text-xs font-bold rounded-xl hover:bg-brand-primary/95 transition active:scale-95 shadow-xs"
                >
                  Verify Phone
                </button>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 ">
            {/* address */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="settings-address"
                  className="block text-xs font-bold text-slate-500"
                >
                  Address
                </label>
              </div>
              <div className="flex gap-2 items-center w-full">
                <input
                  id="settings-address"
                  type="text"
                  placeholder="e.g. 123 Main Street, City"
                  className="px-4 py-2.5 flex-1 min-w-0 text-xs bg-gray-50 border border-gray-100 rounded-xl font-medium focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            {/* city */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="settings-city"
                  className="block text-xs font-bold text-slate-500"
                >
                  City
                </label>
              </div>
              <div className="flex gap-2 items-center w-full">
                <input
                  id="settings-city"
                  type="text"
                  placeholder="e.g.  City"
                  className="px-4 py-2.5 flex-1 min-w-0 text-xs bg-gray-50 border border-gray-100 rounded-xl font-medium focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 ">
            {/* country */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="settings-country"
                  className="block text-xs font-bold text-slate-500"
                >
                  Country
                </label>
              </div>
              <div className="flex gap-2 items-center w-full">
                <input
                  id="settings-country"
                  type="text"
                  placeholder="e.g.  Country"
                  className="px-4 py-2.5 flex-1 min-w-0 text-xs bg-gray-50 border border-gray-100 rounded-xl font-medium focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            {/* postal code */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="settings-postal-code"
                  className="block text-xs font-bold text-slate-500"
                >
                  Postal Code
                </label>
              </div>
              <div className="flex gap-2 items-center w-full">
                <input
                  id="settings-postal-code"
                  type="text"
                  placeholder="e.g.  Postal Code"
                  className="px-4 py-2.5 flex-1 min-w-0 text-xs bg-gray-50 border border-gray-100 rounded-xl font-medium focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="settings-id-number"
                className="block text-xs font-bold text-slate-500"
              >
                ID Number
              </label>
            </div>
            <div className="flex gap-2 items-center w-full">
              <input
                id="settings-id-number"
                type="text"
                placeholder="e.g. 123456789"
                className="px-4 py-2.5 flex-1 min-w-0 text-xs bg-gray-50 border border-gray-100 rounded-xl font-medium focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/95 transition active:scale-95 shadow-xs"
          >
            Save Profile Changes
          </button>
        </form>
      </div>

      {/* ID & KYC Verification Status */}
      <div className="bg-white rounded-3xl p-6.5 md:p-8 shadow-xs border border-gray-100 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-slate-500">
            ID &amp; KYC Verification Status
          </h2>
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-md">
            ⚠ Unverified
          </span>
        </div>

        <div className="rounded-2xl border border-fuchsia-200 bg-fuchsia-50/70 p-4 md:p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[10px] font-extrabold tracking-wide text-fuchsia-600 uppercase">
              🔒 Verify Account ID (KYC)
            </h3>
            <span className="rounded bg-fuchsia-100 px-1.5 py-0.5 text-[9px] font-bold text-fuchsia-600">
              Unlocks ₦200,000+ limits
            </span>
          </div>

          <p className="text-xs leading-relaxed text-slate-600">
            Verify your identity to clear cashouts above ₦200,000 or $300. We
            collect and utilize your ID purely to{" "}
            <u className="font-bold">
              verify your secure personal details only
            </u>
            .
          </p>

          <div>
            <label
              htmlFor="settings-kyc-country"
              className="mb-1 block text-[10px] font-bold uppercase text-slate-500"
            >
              Country
            </label>
            <select
              id="settings-kyc-country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full rounded-xl border border-slate-500 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-700 outline-none focus:border-brand-primary"
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="mb-1 block text-[10px] font-bold uppercase text-slate-500">
              Document Selection
            </span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {["BVN", "NIN", "Passport"].map((document) => (
                <button
                  key={document}
                  type="button"
                  onClick={() => setSelectedDocument(document)}
                  className={`rounded-xl border px-3 py-2 text-[10px] font-bold transition ${
                    selectedDocument === document
                      ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-600"
                      : "border-slate-500 bg-white text-slate-500 hover:border-fuchsia-400"
                  }`}
                >
                  {document}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="settings-kyc-reference"
              className="mb-1 block text-[10px] font-bold uppercase text-slate-500"
            >
              {selectedDocument} Reference Number
            </label>
            <input
              id="settings-kyc-reference"
              type="text"
              value={kycReference}
              onChange={(e) => setKycReference(e.target.value)}
              placeholder={
                selectedDocument === "BVN"
                  ? "e.g. 22295671842"
                  : `Enter ${selectedDocument} number`
              }
              className="w-full rounded-xl border border-slate-500 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-700 outline-none placeholder:text-slate-400 focus:border-brand-primary"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-fuchsia-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-fuchsia-700 active:scale-95 sm:w-auto"
          >
            Verify
          </button>
        </div>
      </div>
      {/* Change Password Card */}
      <div className="bg-white rounded-3xl p-6.5 md:p-8 shadow-xs border border-gray-100 space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
            <Shield className="w-5 h-5 text-brand-primary" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-950">
              Change Security Password
            </h2>
            <p className="text-xs text-brand-neutral mt-0.5">
              Rotate account password credentials to safeguard escrow processes.
            </p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="settings-current-password"
                className="block text-xs font-bold text-slate-500 mb-1"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  id="settings-current-password"
                  type={showCurrent ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  onBlur={handleCurrentPasswordBlur}
                  placeholder="••••••"
                  className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-100 rounded-xl font-medium focus:outline-none focus:border-brand-primary pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-0 top-0 bottom-0 px-3.5 text-gray-400 hover:text-gray-650 focus:outline-none flex items-center justify-center cursor-pointer"
                >
                  {showCurrent ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="settings-new-password"
                className="block text-xs font-bold text-slate-500 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="settings-new-password"
                  type={showNew ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  onBlur={handleNewPasswordBlur}
                  placeholder="Must be strong & secure"
                  className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-100 rounded-xl font-medium focus:outline-none focus:border-brand-primary pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-0 top-0 bottom-0 px-3.5 text-gray-400 hover:text-gray-655 focus:outline-none flex items-center justify-center cursor-pointer"
                >
                  {showNew ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="settings-confirm-password"
                className="block text-xs font-bold text-slate-500 mb-1"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="settings-confirm-password"
                  type={showConfirm ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  onBlur={handleConfirmPasswordBlur}
                  placeholder="••••••"
                  className="w-full px-4 py-2.5 text-xs bg-gray-50 border border-gray-100 rounded-xl font-medium focus:outline-none focus:border-brand-primary pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-0 top-0 bottom-0 px-3.5 text-gray-400 hover:text-gray-660 focus:outline-none flex items-center justify-center cursor-pointer"
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* New Password Strength Indicators */}
          {newPassword.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100/80 text-left space-y-2 animate-fade-in max-w-md">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-gray-400 uppercase tracking-wider">
                  New Password Security Rating:
                </span>
                {(() => {
                  const len = newPassword.length >= 8;
                  const cap = /[A-Z]/.test(newPassword);
                  const num = /[0-9]/.test(newPassword);
                  const score = (len ? 1 : 0) + (cap ? 1 : 0) + (num ? 1 : 0);
                  if (score === 1)
                    return (
                      <span className="text-red-500 font-extrabold font-mono">
                        WEAK
                      </span>
                    );
                  if (score === 2)
                    return (
                      <span className="text-amber-500 font-extrabold font-mono">
                        FAIR
                      </span>
                    );
                  if (score === 3)
                    return (
                      <span className="text-emerald-500 font-extrabold font-mono">
                        STRONG & SECURE
                      </span>
                    );
                  return (
                    <span className="text-gray-400 font-bold font-mono">
                      EMPTY
                    </span>
                  );
                })()}
              </div>

              {/* Strength Meter Slots */}
              <div className="flex gap-1 h-1.5">
                {(() => {
                  const len = newPassword.length >= 8;
                  const cap = /[A-Z]/.test(newPassword);
                  const num = /[0-9]/.test(newPassword);
                  const score = (len ? 1 : 0) + (cap ? 1 : 0) + (num ? 1 : 0);

                  return [1, 2, 3].map((val) => {
                    let bg = "bg-gray-200";
                    if (score >= val) {
                      if (score === 1) bg = "bg-red-500";
                      else if (score === 2) bg = "bg-amber-400";
                      else if (score === 3) bg = "bg-emerald-500";
                    }
                    return (
                      <div
                        key={val}
                        className={`flex-1 rounded-sm h-full transition-all duration-350 ${bg}`}
                      />
                    );
                  });
                })()}
              </div>

              {/* Requirement Bullet List */}
              <div className="space-y-1.5 pt-1 text-[11px]">
                <p className="text-[10px] text-gray-400 font-medium">
                  To protect your locked escrow agreements, Mimotar requires
                  passwords to stay robust and resilient:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${newPassword.length >= 8 ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400"}`}
                    >
                      {newPassword.length >= 8 ? "✓" : "•"}
                    </span>
                    <span
                      className={
                        newPassword.length >= 8
                          ? "text-emerald-700"
                          : "text-gray-400"
                      }
                    >
                      8+ Characters ({newPassword.length}/8)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${/[A-Z]/.test(newPassword) ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400"}`}
                    >
                      {/[A-Z]/.test(newPassword) ? "✓" : "•"}
                    </span>
                    <span
                      className={
                        /[A-Z]/.test(newPassword)
                          ? "text-emerald-700"
                          : "text-gray-400"
                      }
                    >
                      Capital Letter (A-Z)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${/[0-9]/.test(newPassword) ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400"}`}
                    >
                      {/[0-9]/.test(newPassword) ? "✓" : "•"}
                    </span>
                    <span
                      className={
                        /[0-9]/.test(newPassword)
                          ? "text-emerald-700"
                          : "text-gray-400"
                      }
                    >
                      At least 1 Number
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {passwordError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-100 flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{passwordError}</span>
            </div>
          )}

          {passwordSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-100 flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{passwordSuccess}</span>
            </div>
          )}

          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/95 transition active:scale-95 shadow-xs cursor-pointer"
          >
            Update Security Password
          </button>
        </form>
      </div>
    </div>
  );
};
