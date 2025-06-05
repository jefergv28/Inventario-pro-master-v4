import Link from "next/link";
import React from "react";

type Props = {
  btnText: string;
  href?: string; // href debe ser opcional
};

const ButtonSecondary = ({ btnText, href }: Props) => {
  return href ? (
    <Link href={href}>
      <button className="relative min-w-[160px] inline-flex items-center justify-center px-6 py-[15px] overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-xl group">
        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-accent via-accent_secondary to-accent"></span>
        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-[#3050B0] rounded-full opacity-30 group-hover:rotate-90 ease"></span>
        <span className="relative text-white text-sm uppercase tracking-[1px]">
          {btnText}
        </span>
      </button>
    </Link>
  ) : (
    <button className="relative min-w-[160px] inline-flex items-center justify-center px-6 py-[15px] overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-xl group">
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-accent via-accent_secondary to-accent"></span>
      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-[#3050B0] rounded-full opacity-30 group-hover:rotate-90 ease"></span>
      <span className="relative text-white text-sm uppercase tracking-[1px]">
        {btnText}
      </span>
    </button>
  );
};

export default ButtonSecondary;
