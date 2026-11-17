"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronRight,
  Lock,
  AlertCircle,
  Loader2,
  HelpCircle as QuestionIcon,
  Check,
  Search,
} from "lucide-react";
import { useAuth } from "@/app/(client)/(page)/hooks/useAuth";
import { useWallet } from "../hooks/useWallet";
import { formatNumberToCurrency } from "@/app/utils/formatNumberToCurrency";
import { useDebounce } from "../hooks/useDebounce";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

export const WalletView: React.FC = () => {
  const session = useAuth();
  const queryClient = useQueryClient();
  const [selectedCurrency, setSelectedCurrency] = useState<"NGN" | "USD">(
    "NGN",
  );

  const [withdrawStep, setWithdrawStep] = useState<number>(1); // 1: Enter details, 2: 2FA verify, 3: Success, 4: Error/Processing, 5: Progressive Withdrawal Protection otp path
  const [amountInput, setAmountInput] = useState<number>(0);
  const [bankSelected, setBankSelected] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");

  const [withdrawError, setWithdrawError] = useState<string | null>(null);

  const [bankSearch, setBankSearch] = useState("");
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);

  const debouncedBankSearch = useDebounce(bankSearch, 300);

  const {
    wallet,
    banks,
    resolvePayoutAccount,
    getResolvedPayoutAccount,
    PayoutRequest,
  } = useWallet();

  useEffect(() => {
    setBankSelected(getResolvedPayoutAccount.data?.data?.bankCode || "");
    setAccountNumber(getResolvedPayoutAccount.data?.data?.accountNumber || "");
    setAccountName(getResolvedPayoutAccount.data?.data?.accountName || "");
  }, [getResolvedPayoutAccount.data]);

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

  const handleResolvePayoutAccount = async () => {
    if (!selectedBank) {
      setWithdrawError("Please select a valid bank before proceeding.");
      return;
    }

    if (!accountNumber) {
      setWithdrawError("Please enter a valid account number.");
      return;
    }
    resolvePayoutAccount.mutate(
      {
        bankName: selectedBank.name,
        bankCode: selectedBank.code,
        accountNumber,
      },
      {
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(
              error?.response?.data?.message ||
                "Unable to resolve the payout account",
            );
            return;
          }
          if (error instanceof Error) {
            toast.error(
              error?.message || "Unable to resolve the payout account.",
            );
            return;
          }

          toast.error("Unable to resolve the payout account.");
        },
        onSuccess: (data) => {
          toast.success(
            data?.message || "payout account resolve and saved successfully.",
          );
          queryClient.invalidateQueries({
            queryKey: ["get-resolved-payout-account"],
          });
        },
      },
    );
  };

  const handlePayoutRequest = () => {
    if (selectedCurrency === "NGN" && amountInput < 1000) {
      toast.error("Minimum withdrawal amount is ₦1,000.");
      return;
    }

    if (selectedCurrency === "USD" && amountInput < 50) {
      toast.error("Minimum withdrawal amount is $50.");
      return;
    }

    PayoutRequest.mutate(
      { amount: amountInput, currency: selectedCurrency },
      {
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(
              error?.response?.data?.message ||
                "Unable to process the payout request",
            );
            return;
          }
          if (error instanceof Error) {
            toast.error(
              error?.message || "Unable to process the payout request.",
            );
            return;
          }

          toast.error("Unable to process the payout request.");
        },
        onSuccess: (data) => {
          toast.success(
            data?.message || "Payout request processed successfully.",
          );
        },
      },
    );
  };

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

              {/* resolve and save payout account */}
              <form
                // onSubmit={handleDetailsSubmit}
                className="space-y-4 text-left font-sans "
              >
                <h1 className="font-bold ">Bank Account payout setup</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label
                      htmlFor="wallet-payout-bank"
                      className="text-label text-gray-400 mb-1 block"
                    >
                      Payout Bank
                    </label>

                    {/* Selected bank / trigger */}
                    <button
                      type="button"
                      id="wallet-payout-bank"
                      disabled={banks.isLoading || banks.isError}
                      onClick={() => setIsBankDropdownOpen((prev) => !prev)}
                      className="w-full px-4 py-3 text-xs bg-gray-50 rounded-xl border border-brand-primary focus:outline-none focus:border-brand-primary font-semibold text-gray-700 text-left flex items-center justify-between disabled:cursor-not-allowed disabled:opacity-60"
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
                        "Account Number"
                        // : "Dollar Account Number / SWIFT routing code"
                      }
                    </label>
                    <input
                      id="wallet-account-number"
                      type="number"
                      required
                      // maxLength={selectedCurrency === "NGN" ? 10 : 17}
                      // maxLength={10}
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder={
                        // selectedCurrency === "NGN"
                        //   ?
                        "e.g. 0124567895"
                        // : "e.g. 192837456"
                      }
                      className="w-full px-4 py-3 text-xs bg-gray-50 rounded-xl border border-brand-primary placeholder-gray-300 font-mono text-gray-800 font-bold focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="wallet-account-number"
                    className="text-label text-gray-400 mb-1 block"
                  >
                    Account Name
                  </label>
                  <input
                    id="wallet-account-name"
                    type="text"
                    readOnly
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 cursor-not-allowed py-3 text-xs bg-gray-50 rounded-xl border border-brand-primary placeholder-gray-300 font-mono text-gray-800 font-bold focus:outline-none focus:border-brand-primary"
                  />
                </div>

                {withdrawError && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-start gap-2 border border-red-100 mt-1 animate-fade-in">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{withdrawError}</span>
                  </div>
                )}

                <button
                  disabled={resolvePayoutAccount.isPending}
                  type="button"
                  onClick={handleResolvePayoutAccount}
                  className="w-full inline-flex gap-2 items-center py-3.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/95 transition flex items-center justify-center gap-1 cursor-pointer shadow-xs active:scale-95"
                >
                  Resolve and Save payout Account{" "}
                  <ChevronRight className="w-4 h-4" />
                  {resolvePayoutAccount.isPending && (
                    <Loader2 className="animate-spin text-white" />
                  )}
                </button>
              </form>

              <hr className="text-gray-300 my-5" />

              {/* payout  */}
              <h1 className="font-bold ">Payout</h1>

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

              <form className="space-y-4 text-left font-sans">
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
                    className="w-full px-4 py-3 text-xs bg-gray-50 rounded-xl border border-brand-primary placeholder-gray-300 text-gray-850 font-mono font-extrabold focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <button
                  type="button"
                  disabled={PayoutRequest.isPending}
                  onClick={handlePayoutRequest}
                  className="w-full py-3.5 inline-flex   bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/95 transition  items-center justify-center gap-1 cursor-pointer shadow-xs active:scale-95"
                >
                  Payout Request
                  <ChevronRight className="w-4 h-4" />{" "}
                  {PayoutRequest.isPending && (
                    <Loader2 className="animate-spin text-white" />
                  )}
                </button>
              </form>
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
