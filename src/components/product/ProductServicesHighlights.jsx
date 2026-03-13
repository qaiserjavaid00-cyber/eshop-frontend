import {
    Truck,
    ShieldCheck,
    RotateCcw,
    CreditCard
} from "lucide-react";

const services = [
    {
        icon: Truck,
        title: "Free Shipping",
        description: "Free shipping on orders over $50"
    },
    {
        icon: ShieldCheck,
        title: "Safe Delivery",
        description: "Secure packaging and insured delivery"
    },
    {
        icon: RotateCcw,
        title: "Easy Returns",
        description: "30-day hassle-free returns"
    },
    {
        icon: CreditCard,
        title: "Secure Payment",
        description: "100% secure payment processing"
    }
];

export default function ProductServiceHighlights() {
    return (
        <div className="border rounded-lg p-4 mt-6 bg-muted/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {services.map((service, index) => {
                    const Icon = service.icon;

                    return (
                        <div
                            key={index}
                            className="flex items-start gap-3"
                        >
                            <Icon className="w-6 h-6 text-primary mt-1" />

                            <div>
                                <p className="text-sm font-semibold">
                                    {service.title}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}