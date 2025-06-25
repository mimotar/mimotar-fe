import Link from "next/link";

export default function NotifyInfo() {
  return (
    <section className="inline-flex items-center gap-2 w-[90%] sm:w-[70%] justify-between flex-wrap absolute top-6 left-auto right-auto  mx-auto p-2 bg-white border border-gray-200 rounded-lg shadow-md">
      <p className="">
        You can make safe payments, but payouts will only be made after
        completing registration.
      </p>

      <Link
        href="/"
        className="bg-[#F1F5F9] rounded-md px-2 py-1 font-semibold"
      >
        Register now
      </Link>
    </section>
  );
}
