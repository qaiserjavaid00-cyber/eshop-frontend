import moment from "moment";

const ORDER_STATUSES = [
    "Processing",
    "Shipped",
    "Cancelled",
    "Refund Initiated",
    "Delivered",
    "Refunded",
    "Partially Refunded",
];

export const getOrderColumns = (handleStatusChange) => [
    {
        accessorKey: "_id",
        header: "Order ID",
        enableHiding: false,
        cell: ({ row }) => (
            <span className="font-mono">
                {row.original._id.slice(-8)}
            </span>
        ),
    },
    {
        accessorKey: "customer",
        header: "Customer",
        cell: ({ row }) => (
            <div>
                <div className="font-medium">
                    {row.original.orderdBy?.name || "Guest"}
                </div>
                <div className="text-xs text-gray-500">
                    {row.original.orderdBy?.email}
                </div>
            </div>
        ),
    },
    {
        accessorKey: "amountPaid",
        header: "Amount",
        cell: ({ row }) =>
            `$${(row.original.amountPaid || 0).toFixed(2)}`,
    },
    {
        accessorKey: "isPaid",
        header: "Payment",
        cell: ({ row }) => (
            <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${row.original.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
            >
                {row.original.isPaid ? "Paid" : "Unpaid"}
            </span>
        ),
    },
    {
        accessorKey: "orderStatus",
        header: "Status",
        cell: ({ row }) => (
            <select
                value={row.original.orderStatus}
                onChange={(e) =>
                    handleStatusChange(
                        row.original._id,
                        e.target.value,
                        row.original
                    )
                }
                className="border rounded px-2 py-1 text-sm"
            >
                {ORDER_STATUSES.map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) =>
            moment(row.original.createdAt).format("MMM D, YYYY"),
    },
];