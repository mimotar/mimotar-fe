import { IoIosNotifications } from "react-icons/io";
import NotificationDropDown from "./NotificationDropDown";
import { Fragment, useState } from "react";
import { useFetch } from "@/app/hooks/useFetch";
import { INotificationResponse } from "../types/INotification";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NotifyBellIcon from "@/app/svgIconComponent/NotifyBellIcon";
import PrimaryButton from "@/app/commons/PrimaryButtons";
import AvatarAndContentCard from "./AvartarAndContentCard";
import axiosService from "@/lib/services/axiosService";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function NotificationContainer() {
  const [isNotificationDropDown, setIsNotificationDropDown] = useState(false);
  const navigate = useRouter();

  const {
    isLoading,
    data: Notification,
    isError,
    error,
  } = useFetch<INotificationResponse, Error, INotificationResponse>(
    ["notification", isNotificationDropDown],
    "notification",
  );

  const { isPending, mutate } = useMutation({
    mutationFn: async (id: string | number) => {
      try {
        const res = await axiosService.put(`notification/${id}/read`);
        return res.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data.message || "Error occur while Marking as read",
          );
        }

        if (error instanceof Error) {
          throw new Error(error.message || "Error occur while Marking as read");
        }
        throw new Error("Error occur while Marking as read");
      }
    },

    mutationKey: ["read"],
  });

  const OnRead = (id: string | number) => {
    if (!id) return;
    mutate(id);
  };

  return (
    <section
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
                  notificationId={notification.id}
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
    </section>
  );
}
