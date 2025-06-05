import Link from "next/link";
import { CSSProperties } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: CSSProperties | undefined;
  error?: boolean;
}

export default function Button({
  children,
  style,
  error,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`rounded-md transparent outline-2 px-40 py-4 text-md font-Inter text-white shadow-md shadow-amber-50 hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600; ${
        error && "outline-2 outline-offset-2 outline-solid outline-red-500"
      } `}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}
