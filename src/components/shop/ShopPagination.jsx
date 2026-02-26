import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const sizeVariants = {
    sm: {
        button: "!h-7 !min-w-7 !px-2 !text-xs",
        gap: "gap-1",
    },
    md: {
        button: "!h-9 !min-w-9 !px-3 !text-sm",
        gap: "gap-2",
    },
    lg: {
        button: "!h-11 !min-w-11 !px-4 !text-base",
        gap: "gap-3",
    },
};

export const ShopPagination = ({
    pages,
    currentPage,
    setPage,
    size = "md",
    className,
    buttonClassName,
}) => {
    if (!pages || pages.length === 0) return null;

    const { button, gap } = sizeVariants[size] || sizeVariants.md;

    const baseButton =
        "border rounded cursor-pointer transition-colors disabled:opacity-50";

    return (
        <div className={cn("flex justify-center", className)}>
            <Pagination>
                <PaginationContent className={cn("flex", gap)}>
                    {/* Prev */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={cn(
                                baseButton,
                                button,
                                "bg-gray-100 hover:bg-gray-200",
                                buttonClassName
                            )}
                        >

                        </PaginationPrevious>
                    </PaginationItem>

                    {/* Pages */}
                    {pages.map((p) => (
                        <PaginationItem key={p}>
                            <PaginationLink
                                onClick={() => setPage(p)}
                                isActive={p === currentPage}
                                className={cn(
                                    baseButton,
                                    button,
                                    p === currentPage
                                        ? "bg-gray-600 text-white"
                                        : "bg-white text-gray-600 hover:bg-gray-100",
                                    buttonClassName
                                )}
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* Next */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setPage(Math.min(pages.length, currentPage + 1))}
                            disabled={currentPage === pages.length}
                            className={cn(
                                baseButton,
                                button,
                                "bg-gray-100 hover:bg-gray-200",
                                buttonClassName
                            )}
                        >

                        </PaginationNext>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};
