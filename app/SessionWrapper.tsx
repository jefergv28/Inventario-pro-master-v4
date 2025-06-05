"use client";

import { useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

interface SessionWrapperProps {
  children: ReactNode;
}

export default function SessionWrapper({ children }: SessionWrapperProps) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth/login?expired=1");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        Cookies.remove("token");
        router.push("/auth/login?expired=1");
      }
    } catch  {
      Cookies.remove("token");
      router.push("/auth/login?expired=1");
    }
  }, [router]);

  return <>{children}</>;
}
