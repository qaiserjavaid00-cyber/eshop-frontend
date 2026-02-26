
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    const hasPriceRange =
        product?.minPrice !== null &&
        product?.maxPrice !== null &&
        product.minPrice !== product.maxPrice;

    const priceDisplay =
        product?.minPrice !== null
            ? hasPriceRange
                ? `$${product.minPrice} - $${product.maxPrice}`
                : `$${product.minPrice}`
            : "$N/A";

    return (
        <Card className="hover:shadow-lg transition text-center">
            <CardContent className="p-4 bg-secondary">
                <img
                    src={product?.images?.[0]}
                    alt={product?.title}
                    className="h-48 w-full object-contain"
                />

                <Link to={`/${product.slug}`}>
                    <h3 className="font-semibold text-sm mb-1">
                        {product.title}
                    </h3>
                </Link>

                <p className="text-muted-foreground text-sm mb-3">
                    {priceDisplay}
                </p>
            </CardContent>
        </Card>
    );
}
