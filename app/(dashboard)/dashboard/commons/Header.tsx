"use client";

import { useAuth } from "@/app/(client)/(page)/hooks/useAuth";
import { MimotarLogo } from "@/app/(client)/commons/client/Navbar";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronDown,
  Info,
  LogOut,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const Header = () => {
  //   const {
  //     currentUser,
  //     notifications,
  //     markNotificationAsRead,
  //     markAllNotificationsAsRead,
  //     clearAllNotifications,
  //     logoutUser,
  //     setActivePage,
  //     setSelectedProjectId,
  //   } = useAppState();

  const { session, IsAuthenticated, userVerified, SignOut } = useAuth();
  const navigate = useRouter();

  const userInitials =
    `${session?.firstName?.trim()?.[0] ?? ""}${
      session?.lastName?.trim()?.[0] ?? ""
    }`.toUpperCase() || "U";

  const fullname = `${session?.firstName?.trim() ?? ""} ${
    session?.lastName?.trim() ?? ""
  }`;

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "all" | "action" | "update" | "informational"
  >("all");

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  //   const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //   const clickNotif = (notifId: string) => {
  //     markNotificationAsRead(notifId);
  //     setNotifDropdownOpen(false);

  //     // Redirect securely based on action triggers
  //     const notif = notifications.find((n) => n.id === notifId);
  //     if (notif) {
  //       if (notif.actionPage) {
  //         setActivePage(notif.actionPage);
  //       } else {
  //         setActivePage("dashboard");
  //       }
  //       if (notif.projectId) {
  //         setSelectedProjectId(notif.projectId);
  //       } else {
  //         setSelectedProjectId(null);
  //       }
  //     } else {
  //       setActivePage("dashboard");
  //       setSelectedProjectId(null);
  //     }
  //   };

  //   const filteredNotifications = notifications.filter((n) => {
  //     if (activeTab === "all") return true;
  //     return n.category === activeTab;
  //   });

  return (
    <header className="w-full shrink-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 z-40 transition-all">
      <div className="flex items-center gap-4">
        {/* Logo in header for small screens, also acts as portal trigger */}
        <div
          className="cursor-pointer"
          onClick={() => navigate.push("/dashboard")}
        >
          <MimotarLogo size="sm" />
        </div>
      </div>

      <div className="flex items-center gap-4.5">
        {/* Notification Bell with Badge */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen);
              setProfileDropdownOpen(false);
            }}
            className="p-2 text-gray-500 hover:text-brand-primary hover:bg-gray-50 rounded-xl transition cursor-pointer relative"
          >
            <Bell className="w-[19px] h-[19px]" />
            {/* {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-primary text-white font-mono text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )} */}
          </button>

          {/* Notifications Dropdown (High Fidelity Action Panel) */}
          {notifDropdownOpen && (
            <div className="absolute right-[-16px] sm:right-0 mt-3 w-88 sm:w-[420px] max-w-[calc(100vw-24px)] bg-white border border-gray-100 rounded-3xl shadow-2xl py-4 z-50 animate-fade-in text-left flex flex-col">
              <div className="px-5 pb-3 border-b border-gray-100/60 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 font-display">
                    Notifications Inbox
                  </h3>
                  <p className="text-[10px] text-gray-400 font-medium">
                    Short-term action & attention
                  </p>
                </div>
                {/* {unreadCount > 0 && (
                  <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded-full font-bold">
                    {unreadCount} action{unreadCount > 1 ? "s" : ""} pending
                  </span>
                )} */}
              </div>

              {/* Action bar to Mark read/Clear */}
              {/* {notifications.length > 0 && (
                <div className="px-5 py-2 bg-gray-50/50 border-b border-gray-100/40 flex items-center justify-between text-[11px] font-semibold text-gray-400">
                  <button
                    onClick={() => markAllNotificationsAsRead()}
                    className="hover:text-brand-primary transition-colors cursor-pointer"
                  >
                    Mark all read
                  </button>
                  <button
                    onClick={() => clearAllNotifications()}
                    className="hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Clear all
                  </button>
                </div>
              )} */}

              {/* Filter Tabs */}
              {/* {notifications.length > 0 && (
                <div className="px-4 py-2 border-b border-gray-100/40 flex gap-1 bg-gray-50/10">
                  {(["all", "action", "update", "informational"] as const).map(
                    (tab) => {
                      const count =
                        tab === "all"
                          ? notifications.length
                          : notifications.filter((n) => n.category === tab)
                              .length;
                      const isActive = activeTab === tab;
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize transition-all cursor-pointer ${
                            isActive
                              ? "bg-gray-950 text-white shadow-xs"
                              : "text-gray-500 hover:bg-gray-100"
                          }`}
                        >
                          {tab === "all"
                            ? "All"
                            : tab === "informational"
                              ? "Info"
                              : tab}
                          <span
                            className={`ml-1 font-mono font-bold text-[9px] ${isActive ? "text-white/85" : "text-gray-400"}`}
                          >
                            ({count})
                          </span>
                        </button>
                      );
                    },
                  )}
                </div>
              )} */}

              {/* Scrollable list */}
              {/* <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-50/60">
                {filteredNotifications.length === 0 ? (
                  <div className="py-14 text-center px-6 flex flex-col items-center justify-center gap-2">
                    <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-lg animate-pulse">
                      🎉
                    </div>
                    <span className="text-xs font-bold text-gray-800">
                      You're all caught up!
                    </span>
                    <span className="text-[10px] text-gray-400 max-w-[200px] leading-relaxed">
                      No unresolved action items or system updates require
                      attention right now.
                    </span>
                  </div>
                ) : (
                  filteredNotifications.map((n) => {
                    let iconBg = "bg-gray-50 text-gray-500";
                    let categoryBorder = "border-l-transparent";
                    let categoryIcon = <Info className="w-3.5 h-3.5" />;
                    let categoryLabel = "Alert";

                    if (n.category === "action") {
                      iconBg =
                        "bg-rose-50 text-rose-500 border border-rose-100";
                      categoryBorder = "border-l-4 border-l-rose-500";
                      categoryIcon = <AlertTriangle className="w-3.5 h-3.5" />;
                      categoryLabel = "Action Required";
                    } else if (n.category === "update") {
                      iconBg =
                        "bg-emerald-50 text-emerald-500 border border-emerald-100/50";
                      categoryBorder = "border-l-4 border-l-emerald-500";
                      categoryIcon = <CheckCircle2 className="w-3.5 h-3.5" />;
                      categoryLabel = "Update";
                    }

                    return (
                      <div
                        key={n.id}
                        onClick={() => clickNotif(n.id)}
                        className={`group px-5 py-3.5 hover:bg-gray-50/70 flex gap-3 cursor-pointer transition ${categoryBorder} ${!n.isRead ? "bg-brand-primary/[0.015]" : ""}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
                        >
                          {categoryIcon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span
                              className={`text-xs font-bold ${!n.isRead ? "text-gray-900 group-hover:text-brand-primary" : "text-gray-650"} leading-snug`}
                            >
                              {n.title}
                            </span>
                            <span className="text-[9px] text-gray-400 font-medium font-mono whitespace-nowrap pt-0.5">
                              {n.timestamp}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 leading-normal mb-2.5">
                            {n.message}
                          </p>

                    
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-[9px] font-bold tracking-wider uppercase text-gray-400">
                              {categoryLabel}
                            </div>
                            <div className="flex gap-1.5">
                              {!n.isRead && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markNotificationAsRead(n.id);
                                  }}
                                  className="px-2 py-0.5 text-[9px] font-bold text-gray-400 hover:text-gray-800 rounded transition"
                                >
                                  Mark read
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  clickNotif(n.id);
                                }}
                                className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-transform hover:scale-102 cursor-pointer flex items-center gap-1 ${
                                  n.category === "action"
                                    ? "bg-gray-900 text-white shadow-xs hover:bg-black"
                                    : "bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20"
                                }`}
                              >
                                {n.ctaText || "Manage"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div> */}
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setNotifDropdownOpen(false);
            }}
            className="flex items-center gap-2.5 hover:bg-gray-50 p-1.5 pr-2.5 rounded-xl transition cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c026d3] to-purple-400 text-white flex items-center justify-center font-bold text-sm border-2 border-white shadow-xs shrink-0 font-display">
              {userInitials}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-gray-900 leading-tight truncate max-w-[120px]">
                {fullname}
              </div>
              {/* <div className="text-[10px] text-gray-400 font-medium capitalize">
                {currentUser.role} Account
              </div> */}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2.5 z-50 animate-fade-in">
              <div className="px-4 py-2 border-b border-gray-50/70 flex flex-col gap-1">
                <div className="text-[10px] text-gray-400 font-medium font-sans">
                  SIGNED IN AS
                </div>
                <div className="text-xs font-bold text-gray-800 truncate leading-tight">
                  {session?.email}
                </div>
                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-1.5 py-0.5 rounded">
                    ✓ Email Verified
                  </span>
                  {/* {currentUser.phoneVerified ? (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#c026d3] bg-[#c026d3]/5 border border-[#c026d3]/15 px-1.5 py-0.5 rounded">
                      ✓ Phone Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[9px] font-medium text-gray-400 bg-gray-55/35 border border-gray-200/40 px-1.5 py-0.5 rounded">
                      Phone Unverified
                    </span>
                  )} */}
                </div>
              </div>

              <Link
                href={""}
                // onClick={() => {
                //   setProfileDropdownOpen(false);
                //   setActivePage("wallet");
                // }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-brand-primary transition flex items-center gap-2"
              >
                My Secure Wallet
              </Link>
              <Link
                href={""}
                // onClick={() => {
                //   setProfileDropdownOpen(false);
                //   setActivePage("settings");
                // }}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-brand-primary transition flex items-center gap-2"
              >
                Portal Settings
              </Link>

              <div className="border-t border-gray-50 mt-1.5 pt-1.5">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    SignOut();
                  }}
                  className="w-full cursor-pointer text-left px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50/50 transition flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
