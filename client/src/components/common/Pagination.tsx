"use client";

import { cn } from "@/lib/utils";
import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MAX_PAGES_TO_SHOW } from "@/lib/constants";

interface PaginationProps {
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number;
  search?: string;
}

export default function Pagination({
  currentPage,
  setPage,
  totalPages,
}: PaginationProps) {
  // page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = MAX_PAGES_TO_SHOW;

    if (totalPages <= maxPagesToShow) {
      // shows all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // include first page
      pageNumbers.push(1);

      // calculate start and end of page range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // adjustments if at the beginning or end
      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }

      // add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("ellipsis1");
      }

      // add page numbers
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("ellipsis2");
      }

      // include last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <PaginationContainer>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && setPage(currentPage - 1)}
            className={cn(currentPage <= 1 && "pointer-events-none opacity-50")}
          />
        </PaginationItem>

        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis1" || page === "ellipsis2" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => setPage(Number(page))}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && setPage(currentPage + 1)}
            className={cn(
              currentPage >= totalPages && "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  );
}
