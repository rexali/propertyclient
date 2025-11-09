import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  if (totalPages <= 1) return null;

  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const DOTS = '...';
  const paginationRange = () => {
    const totalPageNumbers = siblingCount * 2 + 5;
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;
    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPages];
    }
    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }
    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    return [];
  };

  return (
    <nav className="flex justify-center mt-4" aria-label="Pagination">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous"
          >
            &lt;
          </button>
        </li>
        {paginationRange().map((page, idx) => (
          <li key={idx}>
            {page === DOTS ? (
              <span className="px-3 py-2 leading-tight text-gray-400 bg-white border border-gray-300">{DOTS}</span>
            ) : (
              <button
                className={`px-3 py-2 leading-tight border border-gray-300  ${
                  page === currentPage
                    ? "bg-blue-600 text-white font-bold"
                    : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
                onClick={() => onPageChange(Number(page))}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next"
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
