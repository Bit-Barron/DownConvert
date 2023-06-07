interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded bg-primary px-5 py-2 font-bold text-white"
    >
      {text}
    </button>
  );
};
