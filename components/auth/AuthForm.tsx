"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeInOnScroll } from "@/motion/motionVariants";
import Button from "../Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialAuth from "./SocialAuth";
import Cookie from "js-cookie";
import Modal from "../modal/Modal";
import ForgotPasswordForm from "../ForgotPasswordForm";
import { createApi } from "@/lib/api";

type AuthFormProps = {
  type: "login" | "register";
};

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string }>({});
  const [feedback, setFeedback] = useState("");
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

  const router = useRouter();

  const handleForgotPasswordSuccess = () => setIsForgotPasswordModalOpen(false);

  // Validaciones
  const validateFullName = (value: string) => (value.trim().length < 3 ? "El nombre debe tener al menos 3 caracteres." : "");
  const validateEmail = (value: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Ingresa un correo válido.");
  const validatePassword = (value: string) => (value.length < 6 ? "La contraseña debe tener al menos 6 caracteres." : "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;
    const newErrors = { ...errors };

    if (field === "fullName") {
      setFullName(value);
      newErrors.fullName = validateFullName(value);
    } else if (field === "email") {
      setEmail(value);
      newErrors.email = validateEmail(value);
    } else if (field === "password") {
      setPassword(value);
      newErrors.password = validatePassword(value);
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      fullName: type === "register" ? validateFullName(fullName) : "",
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      setFeedback("Por favor corrige los errores antes de enviar el formulario.");
      return;
    }

    const api = createApi((msg: React.ReactNode) => {
      setModalMessage(typeof msg === "string" ? msg : JSON.stringify(msg));
    });

    try {
      if (type === "register") {
        const res = await api.post("/auth/register", { fullName, email, password });
        Cookie.set("token", res.data.token, { expires: 1, secure: true, sameSite: "Strict" });
        setFeedback("Registro exitoso. Redirigiendo al login...");
        setTimeout(() => router.push("/auth/login"), 1500);
      } else {
        const res = await api.post("/auth/login", { email, password });
        Cookie.set("token", res.data.token, { expires: 1, secure: true, sameSite: "Strict" });
        setFeedback("Inicio de sesión exitoso. Redirigiendo...");
        router.push("/dashboard");
      }
    } catch (err) {
      // Ya el createApi muestra modal, aquí podemos log opcional
      console.error(err);
    }
  };

  return (
    <motion.div
      variants={fadeInOnScroll(0.2, 0.6)}
      initial="hidden"
      whileInView="visible"
      className="flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-accent/60 p-8 shadow-lg"
    >
      <h2 className="mt-4 text-2xl font-bold">{type === "login" ? "Inicia sesión en tu cuenta" : "¡Únete a Inventario-Pro!"}</h2>
      <p className="text-gray-00 pointer-events-none mb-6 text-sm">
        {type === "login" ? "Ingresa tus credenciales para continuar." : "Crea tu cuenta y comienza a gestionar tu inventario."}
      </p>

      <form
        className="w-full"
        onSubmit={handleSubmit}
      >
        {type === "register" && (
          <div className="mb-4">
            <label className="block text-sm font-medium">Nombre completo</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => handleInputChange(e, "fullName")}
              className="w-full rounded-lg border px-4 py-2 text-white focus:outline-none"
              placeholder="Tu nombre completo"
            />
            {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleInputChange(e, "email")}
            className="w-full rounded-lg border px-4 py-2 text-white focus:outline-none"
            placeholder="tucorreo@ejemplo.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div className="relative mb-4">
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => handleInputChange(e, "password")}
            className="w-full rounded-lg border px-4 py-2 text-white focus:outline-none"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
        </div>

        {type === "login" && (
          <div className="mb-4 flex justify-end text-sm">
            <button
              type="button"
              onClick={() => setIsForgotPasswordModalOpen(true)}
              className="text-gray-500 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        )}

        <div className="flex flex-col items-center justify-center">
          <Button
            btnText={type === "login" ? "Iniciar sesión" : "Registrarse"}
            disabled={Object.values(errors).some((error) => error)}
          />
        </div>
      </form>

      <Modal
        isOpen={isForgotPasswordModalOpen}
        title="Recuperar contraseña"
        onClose={() => setIsForgotPasswordModalOpen(false)}
      >
        <ForgotPasswordForm onSuccess={handleForgotPasswordSuccess} />
      </Modal>

      {/* Modal para errores de red o API */}
      <Modal
        isOpen={!!modalMessage}
        title="Error"
        onClose={() => setModalMessage(null)}
        onlyMessage
      >
        {modalMessage}
      </Modal>

      {feedback && <p className="mt-4 text-center text-sm text-red-500">{feedback}</p>}
      <SocialAuth />

      <p className="mt-4 text-sm">
        {type === "login" ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
        <Link
          href={type === "login" ? "/auth/register" : "/auth/login"}
          className="ml-1 text-blue-500 hover:underline"
        >
          {type === "login" ? "Regístrate" : "Inicia sesión"}
        </Link>
      </p>
    </motion.div>
  );
};

export default AuthForm;
