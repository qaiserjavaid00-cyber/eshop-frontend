// import React, { useEffect, useState } from "react";
// import TableSkeleton from "./user/TableSkeleton";
// import { useAllOrders } from "../hooks/orders/useAllOrders";
// import { useUpdateOrderStatus } from "../hooks/orders/useUpdateOrderStatus";
// import moment from "moment";
// import { useRefundOrder } from "@/hooks/orders/useRefundOrder";
// import RefundModal from "./admin/refundModal";
// import { toast } from "react-toastify";
// import { usePartialRefundOrder } from "@/hooks/orders/usePartialRefundOrders";
// import RevenueStatCard from "./stats/RevenueStatsCArds";
// import OrdersStatCard from "./stats/OrderStatCard";
// import CustomerStatCard from "./stats/CustomerStatsCard";
// import TopProducts from "./stats/TopProducts";
// import InventoryStats from "./stats/InventoryStats";


// const ORDER_STATUSES = [
//     "Processing",
//     "Shipped",
//     "Cancelled",
//     "Refund Initiated",
//     "Delivered",
//     "Refunded",
//     "Partially Refunded",
// ];

// const Dashboard = () => {

//     const [refundModalOpen, setRefundModalOpen] = useState(false);
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const { data: orders, isLoading, isError, error, } = useAllOrders();
//     const { mutate: updateStatus, isPending, } = useUpdateOrderStatus();
//     const { mutate: refundOrder, isSuccess: refundSuccess } = useRefundOrder();
//     const { mutate: partialRefundOrder } = usePartialRefundOrder();

//     useEffect(() => {
//         if (refundSuccess) {
//             toast.success(
//                 `The Order # ${selectedOrder?._id.slice(-8)} has been fully refunded`
//             );
//         }
//     }, [refundSuccess, selectedOrder?._id]);

//     const handleStatusChange = (orderId, newStatus, order) => {
//         if (newStatus === "Cancelled" && order.isPaid) {
//             setSelectedOrder(order);
//             // setRefundType("full");
//             setRefundModalOpen(true);
//             return;
//         }

//         updateStatus({ orderId, status: newStatus });
//     };



//     if (isLoading) {
//         return <div>
//             <TableSkeleton />
//         </div>;
//     }

//     if (isError) {
//         return (
//             <p className="p-6 text-red-500">
//                 {error?.message || "Failed to load orders"}
//             </p>
//         );
//     }

//     return (
//         <>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <RevenueStatCard />
//                 <OrdersStatCard />
//                 <CustomerStatCard />
//             </div>
//             <TopProducts />
//             <InventoryStats />

//             <div className="p-6">
//                 <h1 className="text-2xl font-semibold mb-6">All Orders (Admin)</h1>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full border border-gray-200 rounded-lg">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="px-4 py-3 text-left text-sm font-medium">
//                                     Order ID
//                                 </th>
//                                 <th className="px-4 py-3 text-left text-sm font-medium">
//                                     Customer
//                                 </th>
//                                 <th className="px-4 py-3 text-left text-sm font-medium">
//                                     Amount
//                                 </th>
//                                 <th className="px-4 py-3 text-left text-sm font-medium">
//                                     Payment
//                                 </th>
//                                 <th className="px-4 py-3 text-left text-sm font-medium">
//                                     Status
//                                 </th>
//                                 <th className="px-4 py-3 text-left text-sm font-medium">
//                                     Items
//                                 </th>
//                                 <th className="px-4 py-3 text-left text-sm font-medium">
//                                     CreatedAt
//                                 </th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {orders.map((order) => (
//                                 <tr
//                                     key={order._id}
//                                     className="border-t hover:bg-gray-50"
//                                 >
//                                     {/* Order ID */}
//                                     <td className="px-4 py-3 text-sm font-mono">
//                                         {order._id.slice(-8)}
//                                     </td>

//                                     {/* Customer */}
//                                     <td className="px-4 py-3 text-sm">
//                                         <div className="font-medium">
//                                             {order.orderdBy?.name || "Guest"}
//                                         </div>
//                                         <div className="text-xs text-gray-500">
//                                             {order.orderdBy?.email}
//                                         </div>
//                                     </td>

//                                     {/* Amount */}
//                                     <td className="px-4 py-3 text-sm font-semibold">
//                                         $
//                                         {(
//                                             (order.amountPaid || 0)
//                                         ).toFixed(2)}
//                                     </td>

//                                     {/* Payment */}
//                                     <td className="px-4 py-3 text-sm">
//                                         <span
//                                             className={`px-2 py-1 rounded-full text-xs font-semibold
//                                         ${order.isPaid
//                                                     ? "bg-green-100 text-green-700"
//                                                     : "bg-red-100 text-red-700"
//                                                 }`}
//                                         >
//                                             {order.isPaid ? "Paid" : "Unpaid"}
//                                         </span>
//                                     </td>

//                                     {/* Status Dropdown */}
//                                     <td className="px-4 py-3 text-sm">
//                                         <select
//                                             value={order.orderStatus}
//                                             onChange={(e) => handleStatusChange(order._id, e.target.value, order)
//                                             }
//                                             disabled={isPending}
//                                             className="border rounded px-2 py-1 text-sm bg-white"
//                                         >
//                                             {ORDER_STATUSES.map((status) => (
//                                                 <option key={status} value={status}>
//                                                     {status}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </td>

//                                     {/* Items */}
//                                     <td className="px-4 py-3 text-sm">
//                                         <details>
//                                             <summary className="cursor-pointer text-blue-600">
//                                                 View
//                                             </summary>
//                                             <ul className="mt-2 space-y-1 text-xs">
//                                                 {order.products.map((item) => (
//                                                     <li key={item._id}>
//                                                         {item.product?.title} ×{" "}
//                                                         {item.count}
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </details>
//                                     </td>
//                                     <td className="px-4 py-3">
//                                         {moment(order.createdAt).format("MMM D, YYYY")}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 <RefundModal
//                     open={refundModalOpen}
//                     onClose={() => setRefundModalOpen(false)}
//                     order={selectedOrder}
//                     onFullRefund={(orderId) => refundOrder({ orderId })}
//                     onPartialRefund={(orderId, items) =>
//                         partialRefundOrder({ orderId, items })
//                     }
//                 />
//             </div>
//         </>
//     );
// };

// export default Dashboard;

import AdminOrdersTable from "./admin/AdminOrdersTable";
import CustomerStatCard from "./stats/CustomerStatsCard";
import InventoryStats from "./stats/InventoryStats";
import OrdersStatCard from "./stats/OrderStatCard";
import RevenueStatCard from "./stats/RevenueStatsCards";
import TopProducts from "./stats/TopProducts";

const Dashboard = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RevenueStatCard />
                <OrdersStatCard />
                <CustomerStatCard />
            </div>

            <TopProducts />
            <InventoryStats />

            <AdminOrdersTable />
        </>
    );
};

export default Dashboard;