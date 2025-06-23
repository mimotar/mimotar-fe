"use client";

import PrimaryButton from "@/app/commons/PrimaryButtons";
import SecondaryButton from "@/app/commons/SecondaryButton";
import { useMutateAction } from "@/app/hooks/useMutation";
import Loader from "@/components/Loader";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ITicketToken } from "../types/ITicketToken";

export default function AcceptRejectForm({ id }: { id: string }) {
  const [token, setToken] = useState("");
  //request token
  const { mutate, isPending, isError } = useMutateAction<
    { data: ITicketToken },
    null
  >("post", `ticket/${id}/request-token`);

  const handleRequestToken = () => {
    mutate(null, {
      onSuccess: (data) => {
        toast.success(
          "Token requested successfully. Check your email for the token."
        );
        setToken(data.data.otp);
      },
      onError: (error: unknown) => {
        toast.error("Error requesting token");
      },
    });
  };

  //approve/accept ticket
  const {
    mutate: AcceptTicketMutate,
    isPending: isAcceptTicketPending,
    data: AcceptTicketData,
    isError: isAcceptTicketError,
  } = useMutateAction<{ data: any }, { otp: string }>(
    "put",
    `/ticket/approve/${id}`
  );

  const handleAcceptTicket = () => {
    if (!token) {
      toast.error("Require Token to approve the Ticket");
      return;
    }
    AcceptTicketMutate(
      { otp: token },
      {
        onSuccess: (data) => {
          console.log(data.data);
          toast.success("Ticket accept/approve successfully. ");
        },
        onError: (error: unknown) => {
          toast.error("Error accepting Ticket");
        },
      }
    );
  };

  //cancel ticket
  const {
    mutate: CancelTicketMutate,
    isPending: isCancelTicketPending,
    data: CancelTicketData,
    isError: isCancelTicketError,
  } = useMutateAction<{ data: any }, { otp: string }>(
    "put",
    `/ticket/reject/${id}`
  );

  const handleCancelTicket = () => {
    if (!token) {
      toast.error("Require Token to approve the Ticket");
      return;
    }
    CancelTicketMutate(
      { otp: token },
      {
        onSuccess: (data) => {
          console.log(data.data);
          toast.success("Ticket reject successfully. ");
        },
        onError: (error: unknown) => {
          toast.error("Error Rejecting Ticket");
        },
      }
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
          onChange={(e) => setToken(e.target.value)}
          defaultValue={token}
          //   readOnly
          className="rounded-md border focus:outline-none p-2"
          placeholder="Request approval token"
        />
        <button
          title="Request Token for Ticket approval"
          type="button"
          onClick={handleRequestToken}
          className="p-2 rounded-md border border-[#A21CAF] inline-flex items-center justify-center gap-2  "
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
        className="w-full inline-flex items-center justify-center "
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
      <SecondaryButton
        onClick={handleCancelTicket}
        className="h-14 md:h-auto p-2"
      >
        Cancel Agreement{" "}
        {isCancelTicketPending && (
          <div className="w-6 h-6">
            <Loader />
          </div>
        )}
      </SecondaryButton>
    </section>
  );
}
