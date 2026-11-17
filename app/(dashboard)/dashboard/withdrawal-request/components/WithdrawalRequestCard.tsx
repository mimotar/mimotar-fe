import { CalendarDays } from "lucide-react";
import { formatNumberToCurrency } from "@/app/utils/formatNumberToCurrency";
import type { WithdrawalRequest } from "../types/IWithdrawalRequest";

function formatStatus(status: string) {
  return status
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getStatusStyle(status: string) {
  const normalizedStatus = status.toLowerCase();

  if (
    ["completed", "paid", "success", "successful"].includes(normalizedStatus)
  ) {
    return "bg-emerald-50 text-emerald-700 ring-emerald-600/15";
  }

  if (
    ["failed", "rejected", "cancelled", "canceled"].includes(normalizedStatus)
  ) {
    return "bg-rose-50 text-rose-700 ring-rose-600/15";
  }

  if (
    ["otp_pending", "pending", "processing", "in_progress"].includes(
      normalizedStatus,
    )
  ) {
    return "bg-amber-50 text-amber-800 ring-amber-600/15";
  }

  return "bg-gray-100 text-gray-700 ring-gray-500/10";
}

function formatRequestDate(value?: string) {
  if (!value) return "Date unavailable";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function maskAccountNumber(accountNumber: string) {
  const normalized = accountNumber.replace(/\s/g, "");
  return `**** ${normalized.slice(-4)}`;
}

type WithdrawalRequestCardProps = {
  request: WithdrawalRequest;
  onConfirm: (request: WithdrawalRequest) => void;
  confirming: boolean;
};

export function WithdrawalRequestCard({
  request,
  onConfirm,
  confirming,
}: WithdrawalRequestCardProps) {
  const details = [
    { label: "Bank", value: request.accountBank },
    { label: "Account name", value: request.accountName },
    {
      label: "Account number",
      value: request.accountNumber
        ? maskAccountNumber(request.accountNumber)
        : null,
    },
    { label: "Reference", value: request.reference },
    {
      label: "Code sent",
      value:
        request.status === "OTP_PENDING" && request.otpCreatedAt
          ? formatRequestDate(request.otpCreatedAt)
          : null,
    },
    { label: "Transfer ID", value: request.providerTransferId },
    {
      label: "Processed",
      value: request.processedAt
        ? formatRequestDate(request.processedAt)
        : null,
    },
    {
      label: "Completed",
      value: request.completedAt
        ? formatRequestDate(request.completedAt)
        : null,
    },
  ].filter((detail) => detail.value);

  return (
    <li className="rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:border-gray-300 sm:p-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-gray-900">
                Request #{request.id}
              </h3>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(request.status)}`}
              >
                {formatStatus(request.status)}
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
              {formatNumberToCurrency(request.amount, request.currency)}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0" />
              <time dateTime={request.createdAt}>
                {formatRequestDate(request.createdAt)}
              </time>
            </div>
            {request.status === "OTP_PENDING" ? (
              <button
                type="button"
                onClick={() => onConfirm(request)}
                disabled={confirming}
                className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 text-sm font-semibold text-white transition hover:bg-brand-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirm payout
              </button>
            ) : null}
          </div>
        </div>

        {details.length > 0 ? (
          <dl className="grid gap-x-6 gap-y-4 border-t border-gray-100 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            {details.map(({ label, value }) => (
              <div key={label} className="min-w-0">
                <dt className="text-xs font-medium text-gray-500">{label}</dt>
                <dd className="mt-1 break-words text-sm font-medium text-gray-800">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {request.failureReason ? (
          <p className="rounded-lg border border-rose-100 bg-rose-50 px-4 py-3 text-sm leading-5 text-rose-800">
            <span className="font-semibold">Transfer issue: </span>
            {request.failureReason}
          </p>
        ) : null}
      </div>
    </li>
  );
}
