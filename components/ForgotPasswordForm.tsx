"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { createApi } from "@/lib/api";

interface ForgotPasswordFormProps {
  onSuccess: () => void;
}

const ForgotPasswordForm = ({ onSuccess }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback("");

    try {
      await api.post("/auth/forgot-password", email, {
        headers: { "Content-Type": "text/plain" },
      });
      setFeedback("Si la cuenta existe, recibirás un correo con instrucciones.");
      setIsLoading(false);
      onSuccess();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setFeedback("Error al procesar la solicitud. Intenta de nuevo.");
      setIsLoading(false);
    }
  };

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-2 text-2xl font-bold">¿Olvidaste tu contraseña?</h2>
      <p className="pointer-events-none mb-4 text-sm text-gray-500">Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.</p>

      <div className="mb-4">
        <label className="block text-sm font-medium">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 text-white focus:outline-none"
          placeholder="tucorreo@ejemplo.com"
          required
        />
      </div>
      <Button
        btnText={isLoading ? "Enviando..." : "Enviar enlace de recuperación"}
        disabled={isLoading}
      />
      {feedback && <p className="mt-4 text-center text-sm">{feedback}</p>}
    </form>
  );
};

export default ForgotPasswordForm;
