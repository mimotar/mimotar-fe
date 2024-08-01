"use client";

import React from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import Login from "./login/Login";
import Register from "./register/Register";

interface AuthFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeTab: "login" | "register";
  setActiveTab: (tab: "login" | "register") => void;
}

const navLinks = [
  { name: "Register", href: "register" },
  { name: "Login", href: "login" },
];

const AuthForm: React.FC<AuthFormProps> = ({
  open,
  setOpen,
  activeTab,
  setActiveTab,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" w-[420px] h-[500px]">
        <div className="w-full flex flex-row items-center justify-center">
          <div className="border-b">
            <div className="flex flex-row gap-x-4 ">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  onClick={() =>
                    setActiveTab(link.href as "login" | "register")
                  }
                  className={`cursor-pointer font-bold ${
                    activeTab === link.href
                      ? "border-b-2 border-[#86198F] text-[#86198F] "
                      : ""
                  }`}
                >
                  {link.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-full flex flex-col items-center justify-center  w-full">
          {activeTab === "login" && (
            <div className="w-full">
              <Login />
            </div>
          )}
          {activeTab === "register" && (
            <div className="w-full">
              <Register />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthForm;
