"use client";
import React, { useState } from "react";
import AuthForm from "@/app/auth/AuthForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PrimaryButton from "@/app/commons/PrimaryButtons";

const DealBtns = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleOpen = (tab: "login" | "register") => {
    setActiveTab(tab);
    setOpen(true);
  };
  return (
    <div className="flex sm:flex-row flex-col lg:gap-10 gap-5 w-full">
      <Button
        onClick={() => handleOpen("register")}
        className="sm:w-[143px]  w-full h-[64px] cursor-pointer text-brand-primary/80 hover:text-[#F8FAFC] font-bold border-[#D946EF] border-2 bg-white rounded-lg hover:bg-[#D946EF] active:bg-[#A21CAF] active:font-bold focus:bg-[#A21CAF] focus:font-bold"
      >
        Register
      </Button>

      <Link href={"/generate-link"} className="w-full">
        <PrimaryButton type="button" className="w-full cursor-pointer">
          Get paid/Pay someone
        </PrimaryButton>
      </Link>

      {/* modal */}
      <AuthForm
        open={open}
        setOpen={handleDialogChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default DealBtns;
