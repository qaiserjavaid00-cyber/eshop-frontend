

import { useRevenueChart } from "@/hooks/stats/useRevenue";
import CustomerStatCard from "./stats/CustomerStatsCard";
import InventoryStats from "./stats/InventoryStats";
import OrdersStatCard from "./stats/OrderStatCard";
import RevenueChart from "./stats/RevenueChart";
import RevenueStatCard from "./stats/RevenueStatsCards";
import TopProducts from "./stats/TopProducts";
import { useOrderStatsChart } from "@/hooks/stats/useOrderStats";
import OrdersStatusPie from "./stats/OrderstatusPie";

const Dashboard = () => {

    const { data: revenueData, isLoading, isError } = useRevenueChart();
    const { data: orderData, isLoading: orderLoading, isError: orderError } = useOrderStatsChart();

    return (
        <>
            <RevenueStatCard />
            {/* Charts */}
            {isLoading && <p>Loading revenue chart...</p>}
            {isError && <p>Error loading revenue chart</p>}
            {revenueData && <RevenueChart data={revenueData} />}


            <OrdersStatCard />
            {/* Orders Pie Chart */}
            {orderLoading && <p>Loading order stats chart...</p>}
            {orderError && <p>Error loading order stats chart</p>}
            {orderData && <OrdersStatusPie data={orderData} />}


            <TopProducts />

            <InventoryStats />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CustomerStatCard />
            </div>


        </>
    );
};

export default Dashboard;