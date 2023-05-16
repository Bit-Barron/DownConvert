interface Button {
  text: string;
  onClick: () => void;
}

export const Button = ({ text, onClick }: Button) => {
  return (
    <button
      onClick={onClick}
      className="rounded mt-20 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      {text}
    </button>
  );
};
