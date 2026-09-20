import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProjectsPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export default function ProjectsPagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  disabled = false,
}: ProjectsPaginationProps) {
  if (totalPages <= 1 || total === 0) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const visiblePages = pages.filter(
    (value) => value === 1 || value === totalPages || Math.abs(value - page) <= 1,
  );

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-100 bg-white px-4 py-4 sm:flex-row sm:justify-between">
      <p className="text-center text-xs text-gray-500 sm:text-left">
        Showing <span className="font-bold text-gray-800">{start}-{end}</span> of{" "}
        <span className="font-bold text-gray-800">{total}</span> projects
      </p>
      <Pagination className="w-auto">
        <PaginationContent className="flex-wrap justify-center">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => {
                event.preventDefault();
                if (page > 1) onPageChange(page - 1);
              }}
              className={page === 1 || disabled ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {visiblePages.map((value, index) => {
            const previous = visiblePages[index - 1];
            return (
              <span key={value} className="contents">
                {previous && value - previous > 1 && (
                  <PaginationItem><span className="px-2 text-gray-400">…</span></PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={value === page}
                    onClick={(event) => {
                      event.preventDefault();
                      if (!disabled) onPageChange(value);
                    }}
                    className={disabled ? "pointer-events-none opacity-50" : ""}
                  >
                    {value}
                  </PaginationLink>
                </PaginationItem>
              </span>
            );
          })}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => {
                event.preventDefault();
                if (page < totalPages) onPageChange(page + 1);
              }}
              className={page === totalPages || disabled ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
