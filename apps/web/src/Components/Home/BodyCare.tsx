import { getProducts } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ProductCardSkeleton from "../ProductCardSkeleton";
import ProductCard from "../ProductCard";

export default function BodyCare() {
    const { data: products, isLoading, error } = useQuery({
        queryKey: ["bodyCare"],
        queryFn: () => getProducts({ category: "body-care", limit: 4 }),
    });

    if (error || (products && products.products.length === 0)) {
        return null;
    }

    return (
        <section className="bg-gradient-to-b from-neutral-50 to-white py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl text-neutral-700 font-serif mb-3">Body Care</h2>
                    <p className="text-lg md:text-xl text-secondary-700 max-w-3xl mx-auto">Pamper your body from head to toe. Our body care range keeps your skin soft, smooth, and beautifully nourished every day.</p>
                </div>
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 md:gap-4 gap-2">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    products && products.products.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 md:gap-4 gap-2">
                            {products.products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )
                )}
            </div>
        </section>
    );
}