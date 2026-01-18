import type{ Product } from "../lib/api";
import { ShoppingCart, Zap } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const originalPrice = parseFloat(product.originalPrice);
    const currentPrice = parseFloat(product.price);
    const hasDiscount = product.discountPercentage > 0;

    const handleBuyNow = (e: React.MouseEvent) => {
        e.stopPropagation();
        // TODO: Implement buy now functionality
        console.log("Buy now:", product.id);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        // TODO: Implement add to cart functionality
        console.log("Add to cart:", product.id);
    };

    return (
        <div className="bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 rounded-2xl group">
            <div className="relative p-2">
                <img 
                    src={product.imageUrl || "https://placehold.co/400x400"} 
                    alt={product.name} 
                    className="aspect-square w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105" 
                />
                {hasDiscount && (
                    <span className="absolute top-4 right-4 bg-primary-700 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-lg z-10">
                        {product.discountPercentage}% OFF
                    </span>
                )}
                {product.isBestSeller && (
                    <span className="absolute top-4 left-4 bg-secondary-500 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-lg z-10">
                        Best Seller
                    </span>
                )}
            </div>
            <div className="p-3 md:p-4">
                <h3 className="md:text-lg text-base font-bold text-neutral-800 mb-2 md:mb-3 line-clamp-2 min-h-[3rem]">
                    {product.name}
                </h3>
                {/* Mobile: Price with icon buttons on the right */}
                <div className="md:hidden flex items-center justify-between gap-2">
                    <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-lg font-bold text-primary-700">
                            ₹{currentPrice.toFixed(2)}
                        </span>
                        {hasDiscount && (
                            <span className="text-xs text-neutral-500 line-through">
                                ₹{originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                            onClick={handleBuyNow}
                            className="bg-primary-700 text-white p-2 rounded-lg hover:bg-primary-800 active:scale-95 transition-all duration-200 shadow-md"
                            aria-label="Buy Now"
                        >
                            <Zap className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="bg-white border-2 border-primary-700 text-primary-700 p-2 rounded-lg hover:bg-primary-50 active:scale-95 transition-all duration-200 shadow-md"
                            aria-label="Add to Cart"
                        >
                            <ShoppingCart className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                {/* Desktop: Price and buttons */}
                <div className="hidden md:block">
                    <div className="flex flex-col mb-3">
                        <span className="text-xl font-bold text-primary-700">
                            ₹{currentPrice.toFixed(2)}
                        </span>
                        {hasDiscount && (
                            <span className="text-sm text-neutral-500 line-through">
                                ₹{originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 bg-primary-700 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-primary-800 active:scale-[0.98] transition-all duration-200 text-sm shadow-md hover:shadow-lg"
                        >
                            Buy Now
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="bg-white border-2 border-primary-700 text-primary-700 p-2.5 rounded-lg hover:bg-primary-50 active:scale-[0.98] transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                            aria-label="Add to Cart"
                        >
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}