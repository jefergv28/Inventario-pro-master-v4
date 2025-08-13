"use client";

import { FaGoogle, FaGithub } from "react-icons/fa";
import ButtonTertiary from "../ButtonTertiary";

const SocialAuth = () => {
  return (
    <div className="w-full mt-6">
      {/* Línea divisoria con texto */}
      <div className="flex items-center justify-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <p className="mx-4 text-sm text-gray-500">O continuar con</p>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Botones sociales deshabilitados */}
      <div className="flex gap-4 mt-6">
        <div className="relative group flex-1">
          <ButtonTertiary
            btnText="Google"
            className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-500 rounded-lg py-2 cursor-not-allowed opacity-60"
            disabled
          >
            <FaGoogle className="text-gray-400 text-lg" />
          </ButtonTertiary>
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Próximamente
          </span>
        </div>

        <div className="relative group flex-1">
          <ButtonTertiary
            btnText="GitHub"
            className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-500 rounded-lg py-2 cursor-not-allowed opacity-60"
            disabled
          >
            <FaGithub className="text-gray-400 text-lg" />
          </ButtonTertiary>
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Próximamente
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialAuth;
