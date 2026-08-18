import { formatNumberToCurrency } from "@/app/utils/formatNumberToCurrency";
import { Wallet } from "lucide-react";
import { IWallet } from "../types/IGetDashboard";

interface IWalletCardProps {
  wallet: IWallet;
}

export default function WalletCard({ wallet }: IWalletCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6.5 shadow-sm border   border-gray-100 text-left">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="w-5 h-5 text-brand-primary" />
        <h2 className="text-label text-gray-500 font-bold tracking-wider">
          Escrow Balance Reserves
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Available Naira */}
        <div className="p-4.5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[110px]">
          <div>
            <span className="text-label text-gray-400 block tracking-wider">
              Available Naira (NGN)
            </span>
            <span className="text-h2 text-amount text-gray-900 mt-1.5 block">
              {formatNumberToCurrency(wallet.availableWithdrawable.NGN, "NGN")}
            </span>
          </div>
          <button
            //   onClick={() => {
            //     setWithdrawCurrencyPreference("NGN");
            //     setActivePage("wallet");
            //   }}
            className="mt-2.5 self-start text-body-sm font-bold text-brand-primary hover:underline transition cursor-pointer font-sans"
          >
            Withdraw NGN →
          </button>
        </div>

        {/* Card 2: Available Dollar (Visible, own clean field) */}
        <div className="p-4.5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[110px]">
          <div>
            <span className="text-label text-gray-400 block tracking-wider">
              Available Dollars (USD)
            </span>
            <span className="text-h2 text-amount text-gray-900 mt-1.5 block">
              {formatNumberToCurrency(wallet.availableWithdrawable.USD, "USD")}
            </span>
          </div>
          <button
            //   onClick={() => {
            //     setWithdrawCurrencyPreference("USD");
            //     setActivePage("wallet");
            //   }}
            className="mt-2.5 self-start text-body-sm font-bold text-brand-primary hover:underline transition cursor-pointer font-sans"
          >
            Withdraw USD →
          </button>
        </div>

        {/* Card 3: Locked Naira */}
        <div className="p-4.5 bg-amber-50/20 rounded-2xl border border-amber-100/50 flex flex-col justify-between min-h-[110px]">
          <div>
            <span className="text-label text-amber-700/80 block tracking-wider">
              Locked Escrow (NGN)
            </span>
            <span className="text-h2 text-amount text-amber-600 mt-1.5 block">
              {formatNumberToCurrency(wallet.lockedEscrow.NGN, "NGN")}
            </span>
          </div>
          <span className="mt-2.5 text-caption text-amber-700/60 font-medium flex items-center gap-1 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Active milestones
          </span>
        </div>

        {/* Card 4: Locked Dollar */}
        <div className="p-4.5 bg-amber-50/20 rounded-2xl border border-amber-100/50 flex flex-col justify-between min-h-[110px]">
          <div>
            <span className="text-label text-amber-700/80 block tracking-wider">
              Locked Escrow (USD)
            </span>
            <span className="text-h2 text-amount text-amber-600 mt-1.5 block">
              {/* ${wallet.pendingUsd.toLocaleString()} */}
              {formatNumberToCurrency(wallet.lockedEscrow.USD, "USD")}
            </span>
          </div>
          <span className="mt-2.5 text-caption text-amber-700/60 font-medium flex items-center gap-1 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Awaiting delivery
          </span>
        </div>
      </div>
    </div>
  );
}
