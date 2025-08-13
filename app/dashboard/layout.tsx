"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookie from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useClickOutside } from "../hooks/use-click-outside";
import { cn } from "./utils/cn";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import SearchResultsComponent from "@/components/SearchResults";
import api from "../hooks/useApi";
import { NotificationProvider } from "../context/NotificationContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [isDesktopDevice, setIsDesktopDevice] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const sidebarRef = useRef<HTMLElement>(null!);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  // Estados para búsqueda
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = Cookie.get("token");

    if (!token) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname || "/")}`);
      setTokenValid(false);
      setCheckingAuth(false);
      return;
    }

    // Aquí podrías validar el token con backend si quieres
    setTokenValid(true);
    setCheckingAuth(false);
  }, [router, pathname]);

  useEffect(() => setCollapsed(!isDesktopDevice), [isDesktopDevice]);

  useEffect(() => {
    if (mounted) {
      const query = "(min-width: 768px)";
      const matchMedia = window.matchMedia(query);
      setIsDesktopDevice(matchMedia.matches);

      const listener = () => setIsDesktopDevice(matchMedia.matches);
      matchMedia.addEventListener("change", listener);

      return () => matchMedia.removeEventListener("change", listener);
    }
  }, [mounted]);

  useClickOutside([sidebarRef], () => {
    if (!isDesktopDevice && !collapsed) {
      setCollapsed(true);
    }
  });

  // Efecto para búsqueda con debounce
  useEffect(() => {
    if (searchText.trim() === "") {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    const handler = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await api.get(`/api/v1/search?query=${searchText}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error en búsqueda:", error);
        setSearchResults(null);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchText]);

  if (!mounted || checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-accent_oscuro">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!tokenValid) {
    return null; // Ya redirigió arriba
  }

  return (
     <NotificationProvider>
    <div className="page min-h-screen bg-slate-100 transition-colors dark:bg-accent_oscuro">
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-10 bg-black opacity-0 transition-opacity",
          !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30",
        )}
      />

      <Sidebar
        ref={sidebarRef}
        collapsed={collapsed}
      />

      <div className={cn("transition-[margin] duration-300", collapsed ? "md:ml-[70px]" : "md:ml-[240px]")}>
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          searchText={searchText}
          setSearchText={setSearchText}
          setIsFocused={setIsFocused}
        />

        {/* Mostrar resultados de búsqueda fuera del Header */}
        {isFocused && searchText.trim() !== "" && (
          <div className="absolute left-0 right-0 top-[60px] z-50 mx-auto max-w-md rounded-md border bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
            {isSearching ? (
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">Buscando...</p>
            ) : (
              <SearchResultsComponent
                results={searchResults}
                setIsFocused={setIsFocused}
                onSelectResult={(item, type) => {
                  console.log("Seleccionado:", item, type);
                  if (type === "producto") {
                    router.push(`/dashboard/productos`);
                  } else if (type === "proveedores") {
                    router.push(`/dashboard/proveedores`);
                  } else if (type === "usuario") {
                    router.push(`/dashboard/usuario`);
                  }

                  setIsFocused(false);
                }}
              />
            )}
          </div>
        )}

        <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">{children}</div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
      />
    </div>
    </NotificationProvider>
  );
}
