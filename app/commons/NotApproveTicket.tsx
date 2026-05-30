// export default function NotApproveTicket() {
//   return (
//     <main className="px-5 lg:px-10 2xl:px-16 py-3 text-center">
//       <h3 className="text-black font-semibold text-2xl">
//         Ticket not yet approved
//       </h3>
//       <p className="text-[#64748B] mt-2">
//         The ticket you are trying to access has not yet been approved.
//       </p>
//     </main>
//   );
// }

export default function NotApproveTicket() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-amber-600"
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
          Ticket Pending Approval
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          This escrow ticket is currently under review and has not yet been
          approved. Access to ticket details and transaction actions will become
          available once the approval process is completed.
        </p>

        <div className="mt-6 rounded-xl border border-amber-100 bg-white p-4">
          <p className="text-sm text-slate-700">
            Please check back later or contact the transaction administrator if
            you believe this status is incorrect.
          </p>
        </div>
      </div>
    </main>
  );
}
