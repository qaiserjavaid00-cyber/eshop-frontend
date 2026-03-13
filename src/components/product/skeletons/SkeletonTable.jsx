import React from "react";

// SkeletonRow simulates a single table row
export const SkeletonRow = ({ columns }) => (
    <tr className="animate-pulse">
        {columns.map((col, idx) => (
            <td key={idx} className="px-4 py-2">
                {/* simulate different cell types if needed */}
                <div className="h-4 bg-gray-300 rounded w-full"></div>
            </td>
        ))}
    </tr>
);

// SkeletonTable simulates the full table, including header, rows, and pagination
export const SkeletonTable = ({ columns, rows = 5 }) => {
    return (
        <div className="space-y-4">
            {/* Search input + column toggle skeleton */}
            <div className="flex justify-between items-center">
                <div className="h-10 w-64 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-md border border-gray-200">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} className="px-4 py-2">
                                    <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: rows }).map((_, idx) => (
                            <SkeletonRow key={idx} columns={columns} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination skeleton */}
            <div className="flex justify-end space-x-2">
                <div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
            </div>
        </div>
    );
};