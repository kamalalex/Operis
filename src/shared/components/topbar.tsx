"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useUIStore } from "../hooks/use-ui-store";
import { DynamicIcon } from "../lib/icons";
import { cn } from "../lib/utils";

/**
 * Top Navigation bar for Core Dashboard.
 * Integrates notifications list, dynamic sidebar collapse button, and logout procedures.
 */
export function Topbar() {
  const { data: session } = useSession();
  const { toggleSidebar } = useUIStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Mock initial notifications (in production, loaded dynamically from service)
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Bienvenue !",
      message: "Bienvenue sur votre nouvelle plateforme SaaS modulaire.",
      read: false,
      date: "À l'instant",
    },
    {
      id: "2",
      title: "Noyau configuré",
      message: "L'architecture clean modulaire a été installée avec succès.",
      read: true,
      date: "Il y a 5 min",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-[#E2E8F0] bg-white/70 backdrop-blur-md px-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/80">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-200/50 hover:text-slate-700 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
        >
          <DynamicIcon name="Menu" size={20} />
        </button>
        <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-[#0F172A] dark:bg-slate-800 dark:text-slate-300 border border-[#E2E8F0] dark:border-slate-750 rounded-md select-none">
          MVP Core Platform
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications list trigger */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-200/50 hover:text-slate-700 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
          >
            <DynamicIcon name="Bell" size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-[#E2E8F0] bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50">
              <div className="flex items-center justify-between px-3 py-2 border-b border-[#E2E8F0] dark:border-slate-800">
                <span className="text-sm font-semibold text-[#0F172A] dark:text-slate-200">Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-slate-950 hover:underline dark:text-indigo-400 cursor-pointer">
                    Tout lire
                  </button>
                )}
              </div>
              <div className="max-h-60 overflow-y-auto py-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      "px-3 py-2 rounded-lg text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors",
                      !n.read && "bg-slate-100/50 dark:bg-slate-800/50"
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={cn(
                          "text-xs font-semibold text-[#0F172A] dark:text-slate-200",
                          !n.read && "text-slate-900 dark:text-slate-100"
                        )}
                      >
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{n.date}</span>
                    </div>
                    <p className="text-xs text-[#334155] dark:text-slate-450 mt-0.5">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Account Settings Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 focus:outline-none cursor-pointer"
          >
            <div className="h-8 w-8 rounded-full bg-[#0F172A] text-white font-bold flex items-center justify-center text-sm shadow-md ring-2 ring-slate-200">
              {session?.user?.name ? session.user.name[0].toUpperCase() : "U"}
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[#E2E8F0] bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50">
              <div className="px-3 py-2 border-b border-[#E2E8F0] dark:border-slate-805">
                <p className="text-sm font-semibold text-[#0F172A] dark:text-slate-200">
                  {session?.user?.name || "Utilisateur"}
                </p>
                <p className="text-xs text-slate-500 truncate">{session?.user?.email || "user@platform.com"}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
                >
                  <DynamicIcon name="LogOut" size={16} />
                  <span>Se déconnecter</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
