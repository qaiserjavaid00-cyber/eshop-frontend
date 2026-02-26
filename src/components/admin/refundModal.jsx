// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogDescription,
//     DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// const RefundModal = ({
//     open,
//     onOpenChange,
//     order,
//     refundType,
//     setRefundType,
//     onConfirm,
// }) => {
//     if (!order) return null;

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent className="sm:max-w-md">
//                 <DialogHeader>
//                     <DialogTitle>Cancel Order & Refund</DialogTitle>
//                     <DialogDescription>
//                         Choose refund type for order{" "}
//                         <span className="font-mono">
//                             {order._id.slice(-8)}
//                         </span>
//                     </DialogDescription>
//                 </DialogHeader>

//                 {/* Refund Type */}
//                 <div className="space-y-3 mt-4">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                             type="radio"
//                             checked={refundType === "full"}
//                             onChange={() => setRefundType("full")}
//                         />
//                         <span className="font-medium">
//                             Full refund (${order.amountPaid?.toFixed(2)})
//                         </span>
//                     </label>

//                     <label className="flex items-center gap-2 opacity-50 cursor-not-allowed">
//                         <input type="radio" disabled />
//                         <span>Partial refund (coming soon)</span>
//                     </label>
//                 </div>

//                 <DialogFooter className="mt-6">
//                     <Button
//                         variant="outline"
//                         onClick={() => onOpenChange(false)}
//                     >
//                         Cancel
//                     </Button>

//                     <Button
//                         variant="destructive"
//                         onClick={onConfirm}
//                     >
//                         Confirm Refund
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default RefundModal;

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const RefundModal = ({
    open,
    onClose,
    order,
    onFullRefund,
    onPartialRefund,
}) => {
    const [refundType, setRefundType] = useState("full");
    const [refundItems, setRefundItems] = useState([]);

    useEffect(() => {
        if (!order) return;

        setRefundType("full");
        setRefundItems(
            order.products.map((item) => ({
                orderItemId: item._id,
                quantity: 0,
                max:
                    item.count -
                    (item.refundedQty || 0) -
                    (item.pendingRefundQty || 0),
            }))
        );
    }, [order]);

    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Cancel Order & Refund</DialogTitle>
                    <DialogDescription>
                        Order{" "}
                        <span className="font-mono">{order._id.slice(-8)}</span>
                    </DialogDescription>
                </DialogHeader>

                {/* Refund type */}
                <div className="space-y-3 mt-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            checked={refundType === "full"}
                            onChange={() => setRefundType("full")}
                        />
                        <span className="font-medium">
                            Full refund (${order.amountPaid?.toFixed(2)})
                        </span>
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            checked={refundType === "partial"}
                            onChange={() => setRefundType("partial")}
                        />
                        <span className="font-medium">Partial refund</span>
                    </label>
                </div>

                {/* Partial refund UI */}
                {refundType === "partial" && (
                    <div className="mt-4 space-y-4 border rounded p-3">
                        {order.products.map((item, index) => {
                            const refundable =
                                item.count -
                                (item.refundedQty || 0) -
                                (item.pendingRefundQty || 0);

                            if (refundable <= 0) return null;

                            return (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between gap-4"
                                >
                                    <div>
                                        <p className="text-sm font-medium">
                                            {item.product?.title}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Refundable: {refundable}
                                        </p>
                                    </div>

                                    <input
                                        type="number"
                                        min={0}
                                        max={refundable}
                                        value={refundItems[index]?.quantity || 0}
                                        onChange={(e) => {
                                            const value = Number(e.target.value);
                                            setRefundItems((prev) =>
                                                prev.map((ri, i) =>
                                                    i === index
                                                        ? {
                                                            ...ri,
                                                            quantity: Math.min(value, refundable),
                                                        }
                                                        : ri
                                                )
                                            );
                                        }}
                                        className="w-20 border rounded px-2 py-1 text-sm"
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}

                <DialogFooter className="mt-6">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={() => {
                            if (refundType === "full") {
                                onFullRefund(order._id);
                            } else {
                                const items = refundItems
                                    .filter((i) => i.quantity > 0)
                                    .map((i) => ({
                                        orderItemId: i.orderItemId,
                                        quantity: i.quantity,
                                    }));

                                if (items.length === 0) {
                                    alert("Select at least one item");
                                    return;
                                }

                                onPartialRefund(order._id, items);
                            }

                            onClose();
                        }}
                    >
                        Confirm Refund
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RefundModal;
