import Link from "next/link";
import VerifyIcon from "@/app/svgIconComponent/VerifyIcon";
import { AiOutlineCloseCircle } from "react-icons/ai";

type SearchParamValue = string | string[] | undefined;

const successStatuses = new Set(["success", "successful", "completed", "paid"]);
const failedStatuses = new Set([
  "failed",
  "failure",
  "error",
  "cancelled",
  "canceled",
]);

const getFirstParam = (value: SearchParamValue) =>
  Array.isArray(value) ? value[0] : value;

const normalizeStatus = (
  searchParam: Record<string, SearchParamValue>,
): "success" | "failed" => {
  const possibleStatus = [
    searchParam.status,
    searchParam.payment_status,
    searchParam.result,
  ]
    .map(getFirstParam)
    .find(Boolean);

  if (!possibleStatus) return "failed";

  const normalized = possibleStatus.toLowerCase().trim();
  if (successStatuses.has(normalized)) return "success";
  if (failedStatuses.has(normalized)) return "failed";
  return "failed";
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, SearchParamValue>>;
}) {
  const param = await searchParams;
  const paymentState = normalizeStatus(param);

  //   const callbackId = getFirstParam(param.id);
  const txRef = getFirstParam(param.tx_ref);
  const transactionId = getFirstParam(param.transaction_id);

  //   const canViewTransaction = Boolean(callbackId);
  //   const transactionHref = callbackId
  //     ? `/payment-detail?id=${encodeURIComponent(callbackId)}`
  //     : "/payment-detail";
  const isSuccess = paymentState === "success";

  return (
    <section className="h-full w-full flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-10">
        <div className="flex flex-col items-center text-center gap-4">
          {isSuccess ? (
            <VerifyIcon className="w-20 h-20" />
          ) : (
            <AiOutlineCloseCircle className="w-20 h-20 text-red-500" />
          )}

          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
            {isSuccess ? "Payment successful" : "Payment failed"}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl">
            {isSuccess
              ? "Your payment has been confirmed. You can continue with your transaction details below."
              : "We could not confirm your payment. Please try again or check with your payment provider."}
          </p>

          {(txRef || transactionId) && (
            <div className="w-full max-w-lg mt-2 rounded-xl bg-slate-50 border border-slate-200 p-4 text-left">
              <h2 className="text-sm font-semibold text-slate-800 mb-2">
                Payment reference
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {txRef && (
                  <p className="text-slate-700">
                    <span className="font-semibold">tx_ref:</span> {txRef}
                  </p>
                )}
                {transactionId && (
                  <p className="text-slate-700">
                    <span className="font-semibold">transaction_id:</span>{" "}
                    {transactionId}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/"
              className="h-12 rounded-lg border-2 border-brand-primary text-brand-primary font-semibold inline-flex items-center justify-center hover:bg-brand-primary/90 hover:text-white"
            >
              Go home
            </Link>

            <Link
              href={""}
              //   transactionHref
              //   aria-disabled={!canViewTransaction}
              className={`h-12 rounded-lg text-white font-semibold inline-flex items-center justify-center
             
              `}

              //       ${
              //     canViewTransaction
              //       ? "bg-brand-primary hover:opacity-90"
              //       : "bg-slate-300 pointer-events-none cursor-not-allowed"
              //   }
            >
              View transaction
            </Link>
          </div>

          {/* {!canViewTransaction && (
            <p className="text-xs text-slate-500">
              Transaction ID is missing in the callback URL.
            </p>
          )} */}
        </div>
      </div>
    </section>
  );
}
