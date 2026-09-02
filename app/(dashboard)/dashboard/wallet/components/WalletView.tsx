"use client";
import React, { useState, useEffect, useMemo } from "react";
import { NIGERIAN_BANKS } from "../data/nigeriaBanks";
import {
  Wallet,
  ArrowDownLeft,
  ChevronRight,
  ArrowUpRight,
  TrendingDown,
  CheckCircle,
  Lock,
  AlertCircle,
  Loader2,
  ShieldAlert,
  HelpCircle as QuestionIcon,
  Check,
  Search,
} from "lucide-react";
import { useAuth } from "@/app/(client)/(page)/hooks/useAuth";
import { useWallet } from "../hooks/useWallet";
import { formatNumberToCurrency } from "@/app/utils/formatNumberToCurrency";
import { useDebounce } from "../hooks/useDebounce";
import toast from "react-hot-toast";

const USD_PAYOUT_NETWORKS = [
  "Virtual Dollar Card Account",
  "Payoneer USD Reception Node",
  "Wise USD Account",
  "Nigerian Dollar Bank Account (Domiciliary)",
  "Standard Chartered (USD International Wire)",
  "GTBank (USD Domiciliary)",
];

export const WalletView: React.FC = () => {
  //   const {
  //     // wallet,
  //     withdrawFunds,
  //     showAlert,
  //     activePage,
  //     withdrawCurrencyPreference,
  //     currentUser,
  //     updatePhoneNumber,
  //   } = useAppState();

  const session = useAuth();
  const [selectedCurrency, setSelectedCurrency] = useState<"NGN" | "USD">(
    "NGN",
  );

  const [withdrawStep, setWithdrawStep] = useState<number>(1); // 1: Enter details, 2: 2FA verify, 3: Success, 4: Error/Processing, 5: Progressive Withdrawal Protection otp path
  const [amountInput, setAmountInput] = useState<number>(0);
  const [bankSelected, setBankSelected] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [otpCode, setOtpCode] = useState<string>("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);

  // withdrawal OTP protect states
  const [withdrawalPhone, setWithdrawalPhone] = useState(
    session.session?.phone_no || "",
  );
  const [payoutOtpSent, setPayoutOtpSent] = useState(false);
  const [payoutOtpSubmitting, setPayoutOtpSubmitting] = useState(false);
  const [payoutOtpCode, setPayoutOtpCode] = useState("");
  const [payoutOtpError, setPayoutOtpError] = useState<string | null>(null);

  const [bankSearch, setBankSearch] = useState("");
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);

  const debouncedBankSearch = useDebounce(bankSearch, 300);

  const { wallet, banks } = useWallet();
  console.log(banks.data);
  console.log(wallet.data);

  const formatMoney = (val: number) => {
    return `₦${val.toLocaleString()}`;
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawError(null);

    if (selectedCurrency === "NGN") {
      if (amountInput <= 1000) {
        setWithdrawError("Payout limit: Minimum withdrawal amount is ₦1,000.");
        return;
      }

      if (amountInput > (wallet?.data?.available?.NGN ?? 0)) {
        setWithdrawError(
          `Payout bounds exceeded: Available balance is ₦${wallet?.data?.available.NGN.toLocaleString()}. Move locked funds by completing workspace deliverables.`,
        );
        return;
      }
    } else {
      if (amountInput <= 50) {
        setWithdrawError("Payout limit: Minimum USD withdrawal amount is $50.");
        return;
      }

      if (amountInput > (wallet?.data?.available?.USD ?? 0)) {
        setWithdrawError(
          `Payout bounds exceeded: Available balance is $${wallet?.data?.available.USD.toLocaleString()}. Move locked funds by completing workspace deliverables.`,
        );
        return;
      }
    }

    if (!bankSelected) {
      setWithdrawError(
        selectedCurrency === "NGN"
          ? "Please select a verified Nigerian payout receiving destination bank."
          : "Please select a verified USD payout network or domiciliary node.",
      );
      return;
    }

    if (selectedCurrency === "NGN") {
      if (accountNumber.length !== 10) {
        setWithdrawError(
          "Invalid NUBAN account code structure. Real Nigerian accounts possess exactly 10 digits.",
        );
        return;
      }
    } else {
      if (accountNumber.length < 8 || accountNumber.length > 17) {
        setWithdrawError(
          "Invalid dollar account format. Receiving accounts must possess between 8 to 17 digits.",
        );
        return;
      }
    }

    // Resolve fictitious elegant name for mockup realism
    setAccountName("Oluwaseun Adebayo (Verified)");

    // Check if phone number is verified; if not, route to security linkage step 5
    // if (!currentUser.phoneVerified) {
    //   setWithdrawStep(5);
    // } else {
    //   setWithdrawStep(2);
    // }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawError(null);

    if (otpCode !== "9999" && otpCode !== "1234") {
      setWithdrawError(
        'Unauthorized 2FA Pin. Use "9999" or "1234" inside visual sandbox parameters!',
      );
      return;
    }

    setIsProcessing(true);
    setWithdrawStep(4); // Processing spinner page

    // const success = await withdrawFunds(
    //   amountInput,
    //   bankSelected,
    //   accountNumber,
    //   otpCode,
    //   selectedCurrency,
    // );

    setIsProcessing(false);
    // if (success) {
    //   setWithdrawStep(3);
    // } else {
    //   setWithdrawStep(1);
    //   setWithdrawError(
    //     "Integrated bank transaction cleared in failure. Try lesser amount.",
    //   );
    // }
  };

  const filteredBanks = useMemo(() => {
    if (!banks.data) return [];

    const search = debouncedBankSearch.trim().toLowerCase();

    if (!search) {
      return banks.data.slice(0, 50);
    }

    return banks.data
      .filter(
        (bank) =>
          bank.name.toLowerCase().includes(search) ||
          bank.code.toLowerCase().includes(search),
      )
      .slice(0, 50);
  }, [banks, debouncedBankSearch]);

  const selectedBank = useMemo(
    () => banks.data?.find((bank) => bank.code === bankSelected),
    [banks, bankSelected],
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in font-sans">
      {/* Overview Balance Grid */}

      {wallet.isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4.5 border border-gray-100 shadow-xs animate-pulse"
            >
              <div className="h-3 w-32 bg-gray-200 rounded mb-3" />
              <div className="h-7 w-28 bg-gray-200 rounded mb-3" />
              <div className="h-3 w-36 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : wallet.isError ? (
        <div className="grid grid-cols-1">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
            <p className="text-sm font-semibold text-red-700">
              Unable to load wallet balances
            </p>

            <p className="text-sm text-red-500 mt-1">
              Something went wrong while retrieving your wallet information.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {/* Available NGN */}
          <div className="bg-white rounded-2xl p-4.5 border border-gray-100 shadow-xs">
            <span className="text-label text-gray-400 block tracking-wider">
              Available Naira (NGN)
            </span>

            <span className="text-h2 text-amount text-gray-900 block mt-1">
              {formatNumberToCurrency(wallet.data?.available.NGN ?? 0, "NGN")}
            </span>

            <span className="text-caption text-emerald-600 font-bold block mt-1 uppercase tracking-wide">
              ✓ Instant Cashout Ready
            </span>
          </div>

          {/* Available USD */}
          <div className="bg-white rounded-2xl p-4.5 border border-gray-100 shadow-xs">
            <span className="text-label text-gray-400 block tracking-wider">
              Available Dollars (USD)
            </span>

            <span className="text-h2 text-amount text-gray-900 block mt-1">
              {formatNumberToCurrency(wallet.data?.available.USD ?? 0, "USD")}
            </span>

            <span className="text-caption text-blue-600 font-bold block mt-1 uppercase tracking-wide">
              ✓ Dollar Payout Ready
            </span>
          </div>

          {/* Locked NGN */}
          <div className="bg-amber-50/30 rounded-2xl p-4.5 border border-amber-100 shadow-xs">
            <span className="text-label text-amber-800 block tracking-wider">
              Locked Naira (NGN)
            </span>

            <span className="text-h2 text-amount text-amber-700 block mt-1">
              {formatNumberToCurrency(wallet.data?.locked.NGN ?? 0, "NGN")}
            </span>

            <span className="text-caption text-amber-600 font-medium block mt-1 uppercase tracking-wide">
              Waiting active milestones
            </span>
          </div>

          {/* Locked USD */}
          <div className="bg-amber-50/30 rounded-2xl p-4.5 border border-amber-100 shadow-xs">
            <span className="text-label text-amber-800 block tracking-wider">
              Locked Dollars (USD)
            </span>

            <span className="text-h2 text-amount text-amber-700 block mt-1">
              {formatNumberToCurrency(wallet.data?.locked.USD ?? 0, "USD")}
            </span>

            <span className="text-caption text-amber-600 font-medium block mt-1 uppercase tracking-wide">
              Reviewing deliveries
            </span>
          </div>
        </div>
      )}

      {/* Main interactive section with responsive columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-gray-100 space-y-6">
          {withdrawStep === 1 && (
            <div className="space-y-6">
              <div className="text-left space-y-1">
                <h2 className="text-h3 text-gray-900">
                  Secure Wallet Withdrawal
                </h2>
                <p className="text-body-sm text-brand-neutral">
                  Cash out NGN to local banks, or withdraw USD directly to
                  international dollar accounts or domiciliary methods.
                </p>
              </div>

              {/* Currency Selector Tabs */}
              <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCurrency("NGN");
                    setAmountInput(0);
                    setBankSelected("");
                    setAccountNumber("");
                    setWithdrawError(null);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${selectedCurrency === "NGN" ? "bg-white text-brand-primary shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                >
                  Naira (NGN)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCurrency("USD");
                    setAmountInput(0);
                    setBankSelected("");
                    setAccountNumber("");
                    setWithdrawError(null);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${selectedCurrency === "USD" ? "bg-white text-brand-primary shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                >
                  Dollar (USD)
                </button>
              </div>

              <form
                onSubmit={handleDetailsSubmit}
                className="space-y-4 text-left font-sans"
              >
                <div>
                  <label
                    htmlFor="wallet-withdrawal-amount"
                    className="text-label text-gray-400 mb-1 block"
                  >
                    {selectedCurrency === "NGN"
                      ? "Enter Amount (₦)"
                      : "Enter Amount ($)"}
                  </label>
                  <input
                    id="wallet-withdrawal-amount"
                    type="number"
                    required
                    value={amountInput || ""}
                    onChange={(e) => setAmountInput(Number(e.target.value))}
                    placeholder={
                      selectedCurrency === "NGN" ? "e.g. 50000" : "e.g. 250"
                    }
                    className="w-full px-4 py-3 text-xs bg-gray-50 rounded-xl border border-gray-100 placeholder-gray-300 text-gray-850 font-mono font-extrabold focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* <div>
                    <label
                      htmlFor="wallet-payout-bank"
                      className="text-label text-gray-400 mb-1 block"
                    >
                      {
                        // selectedCurrency === "NGN"
                        // ?
                        "Destination Bank"
                        // : "USD Payout Network"
                      }
                    </label>
                    <select
                      id="wallet-payout-bank"
                      required
                      value={bankSelected}
                      onChange={(e) => setBankSelected(e.target.value)}
                      className="w-full px-4 py-3 text-xs bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:border-brand-primary font-semibold text-gray-700"
                    >
                      <option value="">
                        {
                          // selectedCurrency === "NGN"
                          // ?
                          "-- Choose Payout Bank --"
                          // : "-- Choose Payout Method --"
                        }
                      </option>
                      {
                        // selectedCurrency === "NGN"
                        //   ?
                        NIGERIAN_BANKS.map((bank, i) => (
                          <option key={i} value={bank}>
                            {bank}
                          </option>
                        ))
                        // : USD_PAYOUT_NETWORKS.map((bank, i) => (
                        //     <option key={i} value={bank}>
                        //       {bank}
                        //     </option>
                        //   ))
                      }
                    </select>
                  </div> */}

                  <div className="relative">
                    <label
                      htmlFor="wallet-payout-bank"
                      className="text-label text-gray-400 mb-1 block"
                    >
                      Destination Bank
                    </label>

                    {/* Selected bank / trigger */}
                    <button
                      type="button"
                      id="wallet-payout-bank"
                      disabled={banks.isLoading || banks.isError}
                      onClick={() => setIsBankDropdownOpen((prev) => !prev)}
                      className="w-full px-4 py-3 text-xs bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:border-brand-primary font-semibold text-gray-700 text-left flex items-center justify-between disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {banks.isLoading ? (
                        <span className="flex items-center gap-2 text-gray-400">
                          <span className="w-3 h-3 border-2 border-gray-300 border-t-brand-primary rounded-full animate-spin" />
                          Loading banks...
                        </span>
                      ) : banks.isError ? (
                        <span className="text-red-500">
                          Unable to load banks
                        </span>
                      ) : selectedBank ? (
                        <span>{selectedBank.name}</span>
                      ) : (
                        <span className="text-gray-400">
                          -- Choose Payout Bank --
                        </span>
                      )}

                      {!banks.isLoading && !banks.isError && (
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            isBankDropdownOpen ? "-rotate-90" : "rotate-90"
                          }`}
                        />
                      )}
                    </button>

                    {/* Dropdown */}
                    {isBankDropdownOpen &&
                      !banks.isLoading &&
                      !banks.isError && (
                        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                          {/* Search */}
                          <div className="p-2 border-b border-gray-100">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                              <input
                                type="text"
                                value={bankSearch}
                                onChange={(e) => setBankSearch(e.target.value)}
                                placeholder="Search bank..."
                                autoFocus
                                className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 rounded-lg border border-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-brand-primary"
                              />
                            </div>
                          </div>

                          {/* Banks */}
                          <div className="max-h-60 overflow-y-auto">
                            {filteredBanks.length > 0 ? (
                              filteredBanks.map((bank) => (
                                <button
                                  key={bank.id}
                                  type="button"
                                  onClick={() => {
                                    setBankSelected(bank.code);
                                    setBankSearch("");
                                    setIsBankDropdownOpen(false);
                                  }}
                                  className="w-full px-4 py-3 text-left text-xs hover:bg-gray-50 transition flex items-center justify-between gap-3"
                                >
                                  <div className="min-w-0">
                                    <p className="font-semibold text-gray-700 truncate">
                                      {bank.name}
                                    </p>

                                    <p className="text-[10px] text-gray-400 mt-0.5">
                                      {bank.code}
                                    </p>
                                  </div>

                                  {bankSelected === bank.code && (
                                    <Check className="w-4 h-4 text-brand-primary shrink-0" />
                                  )}
                                </button>
                              ))
                            ) : (
                              <div className="px-4 py-8 text-center">
                                <p className="text-xs font-medium text-gray-500">
                                  No bank found
                                </p>

                                <p className="text-[10px] text-gray-400 mt-1">
                                  Try searching with a different name or bank
                                  code.
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Result information */}
                          {filteredBanks.length === 50 && (
                            <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
                              <p className="text-[10px] text-gray-400">
                                Showing the first 50 results. Refine your search
                                to find a specific bank.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                  </div>

                  <div>
                    <label
                      htmlFor="wallet-account-number"
                      className="text-label text-gray-400 mb-1 block"
                    >
                      {
                        // selectedCurrency === "NGN"
                        //   ?
                        "10-Digit Account Number"
                        // : "Dollar Account Number / SWIFT routing code"
                      }
                    </label>
                    <input
                      id="wallet-account-number"
                      type="text"
                      required
                      // maxLength={selectedCurrency === "NGN" ? 10 : 17}
                      maxLength={10}
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder={
                        // selectedCurrency === "NGN"
                        //   ?
                        "e.g. 0124567895"
                        // : "e.g. 192837456"
                      }
                      className="w-full px-4 py-3 text-xs bg-gray-50 rounded-xl border border-gray-100 placeholder-gray-300 font-mono text-gray-800 font-bold focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>

                {withdrawError && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-start gap-2 border border-red-100 mt-1 animate-fade-in">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{withdrawError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/95 transition flex items-center justify-center gap-1 cursor-pointer shadow-xs active:scale-95"
                >
                  Proceed
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* 2FA Verification Steps */}
          {withdrawStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <span className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-5 h-5" />
                </span>
                <h2 className="text-base font-extrabold text-[#111827]">
                  Two-Factor Authorization (2FA)
                </h2>
                <p className="text-xs text-brand-neutral mt-1">
                  Authorized security checks validate your payout locks.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-center space-y-1">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  Sandbox verification pin
                </span>
                <span className="text-lg font-black tracking-widest text-brand-primary font-mono block">
                  9 9 9 9
                </span>
              </div>

              <form
                onSubmit={handle2FASubmit}
                className="space-y-4 text-left max-w-sm mx-auto"
              >
                <div>
                  <label
                    htmlFor="wallet-2fa-code"
                    className="block text-xs font-bold text-slate-500 mb-1.5 text-center"
                  >
                    Enter 4-Digit 2FA Code
                  </label>
                  <input
                    id="wallet-2fa-code"
                    type="text"
                    required
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="0 0 0 0"
                    className="w-full text-center px-4 py-3 tracking-widest text-[#111827] font-mono font-black text-lg bg-gray-50 border border-gray-150 rounded-xl focus:outline-none focus:border-brand-primary"
                  />
                </div>

                {withdrawError && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{withdrawError}</span>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setWithdrawStep(1)}
                    className="flex-1 py-3 border border-gray-250 text-gray-600 text-xs font-semibold rounded-xl text-center hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-brand-primary text-white text-xs font-bold rounded-xl text-center hover:bg-brand-primary/95 transition shadow-xs cursor-pointer"
                  >
                    Withdraw
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 5: Advanced Withdrawal protection system entry (phone number + OTP verification linking) */}
          {withdrawStep === 5 && (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="space-y-1">
                <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  🔒 Progressive Withdrawal Protection System
                </span>
                <h2 className="text-h3 text-gray-900 mt-2">
                  Payout Security & Phone Setup
                </h2>
                <p className="text-body-sm text-brand-neutral">
                  To guarantee secure funds disbursement and guard against
                  unauthorized withdrawals, link your WhatsApp phone number as
                  secondary 2FA.
                </p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100/50 space-y-1.5 text-[11px] font-medium text-slate-650">
                <div className="flex flex-wrap items-center gap-1.5 text-emerald-600 font-bold">
                  <span>✓ Email Verification Checked:</span>
                  <span className="bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded text-[9.5px]">
                    Verified ✅
                  </span>
                </div>
                <p className="text-gray-450 leading-relaxed font-sans">
                  As part of our high-value trust protection, a 2FA OTP security
                  PIN is generated live and dispatched directly to your
                  registered phone number.
                </p>
              </div>

              <div className="space-y-4">
                {/* Phone Input Card */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="payout-phone-field"
                    className="block text-xs font-bold text-slate-500 uppercase"
                  >
                    WhatsApp Phone Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="payout-phone-field"
                      type="text"
                      disabled={payoutOtpSent}
                      value={withdrawalPhone}
                      onChange={(e) => setWithdrawalPhone(e.target.value)}
                      placeholder="e.g. +234 803 123 4567"
                      className="flex-1 px-4 py-3 text-xs bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-brand-primary disabled:opacity-75 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!withdrawalPhone) {
                          setPayoutOtpError(
                            "Please enter your WhatsApp phone number.",
                          );
                          return;
                        }
                        setPayoutOtpSubmitting(true);
                        setTimeout(() => {
                          // updatePhoneNumber(withdrawalPhone, false); // Store on user
                          setPayoutOtpSent(true);
                          setPayoutOtpSubmitting(false);
                          setPayoutOtpError(null);
                          toast.success(
                            "Payout security OTP code dispatched successfully!",
                          );
                        }, 1000);
                      }}
                      className="px-5 py-3 bg-brand-primary text-white font-bold rounded-xl text-xs hover:bg-brand-primary/95 transition cursor-pointer shrink-0 disabled:opacity-50"
                      disabled={payoutOtpSubmitting}
                    >
                      {payoutOtpSubmitting
                        ? "Sending..."
                        : payoutOtpSent
                          ? "Resend"
                          : "Send OTP"}
                    </button>
                  </div>
                  {payoutOtpSent && (
                    <span className="block text-[10.5px] text-emerald-600 font-bold leading-normal mt-1">
                      ✓ Security code simulated via WhatsApp Business! Standard
                      demo codes: "1234" or "9999".
                    </span>
                  )}
                </div>

                {/* OTP Verifier */}
                {payoutOtpSent && (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setPayoutOtpError(null);
                      if (
                        payoutOtpCode === "1234" ||
                        payoutOtpCode === "9999"
                      ) {
                        setIsProcessing(true);
                        setWithdrawStep(4); // Show processing screen

                        // Mark Phone verified
                        // updatePhoneNumber(withdrawalPhone, true);

                        // Process actual withdrawal
                        // const success = await withdrawFunds(
                        //   amountInput,
                        //   bankSelected,
                        //   accountNumber,
                        //   payoutOtpCode,
                        //   selectedCurrency,
                        // );
                        setIsProcessing(false);
                        // if (success) {
                        //   setWithdrawStep(3); // Success Screen
                        // } else {
                        //   setWithdrawStep(1);
                        //   setPayoutOtpError(
                        //     "Integrated bank transaction cleared in failure. Try lesser amount.",
                        //   );
                        // }
                      } else {
                        setPayoutOtpError(
                          "Incorrect security OTP pin. Please try again! (Tip: Use 1234 or 9999 inside sandbox parameters!)",
                        );
                      }
                    }}
                    className="space-y-4 pt-3 border-t border-gray-100 animate-fade-in"
                  >
                    <div className="space-y-1.5">
                      <label
                        htmlFor="payout-otp-field"
                        className="block text-xs font-bold text-slate-500 uppercase"
                      >
                        Enter 4-Digit Payout Security Code
                      </label>
                      <input
                        id="payout-otp-field"
                        type="text"
                        maxLength={4}
                        value={payoutOtpCode}
                        onChange={(e) => {
                          setPayoutOtpCode(e.target.value);
                          setPayoutOtpError(null);
                        }}
                        placeholder="e.g. 1234"
                        className="w-full px-4 py-3 tracking-[1.5em] text-center text-sm font-mono font-extrabold bg-gray-55/30 border border-gray-150 rounded-xl focus:outline-none focus:border-brand-primary"
                      />
                    </div>

                    {payoutOtpError && (
                      <div className="p-3 bg-red-50 text-red-700 text-[11px] rounded-xl font-bold leading-normal">
                        ❌ {payoutOtpError}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setWithdrawStep(1);
                          setPayoutOtpSent(false);
                          setPayoutOtpCode("");
                        }}
                        className="flex-1 py-3 bg-white border border-gray-200 text-gray-655 text-xs font-bold rounded-xl text-center hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-emerald-600 text-white text-xs font-bold rounded-xl text-center hover:bg-emerald-700 transition shadow-md shadow-emerald-100 cursor-pointer"
                      >
                        Authorize & Process Withdrawal
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Processing View */}
          {withdrawStep === 4 && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center animate-fade-in">
              <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
              <h3 className="text-sm font-bold text-gray-900">
                Validating payout parameters with Banking Network...
              </h3>
              <p className="text-xs text-brand-neutral leading-relaxed max-w-xs font-sans">
                {selectedCurrency === "NGN"
                  ? "Please do not refresh as we verify NUBAN routes and dispatch Naira assets."
                  : "Please do not refresh as we verify international routing notes and dispatch USD assets."}
              </p>
            </div>
          )}

          {/* Payout Success Screen */}
          {withdrawStep === 3 && (
            <div className="space-y-6 py-6 text-center animate-fade-in max-w-sm mx-auto">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-[#111827]">
                  {selectedCurrency === "NGN"
                    ? "Naira Transfer Dispatched!"
                    : "Dollar Transfer Dispatched!"}
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed mt-2">
                  We successfully debited{" "}
                  <span className="font-bold text-gray-800">
                    {selectedCurrency === "NGN"
                      ? `₦${amountInput.toLocaleString()}`
                      : `$${amountInput.toLocaleString()}`}
                  </span>{" "}
                  and wired funds to your{" "}
                  <span className="font-semibold text-gray-800">
                    {bankSelected}
                  </span>{" "}
                  account{" "}
                  <span className="font-mono text-gray-800">
                    {accountNumber}
                  </span>
                  .
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setWithdrawStep(1);
                  setAmountInput(0);
                  setBankSelected("");
                  setAccountNumber("");
                  setAccountName("");
                  setOtpCode("");
                }}
                className="w-full py-3 bg-brand-primary text-white text-xs font-bold rounded-xl transition hover:bg-brand-primary/95 shadow-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Informative Security and Help details for high responsive parity */}
        <div className="space-y-6">
          {/* Card 1: Security parameters */}
          <div className="p-5.5 bg-white rounded-3xl border border-gray-100 shadow-xs text-left space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-primary flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-800 block">
                Transaction Security
              </span>
              <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                Mimotar operates fully verified Naira and Dollar escrow payout
                channels with global bank partners and wire platforms. Standard
                security guarantees cover all deposits and payout lock channels.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-[10px] text-gray-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>PCI-DSS SECURED NETWORK</span>
            </div>
          </div>

          {/* Card 2: Payout support */}
          <div className="p-5.5 bg-white rounded-3xl border border-gray-100 shadow-xs text-left space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <QuestionIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-800 block">
                Payout Timing & Support
              </span>
              <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                Naira withdrawals are processed instantly through Flutterwave
                real-time channels. Dollar withdrawals arrive in your recipient
                node or domiciliary account within 24 to 48 business hours.
              </p>
            </div>
            <div className="p-2.5 bg-blue-50/40 rounded-xl border border-blue-100/30 text-[10px] text-gray-500 text-center font-medium">
              ℹ️ Need help? Contact simulated Mimotar Escrow Support directly
              via official workspace channels.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
