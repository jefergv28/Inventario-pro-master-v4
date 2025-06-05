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




export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [isDesktopDevice, setIsDesktopDevice] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const sidebarRef = useRef<HTMLElement>(null!);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

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

  if (!mounted || checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-accent_oscuro">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!tokenValid) {
    return null; // La redirección ya se hizo arriba
  }

  return (
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
        />
        <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">{children}</div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
      />
    </div>
  );
}
