import { useQuery } from "@tanstack/react-query";
import { getBestSellers } from "../../lib/api";
import ProductCard from "../ProductCard";
import ProductCardSkeleton from "../ProductCardSkeleton";

export default function BestSellers() {
    const { data: products, isLoading, error } = useQuery({
        queryKey: ["bestSellers"],
        queryFn: () => getBestSellers(8),
    });

    if (error || (products && products.length === 0)) {
        return null;
    }

    return (
        <section className="bg-gradient-to-b from-secondary-50 to-white py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-serif mb-3 text-neutral-800">Best Sellers</h2>
                    <p className="text-lg md:text-xl text-secondary-700 max-w-2xl mx-auto">Discover our most loved products. Trusted by thousands for quality and results.</p>
                </div>
                
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 md:gap-4 gap-2">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    products && products.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 md:gap-4 gap-2">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )
                )}
            </div>
        </section>
    );
}