import { AlertTriangle, Loader2 } from "lucide-react";
import type { UseQueryResult } from "@tanstack/react-query";
import Link from "next/link";

interface IErrorState<T> {
  data: UseQueryResult<T>;
}

export default function ErrorState<T>({ data }: IErrorState<T>) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center font-sans">
      <div className="max-w-md w-full text-center bg-white rounded-3xl border border-red-100 shadow-xs p-8">
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>

        <h2 className="text-sm font-bold text-gray-900">
          Unable to load project
        </h2>

        <p className="text-xs text-gray-500 leading-relaxed mt-2">
          We couldn't load this project right now. Please check your connection
          and try again.
        </p>

        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            type="button"
            onClick={() => data.refetch()}
            disabled={data.isFetching}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {data.isFetching ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Retrying...
              </>
            ) : (
              "Try again"
            )}
          </button>

          <Link
            href={"dashboard/projects"}
            type="button"
            className="px-4 py-2.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-100 transition"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
