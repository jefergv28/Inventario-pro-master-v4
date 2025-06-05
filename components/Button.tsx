type ButtonProps = {
  btnText: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ btnText }: ButtonProps) => {
  return (
    <button className="group relative inline-flex min-w-[140px] items-center justify-center overflow-hidden rounded-full px-6 py-[18px] font-medium shadow-xl transition duration-300 ease-out">
      <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-accent via-accent_secondary to-accent"></span>
      <span className="ease absolute bottom-0 right-0 mb-32 mr-4 block h-72 w-72 origin-bottom-left translate-x-24 rotate-45 transform rounded-full bg-[#3050B0] opacity-30 transition duration-500 group-hover:rotate-90"></span>
      <span className="relative text-sm uppercase tracking-[1px] text-white">{btnText}</span>
    </button>
  );
};

export default Button;
