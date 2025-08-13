"use client";

import { useState } from "react";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="max-w-md mx-auto p-4">
      {!success ? (
        <ForgotPasswordForm onSuccess={() => setSuccess(true)} />
      ) : (
        <p className="text-center text-green-600 font-semibold">
          ¡Correo enviado! Revisa tu bandeja de entrada para las instrucciones.
        </p>
      )}
    </div>
  );
}
