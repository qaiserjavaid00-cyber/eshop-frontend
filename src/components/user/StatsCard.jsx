// // src/components/user/StatCard.jsx
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function StatCard({ title, value }) {
//     return (
//         <Card className="bg-white shadow-md border border-gray-200">
//             <CardHeader>
//                 <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <p className="text-2xl font-bold text-gray-900">{value}</p>
//             </CardContent>
//         </Card>
//     );
// }

import React from "react";

export default function StatCard({ title, value, icon, bg }) {
    return (
        <div
            className={`${bg} rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
        >
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-600">
                    {title}
                </h4>
                <div className="p-2 rounded-xl bg-white shadow-sm">
                    {icon}
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
                {value}
            </h2>
        </div>
    );
}