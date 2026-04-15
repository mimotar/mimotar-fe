export function InvalidTransactionState({
  title = "Invalid Transaction",
  message = "We couldn’t find a valid transaction for this link.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="max-w-md w-full text-center bg-[#F8FAFC] p-8 rounded-xl shadow-sm border border-[#E2E8F0]">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 text-red-600 p-3 rounded-full">⚠️</div>
        </div>

        <h3 className="text-black font-semibold text-2xl">{title}</h3>

        <p className="text-[#64748B] mt-3 text-sm">{message}</p>

        <div className="mt-6">
          <a
            href="/"
            className="inline-block bg-black text-white px-5 py-2 rounded-lg text-sm"
          >
            Go back home
          </a>
        </div>
      </div>
    </main>
  );
}
