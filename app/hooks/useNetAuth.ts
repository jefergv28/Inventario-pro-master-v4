"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Usuario } from "../types/usuario";
import { createApi } from "@/lib/api";

export function useNetAuth() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Crear la instancia de la API
  const showModal = (msg: React.ReactNode) => alert(msg);
  const api = createApi(showModal);

  // Función para cargar los datos del usuario desde el backend
  const fetchUsuario = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/usuarios/me");
      setUsuario(response.data);
    } catch (err) {
      console.error("Error al cargar usuario:", err);
      setUsuario(null);
      Cookies.remove("token");
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetchUsuario();
    } else {
      setIsLoading(false);
    }
  }, [fetchUsuario]);

  const logout = () => {
    Cookies.remove("token");
    setUsuario(null);
    router.push("/auth/login");
  };

  return { usuario, isLoading, logout, setUsuario };
}
