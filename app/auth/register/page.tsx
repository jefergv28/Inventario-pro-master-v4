"use client";

import AuthForm from "@/components/auth/AuthForm";
import Header from "@/components/Header";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-body">
      <Header />
      <AuthForm type="register" />
    </div>
  );
}
