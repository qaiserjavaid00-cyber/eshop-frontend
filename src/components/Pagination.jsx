// components/Pagination.jsx
import React from "react";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const generatePages = () => {
        const pages = [];

        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }

        return pages;
    };

    const pages = generatePages();

    return (
        <div className="flex justify-center mt-6 space-x-2 text-sm">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border ${currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
            >
                Prev
            </button>

            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === "number" && onPageChange(page)}
                    disabled={page === "..."}
                    className={`px-3 py-1 rounded border ${page === currentPage
                            ? "bg-blue-600 text-white"
                            : page === "..."
                                ? "cursor-default text-gray-500"
                                : "hover:bg-gray-100"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border ${currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
            >
                Next
            </button>
        </div>
    );
};
