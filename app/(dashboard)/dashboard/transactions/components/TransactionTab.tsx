"use client";
import { useState } from "react";
import FilterSection from "./FilterSection";
import TransactionsTable from "./TransactionsTable";
import { useFetch } from "@/app/hooks/useFetch";
import { ITransaction, TransactionsResponse } from "../types/ITransactions";
import { DisputeForm } from "./DisputeForm";
import { Row } from "@tanstack/react-table";
import InitiateClosure from "./InitiateClosure";
import toast from "react-hot-toast";
import axiosService from "@/lib/services/axiosService";
import { AxiosError } from "axios";
import AcceptTransactionForClosure from "./AcceptTransactionForClosure";
import RejectTransactionForClosure from "./RejectTransactionForClosure";
import { useQueryClient } from "@tanstack/react-query";

type ILoading = "idle" | "loading" | "error" | "success";

export default function TransactionTab() {
  const [status, setStatus] = useState<ILoading>("idle");
  const [AcceptClosureStatus, setAcceptClosureStatus] =
    useState<ILoading>("idle");
  const [RejectClosureStatus, setRejectClosureStatus] =
    useState<ILoading>("idle");
  const [openDispute, setOpenDispute] = useState(false);
  const [openMarkedAsResolve, setOpenMarkedAsResolve] = useState(false);
  const [openAcceptForClosure, setOpenAcceptForClosure] = useState(false);
  const [openRejectForClosure, setOpenRejectForClosure] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<
    Row<ITransaction> | undefined
  >(undefined);
  const [transaction, setTransaction] = useState<Row<ITransaction> | undefined>(
    undefined,
  );

  console.log("selected transaction", transaction);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useFetch<
    TransactionsResponse,
    Error,
    TransactionsResponse
  >(["transaction"], "ticket/transactions");

  const handleOpenDispute = (row: Row<ITransaction>) => {
    setOpenDispute(true);
    setSelectedDispute(row);
  };

  const handleOpenForClosure = (row: Row<ITransaction>) => {
    setOpenMarkedAsResolve(true);
    setTransaction(row);
  };

  const handleOpenAcceptResolve = (row: Row<ITransaction>) => {
    setOpenAcceptForClosure(true);
    setTransaction(row);
  };
  const handleOpenRejectClosure = (row: Row<ITransaction>) => {
    setOpenRejectForClosure(true);
    setTransaction(row);
  };

  const initiateClosure = async () => {
    try {
      if (!transaction?.original.id) {
        toast.error("No Transaction selected");
        return;
      }
      setStatus("loading");

      await axiosService.put(`/ticket/${transaction.original.id}/resolve`);
      toast.success("Transaction resolution requested");
      setStatus("success");
      await queryClient.invalidateQueries({ queryKey: ["transaction"] });
      setTransaction(undefined);
      setOpenMarkedAsResolve(true);
    } catch (error) {
      setStatus("error");
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(
          error.response?.data.message ||
            "Transaction resolution is not ongoing",
        );
        return;
      }

      if (error instanceof Error) {
        toast.error(error.message || "Transaction resolution is not ongoing");
        return;
      }

      toast.error("Transaction resolution is not ongoing");
    }
  };

  const handleAcceptClosure = async () => {
    try {
      if (!transaction?.id) {
        toast.error("No Transaction selected");
        return;
      }
      setAcceptClosureStatus("loading");

      await axiosService.put(
        `/ticket/${transaction.original.id}/accept-resolution`,
      );
      toast.success("Transaction closure accepted");
      await queryClient.invalidateQueries({ queryKey: ["transaction"] });
      setAcceptClosureStatus("success");
      setTransaction(undefined);
      setOpenAcceptForClosure(true);
    } catch (error) {
      setAcceptClosureStatus("error");
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "Transaction Closure failed",
        );
        return;
      }

      if (error instanceof Error) {
        toast.error(error.message || "Transaction Closure failed");
        return;
      }

      toast.error("Transaction Closure failed");
    }
  };

  const handleRejectClosure = async () => {
    try {
      if (!transaction?.original.id) {
        toast.error("No Transaction selected");
        return;
      }
      setRejectClosureStatus("loading");

      await axiosService.put(
        `ticket/${transaction.original.id}/reject-resolution`,
      );
      await queryClient.invalidateQueries({ queryKey: ["transaction"] });
      toast.success("Transaction closure Rejected");
      setRejectClosureStatus("success");
      setTransaction(undefined);
      setOpenRejectForClosure(true);
    } catch (error) {
      setRejectClosureStatus("error");
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data || "Transaction closure rejected failed",
        );
        return;
      }

      if (error instanceof Error) {
        toast.error(error.message || "Transaction closure rejected failed");
        return;
      }

      toast.error("Transaction closure rejected failed");
    }
  };

  return (
    <section className="flex flex-col h-full w-full mt-6 rounded-md border border-neutral-200 p-3">
      <FilterSection />
      <TransactionsTable
        data={data?.data ?? []}
        isLoading={isLoading}
        isError={isError}
        error={error}
        handleOpenForClosure={handleOpenForClosure}
        handleOpenDispute={handleOpenDispute}
        handleOpenAcceptResolve={handleOpenAcceptResolve}
        handleSetRejectForClosure={handleOpenRejectClosure}
      />

      <DisputeForm
        open={openDispute}
        setOpen={setOpenDispute}
        transaction={selectedDispute}
      />

      <InitiateClosure
        onMarkAsPendingClosure={initiateClosure}
        open={openMarkedAsResolve}
        setOpen={setOpenMarkedAsResolve}
        status={status}
      />

      <AcceptTransactionForClosure
        onAccept={handleAcceptClosure}
        open={openAcceptForClosure}
        setOpen={setOpenAcceptForClosure}
        status={AcceptClosureStatus}
      />

      <RejectTransactionForClosure
        onReject={handleRejectClosure}
        open={openRejectForClosure}
        setOpen={setOpenRejectForClosure}
        status={RejectClosureStatus}
      />
    </section>
  );
}
