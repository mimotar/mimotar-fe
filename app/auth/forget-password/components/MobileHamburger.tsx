"use client";

import { RxHamburgerMenu } from "react-icons/rx";

export default function MobileHamburger() {
  return (
    <section className="sm:hidden block">
      <RxHamburgerMenu className="cursor-pointer hover:bg-gray-200 p-1 text-2xl" />
    </section>
  );
}
