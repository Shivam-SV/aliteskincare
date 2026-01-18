export default function ProductCardSkeleton() {
    return (
        <div className="bg-white shadow-md overflow-hidden rounded-2xl animate-pulse">
            <div className="relative p-2">
                <div className="aspect-square w-full bg-neutral-200 rounded-2xl"></div>
            </div>
            <div className="p-2 md:p-4">
                <div className="h-5 bg-neutral-200 rounded mb-2 md:mb-3"></div>
                <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                <div className="flex flex-col mb-2">
                    <div className="h-6 bg-neutral-200 rounded w-1/2 mb-1"></div>
                    <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
                </div>
            </div>
        </div>
    );
}
