interface ButtonTertiaryProps {
  btnText: string;
  onClick?: () => void; // Agregar onClick como prop opcional
  children?: React.ReactNode;
  variant?: "default" | "outline" | "secondary";
   disabled?: boolean;
   className?: string;
}

const ButtonTertiary: React.FC<ButtonTertiaryProps> = ({
  btnText,
  onClick, // Ahora sí puedes usarlo
  children,
}) => {
  return (
    <button
      onClick={onClick} // Se pasa el evento correctamente
      className="group relative inline-flex min-w-[184px] items-center justify-center overflow-hidden rounded-full bg-[#0e1135] px-6 py-[18px] text-sm font-medium uppercase tracking-[1px] text-white shadow-xl transition duration-300 ease-out hover:bg-[#151a41]"
    >
      {children} {btnText}
    </button>
  );
};

export default ButtonTertiary;
