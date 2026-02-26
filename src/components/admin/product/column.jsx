import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export const getProductColumns = (navigate, handleDelete) => [
    {
        accessorKey: "images",
        header: "Image",
        enableSorting: false,
        cell: ({ row }) => (
            <img
                src={row.original.images?.[0]}
                alt="product"
                className="h-16 w-20 object-cover rounded"
            />
        ),
    },
    {
        accessorKey: "title",
        header: "Title",
    },

    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => row.original.category?.name || "—",
    },
    {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => (
            <div className="flex gap-4">
                <div
                    className="cursor-pointer"
                    onClick={() => navigate(`edit/${row.original._id}`)}
                >
                    <AiFillEdit className="text-blue-600" size={18} />
                </div>

                <div
                    className="cursor-pointer"
                    onClick={() => handleDelete(row.original._id)}
                >
                    <AiFillDelete className="text-red-600" size={18} />
                </div>
            </div>
        ),
    },
];