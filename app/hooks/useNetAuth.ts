// app/hooks/useNetAuth.ts
"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Usuario } from "../types/usuario";
import api from "@/lib/api";


export function useNetAuth() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Nueva función para cargar los datos del usuario desde el backend
  const fetchUsuario = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/usuarios/me");
      setUsuario(response.data);
    } catch (err) {
      console.error("Error al cargar usuario:", err);
      setUsuario(null);
      // Opcional: limpiar el token si falla la carga del usuario
      Cookies.remove("token");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // El hook ahora llama a la API para obtener los datos más recientes
    const token = Cookies.get("token");
    if (token) {
      fetchUsuario();
    } else {
      setIsLoading(false);
    }
  }, []);

  const logout = () => {
    Cookies.remove("token");
    setUsuario(null); // Limpiar el estado del usuario
    router.push("/auth/login");
  };

  // El hook ahora devuelve también la función para actualizar el estado
  return { usuario, isLoading, logout, setUsuario };
}