import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
};

const Button = ({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow",
    secondary:
      "bg-slate-700 text-white hover:bg-slate-600 active:scale-95",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:scale-95",
    ghost:
      "bg-transparent text-gray-300 hover:bg-slate-800 border border-slate-600",
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;