import { getProducts } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ProductCardSkeleton from "../ProductCardSkeleton";
import ProductCard from "../ProductCard";

export default function FaceCare() {
    const { data: products, isLoading, error } = useQuery({
        queryKey: ["faceCare"],
        queryFn: () => getProducts({ category: "face-care", limit: 8 }),
    });

    if (error || (products && products.products.length === 0)) {
        return null;
    }

    return (
        <section className="bg-gradient-to-b from-secondary-50 to-white py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-serif mb-3 text-neutral-800">Face Care</h2>
                    <p className="text-lg md:text-xl text-secondary-700 max-w-3xl mx-auto">Nurture your skin with our premium face care collection. Discover products designed to enhance your natural glow and maintain healthy, radiant skin.</p>
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