import { useState, useRef, useEffect } from "react";

export default function StoreFront() {
    const [isPaused, setIsPaused] = useState(false);
    const [animationDuration, setAnimationDuration] = useState(7);
    const marqueeContainerRef = useRef<HTMLDivElement>(null);
    const marqueeWrapperRef = useRef<HTMLDivElement>(null);

    // Brand logos from the website
    const brandLogos = [
        "https://cdn.shopify.com/s/files/1/0658/3959/5686/files/brand_logo-02.png?v=1725502570",
        "https://cdn.shopify.com/s/files/1/0658/3959/5686/files/brand_logo-01.png?v=1725502543",
        "https://cdn.shopify.com/s/files/1/0658/3959/5686/files/brand_logo-03_9497b00d-c722-4978-a2ec-dc1e70af4802.png?v=1725502392",
        "https://cdn.shopify.com/s/files/1/0658/3959/5686/files/brand_logo-05.png?v=1725502462",
    ];

    // Separator SVG icon
    const SeparatorIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 200 100"
            fill="currentColor"
            className="w-12 h-6 text-neutral-300"
            style={{ maxWidth: "unset" }}
        >
            <path d="M50 50 L150 50" stroke="currentColor" strokeWidth="2" />
        </svg>
    );

    // Calculate duration based on content width (similar to Shopify's speed calculation)
    useEffect(() => {
        if (marqueeWrapperRef.current && marqueeContainerRef.current) {
            const wrapperWidth = marqueeWrapperRef.current.scrollWidth;
            const speed = 155; // pixels per second (from Shopify)
            const duration = wrapperWidth / speed;
            setAnimationDuration(duration);
        }
    }, []);

    // Create marquee items with separator
    const renderMarqueeItems = (prefix: string) => (
        <div className="flex items-center" style={{ display: "flex" }}>
            {brandLogos.map((logo, index) => (
                <div key={`${prefix}-${index}`} className="flex items-center">
                    <div className="flex items-center justify-center px-4">
                        <img
                            src={logo}
                            alt={`Brand ${index + 1}`}
                            style={{ maxWidth: "unset", width: "170px", height: "auto" }}
                            className="object-contain"
                        />
                    </div>
                    {index < brandLogos.length - 1 && (
                        <span className="flex items-center">
                            <SeparatorIcon />
                        </span>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <section className="bg-gradient-to-b from-accent-50 to-white py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl text-neutral-700 font-serif mb-3">At Your Ease</h2>
                    <p className="text-lg md:text-xl text-accent-700 max-w-2xl mx-auto">Shop our products from your favorite store. Find Alite at trusted retailers near you.</p>
                </div>

                <div
                    className="relative overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div
                        ref={marqueeContainerRef}
                        className="flex"
                        style={{
                            width: "100%",
                            transform: "none",
                        }}
                    >
                        <div
                            ref={marqueeWrapperRef}
                            className="flex items-center"
                            style={{
                                animation: isPaused
                                    ? "none"
                                    : `marqueeScroll ${animationDuration}s linear infinite`,
                                display: "flex",
                                minWidth: "auto",
                            }}
                        >
                            {/* Render multiple sets for seamless infinite scroll */}
                            {renderMarqueeItems("set1")}
                            {renderMarqueeItems("set2")}
                            {renderMarqueeItems("set3")}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }
            `}</style>
        </section>
    );
}
