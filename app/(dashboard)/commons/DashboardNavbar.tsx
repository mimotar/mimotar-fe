"use client";

import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import Avata from "./Avartar";
import { useState } from "react";
import ProfileDropDown from "../dashboard/profile/component/ProfileDropDown";
import LeftPanel from "./leftpanel";
import { AnimatePresence, motion } from "framer-motion";
import LogoIcon from "@/app/svgIconComponent/Logo";
import { useSession } from "next-auth/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NotificationContainer from "./NotificationContainer";

export default function DashboardNavbar() {
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const { data: session, status, update } = useSession();
  const firstName = session?.user.firstName ?? "";
  const lastName = session?.user.lastName ?? "";
  const profileAcronyms = `${firstName[0] ?? ""}${lastName[0] ?? ""}`;

  return (
    <>
      <section className="flex justify-between items-center sm:p-5 p-3 bg-[#FFFFFF] gap-3">
        <div className="relative">
          {/* <input
            type="search"
            name=""
            id=""
            placeholder="Search"
            className="sm:p-2 p-1 sm:w-[448px] w-full peer border border-neutral-400 outline-none rounded-md placeholder:pl-6"
          /> */}

          {/* <CiSearch className="absolute left-3 sm:top-3.5 top-2.5 peer-focus:hidden" /> */}
        </div>
        <div className="flex min-[375px]:gap-4 gap-1 items-center ">
          {/* <div
            onClick={() => setIsNotificationDropDown((prev) => !prev)}
            className="relative bg-gray-100 rounded-full p-1 hover:bg-gray-200 cursor-pointer"
          >
            <IoIosNotifications
              className={`md:text-3xl text-xl ${
                isNotificationDropDown && "text-primary"
              }`}
            />
            <NotificationDropDown
              isActive={isNotificationDropDown}
              className="fixed sm:absolute top-16 z-30 sm:top-12 border border-brand-primary right-2 sm:right-0 left-auto sm:left-auto"
              closeDropdown={() => setIsNotificationDropDown(false)}
              dataLength={Notification?.data.length || 0}
            >
              {isLoading ? (
                <div className="flex justify-center items-center mt-5">
                  <AiOutlineLoading3Quarters className="animate-spin text-4xl text-brand-primary" />
                </div>
              ) : isError ? (
                <small className="text-red-400 text-center">
                  {error.message || "Something went wrong"}
                </small>
              ) : Notification?.data.length! < 1 ? (
                <div className="flex flex-col w-full justify-center items-center space-y-4">
                  <NotifyBellIcon className="w-[152px] h-[152px]" />
                  <p>No notifications yet</p>
                  <PrimaryButton
                    className="py-2"
                    onClick={() => navigate.push("/dashboard")}
                  >
                    Return to Dashboard
                  </PrimaryButton>
                </div>
              ) : (
                <>
                  {Notification?.data.map((notification, i) => (
                    <Fragment key={notification.id}>
                      <AvatarAndContentCard
                        link={notification.link}
                        content={notification.content}
                        date={new Date(notification.timestamp)}
                        imgUrl={notification.avatar}
                        names={"John Doe"}
                        isRead={notification.read === "read" ? true : false}
                        onRead={OnRead}
                        isReading={isPending}
                      />

                      <hr />
                    </Fragment>
                  ))}
                </>
              )}
            </NotificationDropDown>
          </div> */}
          <NotificationContainer />

          <div className="relative flex items-center justify-center gap-1">
            {status === "loading" || !session ? (
              <AiOutlineLoading3Quarters className="animate-spin text-brand-primary" />
            ) : (
              <Avata
                imgUrl={session?.user.avatar}
                className="border sm:w-10 sm:h-10 h-6 w-6"
                nameAcronyms={profileAcronyms}
              />
            )}

            <RiArrowDropDownLine
              className={`cursor-pointer text-2xl ${
                isProfileDropdown && "rotate-180"
              }`}
              onClick={() => setIsProfileDropdown((prev) => !prev)}
            />
            {isProfileDropdown && (
              <ProfileDropDown
                closeDropdown={() => setIsProfileDropdown(false)}
                className="absolute top-11 sm:right-4 -right-2 w-64"
              />
            )}
          </div>

          <RxHamburgerMenu
            onClick={() => setIsMobileNavOpen(true)}
            className="md:hidden block text-3xl cursor-pointer hover:bg-gray-200 rounded-full p-1"
          />
        </div>
      </section>

      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.section
            className="md:hidden fixed inset-0 z-[120] bg-white"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between p-3 border-b">
              <LogoIcon className=" text-brand-primary w-28" />
              <IoMdClose
                onClick={() => setIsMobileNavOpen(false)}
                className="text-3xl cursor-pointer hover:bg-gray-200 rounded-full p-1"
              />
            </div>
            <LeftPanel
              className="pt-6"
              linkClassName="text-lg"
              onNavigate={() => setIsMobileNavOpen(false)}
            />
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
