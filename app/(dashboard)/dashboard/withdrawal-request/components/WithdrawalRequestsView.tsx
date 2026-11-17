"use client";

import { AxiosError } from "axios";
import { AlertCircle, Clock3, RefreshCw, ReceiptText } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { ConfirmWithdrawalDialog } from "./ConfirmWithdrawalDialog";
import { WithdrawalRequestCard } from "./WithdrawalRequestCard";
import { useConfirmWithdrawalRequest } from "../hooks/useConfirmWithdrawalRequest";
import { useWithdrawalRequests } from "../hooks/useWithdrawalRequests";
import type { WithdrawalRequest } from "../types/IWithdrawalRequest";

export function WithdrawalRequestsView() {
  const requestsQuery = useWithdrawalRequests();
  const confirmMutation = useConfirmWithdrawalRequest();
  const requests = requestsQuery.data ?? null;
  const [selectedRequest, setSelectedRequest] =
    useState<WithdrawalRequest | null>(null);

  const openConfirmation = (request: WithdrawalRequest) => {
    setSelectedRequest(request);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedRequest(null);
    }
  };

  const handleConfirm = (otp: string) => {
    if (!selectedRequest || otp.length !== 6) return;

    confirmMutation.mutate(
      { requestId: selectedRequest.id, otp },
      {
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(
              error.response?.data?.message ||
                "The payout could not be confirmed. Check the code and try again.",
            );
            return;
          }

          if (error instanceof Error) {
            toast.error(
              error.message ||
                "The payout could not be confirmed. Please try again.",
            );
            return;
          }

          toast.error("The payout could not be confirmed. Please try again.");
        },
        onSuccess: (result) => {
          toast.success(result?.message || "Payout confirmed successfully.");
          handleDialogOpenChange(false);
        },
      },
    );
  };

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:py-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-primary">
            Wallet activity
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Payout requests
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Review the amount, date, and latest status of each payout request.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void requestsQuery.refetch()}
          disabled={requestsQuery.isFetching}
          className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
        >
          <RefreshCw
            aria-hidden="true"
            className={`h-4 w-4 ${requestsQuery.isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </header>

      {requestsQuery.isLoading ? (
        <ul
          aria-label="Loading payout requests"
          className="space-y-3"
          aria-busy="true"
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <li
              key={index}
              className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5"
            >
              <div className="h-4 w-40 rounded bg-gray-200" />
              <div className="mt-4 h-3 w-28 rounded bg-gray-100" />
            </li>
          ))}
        </ul>
      ) : requestsQuery.isError && !requests ? (
        <section
          role="alert"
          className="rounded-2xl border border-rose-200 bg-rose-50 p-5 sm:p-6"
        >
          <div className="flex items-start gap-3">
            <AlertCircle
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-rose-600"
            />
            <div className="min-w-0">
              <h2 className="font-semibold text-rose-900">
                Could not load payout requests
              </h2>
              <p className="mt-1 text-sm text-rose-800">
                {requestsQuery.error instanceof Error
                  ? requestsQuery.error.message
                  : "Something went wrong while retrieving your requests."}
              </p>
              <button
                type="button"
                onClick={() => void requestsQuery.refetch()}
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-rose-800 ring-1 ring-inset ring-rose-300 transition hover:bg-rose-100"
              >
                <RefreshCw aria-hidden="true" className="h-4 w-4" />
                Try again
              </button>
            </div>
          </div>
        </section>
      ) : !requests ? (
        <section
          role="alert"
          className="rounded-2xl border border-rose-200 bg-rose-50 p-5 sm:p-6"
        >
          <h2 className="font-semibold text-rose-900">
            Payout requests are unavailable
          </h2>
          <p className="mt-1 text-sm text-rose-800">
            No request data was returned. Refresh to try again.
          </p>
        </section>
      ) : requests?.data.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center sm:px-8">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
            <ReceiptText aria-hidden="true" className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            No payout requests yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
            Requests you make from your wallet will appear here.
          </p>
        </section>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-gray-800">
              All requests
            </h2>
            <p className="text-xs text-gray-500">
              {requests?.data.length}{" "}
              {requests?.data.length === 1 ? "request" : "requests"}
            </p>
          </div>
          <ul className="space-y-3" aria-label="Payout requests">
            {requests?.data.map((request) => (
              <WithdrawalRequestCard
                key={request.id}
                request={request}
                onConfirm={openConfirmation}
                confirming={confirmMutation.isPending}
              />
            ))}
          </ul>
        </>
      )}

      {requestsQuery.isFetching && requests?.data?.length ? (
        <p className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <Clock3 aria-hidden="true" className="h-4 w-4" />
          Updating requests…
        </p>
      ) : null}

      {selectedRequest ? (
        <ConfirmWithdrawalDialog
          request={selectedRequest}
          submitting={confirmMutation.isPending}
          // error={confirmationError}
          onOpenChange={handleDialogOpenChange}
          onSubmit={handleConfirm}
        />
      ) : null}
    </main>
  );
}
