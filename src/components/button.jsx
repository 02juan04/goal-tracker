export default function Button({ label, onClick, disabled, variant, props }) {
  const buttonVariant = {
    primary:
      "cursor-pointer border w-fit m-auto py-[0.5rem] px-[1rem] rounded-xl hover:bg-white/20 hover:scale-105 duration-150",
    secondary:
      "text-sm hover:text-blue-300 cursor-pointer underline underline-offset-[5px]",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonVariant[variant] + " " + props}
    >
      <span>{label}</span>
    </button>
  );
}
