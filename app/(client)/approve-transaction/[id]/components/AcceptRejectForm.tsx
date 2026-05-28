"use client";

import PrimaryButton from "@/app/commons/PrimaryButtons";
import SecondaryButton from "@/app/commons/SecondaryButton";
import { useMutateAction } from "@/app/hooks/useMutation";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { ApproveTransactionResponse } from "../types/IApproveResponse";
import { useSession } from "next-auth/react";
import AuthForm from "@/app/auth/AuthForm";

export default function AcceptRejectForm({
  id,
  token,
}: {
  id: string;
  token: string;
}) {
  const [approveToken, setApproveToken] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [debouncedRejectionReason, setDebouncedRejectionReason] = useState("");
  const [openAuth, setOpenAuth] = useState(false);
  const [ActiveTab, setActiveTab] = useState<"login" | "register">("login");
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedRejectionReason(rejectionReason);
    }, 5000);

    return () => {
      clearTimeout(handler);
    };
  }, [rejectionReason]);

  //request token
  const { mutate, isPending, isError } = useMutateAction(
    "post",
    `ticket/${id}/request-token`,
  );

  const handleRequestToken = () => {
    if (session.status !== "authenticated") {
      toast.error("You must be logged in/Registered to request token");
      setOpenAuth(true);
      setActiveTab("login");
      return;
    }
    mutate(
      {},
      {
        onSuccess: (data: any) => {
          console.log(data);
          toast.success(
            "Token requested successfully. Check your email for the token if it has not auto-filled already.",
          );
          setApproveToken(data?.data.otp);
          return;
        },
        onError: (error: unknown) => {
          if (error instanceof AxiosError) {
            toast.error(
              error.response?.data?.message || "Error requesting token",
            );
            return;
          }
          if (error instanceof Error) {
            toast.error(error.message || "Error requesting token");
            return;
          }

          toast.error("Error requesting token");
        },
      },
    );
  };

  //approve/accept ticket
  const { mutate: AcceptTicketMutate, isPending: isAcceptTicketPending } =
    useMutateAction<ApproveTransactionResponse, { otp: string }>(
      "put",
      `/ticket/approve/${id}`,
    );

  const handleAcceptTicket = () => {
    console.log(approveToken);
    if (!approveToken) {
      toast.error("Requires Token to approve the Ticket");
      return;
    }

    if (session.status !== "authenticated") {
      toast.error("You must be logged in/Registered to approve the Ticket");
      setOpenAuth(true);
      setActiveTab("login");
      return;
    }
    AcceptTicketMutate(
      { otp: approveToken },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success("Ticket accept/approve successfully. ");
          router.push(`/ticket-accept?id=${id}`);
          // router.push(data.data.txn_link);
        },
        onError: (error: unknown) => {
          if (error instanceof AxiosError) {
            console.log(error.response?.data);
            toast.error(
              error.response?.data?.message || "Error accepting Ticket",
            );
            return;
          }
          if (error instanceof Error) {
            toast.error(error.message || "Error accepting Ticket");
            return;
          }
          toast.error("Error accepting Ticket");
        },
      },
    );
  };

  //reject ticket
  const { mutate: RejectTicketMutate, isPending: isRejectTicketPending } =
    useMutateAction<ApproveTransactionResponse, { otp: string }>(
      "put",
      `/ticket/reject/${id}`,
    );

  const handleRejectTicket = () => {
    if (!approveToken || !debouncedRejectionReason) {
      toast.error("Requires Token and Reason to reject the Ticket");
      return;
    }

    if (session.status !== "authenticated") {
      toast.error("You must be logged in/Registered to reject the Ticket");
      setOpenAuth(true);
      setActiveTab("login");
      return;
    }
    RejectTicketMutate(
      { otp: approveToken },
      {
        onSuccess: (data) => {
          console.log(data.data);
          toast.success(data.message || "Ticket reject successfully. ");
          router.push(`/ticket-accept?id=${id}`);
          return;
        },
        onError: (error: unknown) => {
          console.log(error);

          if (error instanceof AxiosError) {
            console.log(error);
            toast.error(
              error.response?.data?.message || "reject Ticket failed",
            );
            return;
          }
          if (error instanceof Error) {
            toast.error(error.message || "reject Ticket failed");
            return;
          }
          toast.error("reject Ticket failed");
          return;
        },
      },
    );
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-2">
        {/* {JSON.stringify(token, null, 2)} */}
        {isError && (
          <small className="text-red-300">Token request failed</small>
        )}
        <input
          type="text"
          name=""
          onChange={(e) => setApproveToken(e.target.value)}
          defaultValue={approveToken}
          //   readOnly
          className="rounded-md border focus:outline-none p-2"
          placeholder="Enter token for approval or rejection"
        />
        <button
          title="Request Token for Ticket approval"
          type="button"
          onClick={handleRequestToken}
          className="p-2 rounded-md border cursor-pointer border-[#A21CAF] inline-flex items-center justify-center gap-2  "
        >
          Request Token{" "}
          {isPending && (
            <div className="w-6 h-6">
              <Loader />
            </div>
          )}
        </button>
      </div>

      <PrimaryButton
        onClick={handleAcceptTicket}
        type="button"
        className="w-full inline-flex cursor-pointer items-center justify-center "
      >
        Accept agreement{" "}
        {isAcceptTicketPending && (
          <div className="w-6 h-6">
            <Loader />
          </div>
        )}
      </PrimaryButton>
      <label htmlFor="" className="flex gap-2 items-center">
        <input type="checkbox" className="" />
        <p className="text-xs font-semibold">
          I agree to the Mimotar Terms of Service and Privacy Policy
        </p>
      </label>
      <hr className="w-full" />

      <div className="w-full flex flex-col">
        <textarea
          rows={2}
          maxLength={100}
          onChange={(e) => setRejectionReason(e.target.value)}
          className="rounded-md border focus:outline-none p-2 mb-4 resize-none"
          placeholder="Reason for rejection..."
        />
        <SecondaryButton
          onClick={handleRejectTicket}
          className="h-14 md:h-auto p-2 inline-flex items-center justify-center cursor-pointer"
        >
          Reject Agreement{" "}
          {isRejectTicketPending && (
            <div className="w-6 h-6">
              <Loader />
            </div>
          )}
        </SecondaryButton>
      </div>

      <AuthForm
        activeTab={ActiveTab}
        open={openAuth}
        setActiveTab={setActiveTab}
        setOpen={setOpenAuth}
        redirectUrl={`/approve-transaction/${token}`}
      />
    </section>
  );
}
