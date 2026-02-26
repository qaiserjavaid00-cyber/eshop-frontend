import React from "react";

const TableSkeleton = ({ rows = 5, columns = 6 }) => {
    return (
        <div className="p-6 animate-pulse">
            {/* Header skeleton */}
            <div className="mb-4 h-6 w-48 rounded bg-gray-200"></div>

            <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            {Array.from({ length: columns }).map((_, i) => (
                                <th key={i} className="p-4">
                                    <div className="h-4 w-20 rounded bg-gray-200"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <tr key={rowIndex} className="border-t">
                                {Array.from({ length: columns }).map((_, colIndex) => (
                                    <td key={colIndex} className="p-4">
                                        <div className="h-4 w-full rounded bg-gray-200"></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableSkeleton;
