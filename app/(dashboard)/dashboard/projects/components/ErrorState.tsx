import { AlertTriangle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { UseQueryResult } from "@tanstack/react-query";

interface IErrorState<T> {
  query: UseQueryResult<T>;
  title?: string;
  description?: string;
}

export default function ErrorState<T>({
  query,
  title = "Something went wrong",
  description = "We couldn't load this information. Please try again.",
}: IErrorState<T>) {
  const navigate = useRouter();

  return (
    <div className="min-h-[60vh] flex items-center justify-center font-sans">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>

        <h2 className="text-base font-bold text-gray-900">{title}</h2>

        <p className="text-xs text-gray-500 leading-relaxed mt-2">
          {description}
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={() => query.refetch()}
            disabled={query.isFetching}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {query.isFetching ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Retrying...
              </>
            ) : (
              "Try again"
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate.push("/dashboard")}
            className="px-5 py-3 bg-gray-50 border border-gray-100 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-100 transition"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
