"use client";

import { useState, useRef } from "react";
import { useTheme } from "@/app/hooks/use-theme";
import { Bell, ChevronLeft, Moon, Search, Sun, LogOut } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useNetAuth } from "@/app/hooks/useNetAuth";
import { useNotification } from "@/app/context/NotificationContext";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  searchText: string;
  setSearchText: (value: string) => void;
  setIsFocused: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed, searchText, setSearchText, setIsFocused }) => {
  const { theme, setTheme } = useTheme();
  const { usuario, logout } = useNetAuth();

  // Aquí obtienes las notificaciones y el método para quitar notificaciones del contexto
  const { notifications, removeNotification } = useNotification();

  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => logout();

  const backendBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://NEXT_PUBLIC_API_URL";

  const imageUrl = `${backendBaseUrl}${usuario?.profilePicture || "/uploads/profile-image.jpg"}`;

  return (
    <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-950">
      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={collapsed ? "rotate-180" : ""} />
        </button>

        <motion.div
          ref={searchContainerRef}
          className="relative flex items-center overflow-hidden rounded-md border border-slate-300 bg-white px-2 transition-all dark:bg-slate-800"
          animate={{ width: "auto", height: 35 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Search
            size={20}
            className="text-slate-400"
          />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-400 dark:text-slate-300"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
        </motion.div>
      </div>

      <div className="relative flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Cambiar tema"
        >
          <Sun
            size={20}
            className="dark:hidden"
          />
          <Moon
            size={20}
            className="hidden dark:block"
          />
        </button>

        <div className="relative">
          <button
            className="btn-ghost relative flex size-10 items-center justify-center"
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label="Notificaciones"
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white shadow-md">
                {notifications.length}
              </span>
            )}
          </button>

          {notifOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 z-50 mt-2 max-h-64 w-64 overflow-auto rounded-md border bg-white p-4 shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
              {notifications.length === 0 ? (
                <p className="text-gray-700 dark:text-gray-300">No tienes nuevas notificaciones.</p>
              ) : (
                notifications.map(({ id, message }) => (
                  <div
                    key={id}
                    className="mb-2 flex justify-between rounded border border-gray-300 bg-gray-100 p-2 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  >
                    <span>{message}</span>
                    <button
                      onClick={() => removeNotification(id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Cerrar notificación"
                    >
                      &times;
                    </button>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </div>

        <div className="relative">
          <button
            className="size-10 overflow-hidden rounded-full"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú de usuario"
          >
            <Image
              src={imageUrl}
              alt="Perfil"
              width={40}
              height={40}
              className="size-full object-cover"
            />
          </button>

          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-40 rounded-md border bg-white p-2 shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
              >
                <LogOut size={16} /> Cerrar sesión
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
