import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href={"#"}
      className="relative top-5 flex h-[260px] w-[300px]"
    >
      <Image
        src="/logo.svg"
        fill
        alt="logo"
        className="object-contain"
      />
    </Link>
  );
};

export default Logo;
