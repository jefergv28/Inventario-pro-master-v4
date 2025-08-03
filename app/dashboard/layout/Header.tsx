"use client";

import { useState } from "react";
import { useTheme } from "@/app/hooks/use-theme";
import { Bell, ChevronLeft, Moon, Search, Sun, LogOut } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useNetAuth } from "@/app/hooks/useNetAuth"; // 👈 Importamos tu hook

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const { theme, setTheme } = useTheme();
  const { usuario, logout } = useNetAuth();
  const [isFocused, setIsFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout(); // 👈 Usamos el logout de Netlify Identity
  };

  console.log("Objeto usuario en Header:", usuario);
  const imageUrl = `http://localhost:8000${usuario?.profilePicture || "/uploads/profile-image.jpg"}`;
  console.log("URL de la imagen generada:", imageUrl);

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
          className="relative flex items-center overflow-hidden rounded-md border border-slate-300 bg-white px-2 transition-all dark:bg-slate-800"
          animate={{ width: isFocused ? 240 : 160, height: 35 }}
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </motion.div>
      </div>

      <div className="relative flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
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
        <button className="btn-ghost size-10">
          <Bell size={20} />
        </button>

        <div className="relative">
          <button
            className="size-10 overflow-hidden rounded-full"
            onClick={() => setMenuOpen(!menuOpen)}
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
