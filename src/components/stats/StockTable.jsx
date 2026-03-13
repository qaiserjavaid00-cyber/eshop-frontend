import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function StockTables({ data }) {
    return (
        <div className="space-y-8">
            {/* Low Stock Products */}
            <div>
                <h3 className="text-xl font-semibold mb-2 text-yellow-700 dark:text-yellow-400">
                    ⚠️ Low Stock Products
                </h3>
                {data.lowStockProducts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-yellow-100 dark:bg-yellow-900">
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Color</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.lowStockProducts.map((item, idx) => (
                                    <TableRow
                                        key={idx}
                                        className="hover:bg-yellow-50 dark:hover:bg-yellow-800"
                                    >
                                        <TableCell>{item.product}</TableCell>
                                        <TableCell className="font-semibold">{item.quantity}</TableCell>
                                        <TableCell>{item.size}</TableCell>
                                        <TableCell>{item.color}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No low stock products.</p>
                )}
            </div>

            {/* Out of Stock Products */}
            <div>
                <h3 className="text-xl font-semibold mb-2 text-red-700 dark:text-red-400">
                    ❌ Out of Stock Products
                </h3>
                {data.outOfStockProducts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-red-100 dark:bg-red-900">
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Color</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.outOfStockProducts.map((item, idx) => (
                                    <TableRow
                                        key={idx}
                                        className="hover:bg-red-50 dark:hover:bg-red-800"
                                    >
                                        <TableCell>{item.product}</TableCell>
                                        <TableCell className="font-semibold">{item.quantity}</TableCell>
                                        <TableCell>{item.size}</TableCell>
                                        <TableCell>{item.color}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No out-of-stock products.</p>
                )}
            </div>
        </div>
    );
}