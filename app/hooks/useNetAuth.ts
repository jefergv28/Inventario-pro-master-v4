"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function useNetAuth() {
  const router = useRouter();

  const logout = () => {
    // Borra el token de las cookies
    Cookies.remove("token");

    // Opcional: borrar otros datos de sesión si tienes

    // Redirige a la página de login
    router.push("/auth/login");
  };

  return { logout };
}
