import { PrimaryOutline } from "@/app/commons/PrimaryButtons";
import { ReactNode } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface CardProps {
  title: string;
  amount: number;
  button?: ReactNode;
  children?: ReactNode;
  className: string;
}
export default function Card({
  amount,
  title,
  button,
  children,
  className,
}: CardProps) {
  return (
    <section className={`border rounded-md p-3 space-y-3 ${className}`}>
      <div className="inline-flex gap-2  items-center">
        <h1 className="text-sm font-semibold">{title}</h1>
        <AiOutlineExclamationCircle
          title="Escrow balance"
          className="cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between flex-wrap ">
        <h1 className="font-bold text-3xl">{amount}</h1>
        {button}
      </div>

      {children}
    </section>
  );
}
