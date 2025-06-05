"use client";

//componenetes
import { usePathname } from "next/navigation";
import ButtonSecondary from "./ButtonSecondary";
import Logo from "./Logo";

const Header = () => {
  const pathname = usePathname();

  //si estamos en login o register , el boto cambia
  const isAuthpage =
    pathname === "/auth/login" || pathname === "/auth/register";
  const btnText = isAuthpage ? "Home" : "Empezar";
  const btnHref = isAuthpage ? "/" : "/auth/login";
  return (
    <header className="h-[80px] bg-black/20 backdrop-blur-2xl fixed top-0 left-0 right-0 z-10 flex items-center">
      <div className="container mx-auto flex justify-between items-center px-6 xl:px-0">
        {/* logo */}
        <Logo />
        {/* btn */}
        <ButtonSecondary btnText={btnText} href={btnHref} />
      </div>
    </header>
  );
};

export default Header;
