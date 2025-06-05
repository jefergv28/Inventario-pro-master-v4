"use client";

import { FaGoogle, FaGithub } from "react-icons/fa";
import ButtonTertiary from "../ButtonTertiary";

const SocialAuth = () => {
  const handleGoogleLogin = () => {
    console.log("Iniciar sesión con Google");
    // Aquí se conectará con NextAuth o Firebase más adelante
  };

  const handleGithubLogin = () => {
    console.log("Iniciar sesión con GitHub");
    // Aquí se conectará con NextAuth o Firebase más adelante
  };

  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-center">
        <div className="w-20 border-t border-gray-300"></div>
        <p className="mx-4 text-sm text-gray-500">O continuar con</p>
        <div className="w-20 border-t border-gray-300"></div>
      </div>

      <div className="flex gap-4 mt-4">
        <ButtonTertiary onClick={handleGoogleLogin} btnText="oogle">
          <FaGoogle className="text-red-500" />
        </ButtonTertiary>

        <ButtonTertiary onClick={handleGithubLogin} btnText="GitHub">
          <FaGithub className="text-gray-400" />
        </ButtonTertiary>
      </div>
    </div>
  );
};

export default SocialAuth;
