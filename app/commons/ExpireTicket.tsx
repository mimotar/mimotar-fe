// export default function ExpireTicket() {
//   return (
//     <main className="px-5 lg:px-10 2xl:px-16 py-3 text-center">
//       <h3 className="text-black font-semibold text-2xl">Ticket expired</h3>
//       <p className="text-[#64748B] mt-2">
//         The ticket you are trying to access has expired.
//       </p>
//     </main>
//   );
// }

export default function ExpireTicket() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="mt-5 text-xl font-semibold text-slate-900 sm:text-2xl">
          Ticket Expired
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          This escrow ticket is no longer active because its validity period has
          expired. Transaction actions associated with this ticket are no longer
          available.
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-700">
            If you still need to proceed with this transaction, please contact
            the transaction administrator or request a new escrow ticket.
          </p>
        </div>
      </div>
    </main>
  );
}
