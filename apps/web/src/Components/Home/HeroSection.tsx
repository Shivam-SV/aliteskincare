import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroImage {
    desktop: string;
    mobile: string;
}

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [mouseStart, setMouseStart] = useState<number | null>(null);
    const [mouseEnd, setMouseEnd] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    const heroImages: HeroImage[] = [
        {
            desktop: "https://cdn.shopify.com/s/files/1/0658/3959/5686/files/alite_web_banner_1.jpg?v=1737005647",
            mobile: "https://cdn.shopify.com/s/files/1/0658/3959/5686/files/alite_web_banner_m.jpg?v=1737004380",
        },
        {
            desktop: "https://cdn.shopify.com/s/files/1/0658/3959/5686/files/Gentle-Care-Banner-3200x1200.jpg?v=1737107785",
            mobile: "https://cdn.shopify.com/s/files/1/0658/3959/5686/files/Gentle-Care-Banner-1200x1600.jpg?v=1737107986",
        }
    ];

    const minSwipeDistance = 50;

    // Auto-play functionality
    useEffect(() => {
        if (isPaused) {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
                autoPlayRef.current = null;
            }
            return;
        }

        autoPlayRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000); // Change slide every 5 seconds

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isPaused, heroImages.length]);

    // Pause on hover
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    // Navigation functions
    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    };

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // Touch handlers for swipe
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        const touch = e.targetTouches[0];
        if (touch) {
            setTouchStart(touch.clientX);
        }
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0]?.clientX || null);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goToNext();
        }
        if (isRightSwipe) {
            goToPrevious();
        }
        
        // Reset touch values
        setTouchStart(null);
        setTouchEnd(null);
    };

    // Mouse handlers for desktop swipe/drag
    useEffect(() => {
        if (!isDragging) return;

        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (mouseStart === null) return;
            
            e.preventDefault();
            setMouseEnd(e.clientX);
        };

        const handleGlobalMouseUp = () => {
            if (mouseStart === null || mouseEnd === null) {
                setIsDragging(false);
                setMouseStart(null);
                setMouseEnd(null);
                return;
            }

            const distance = mouseStart - mouseEnd;
            const isLeftSwipe = distance > minSwipeDistance;
            const isRightSwipe = distance < -minSwipeDistance;

            if (isLeftSwipe) {
                setCurrentSlide((prev) => (prev + 1) % heroImages.length);
            }
            if (isRightSwipe) {
                setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
            }
            
            // Reset mouse values
            setIsDragging(false);
            setMouseStart(null);
            setMouseEnd(null);
        };

        document.addEventListener('mousemove', handleGlobalMouseMove);
        document.addEventListener('mouseup', handleGlobalMouseUp);
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isDragging, mouseStart, mouseEnd, minSwipeDistance, heroImages.length]);

    const onMouseDown = (e: React.MouseEvent) => {
        // Don't start drag if clicking on buttons or dots
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('a')) {
            return;
        }
        
        // Only allow left mouse button
        if (e.button !== 0) return;
        
        setIsDragging(true);
        setMouseEnd(null);
        setMouseStart(e.clientX);
        setIsPaused(true);
        e.preventDefault();
    };

    return (
        <div 
            className="relative w-full overflow-hidden select-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            ref={sliderRef}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
            {/* Slider Container */}
            <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {heroImages.map((image, index) => (
                    <div 
                        key={index} 
                        className="min-w-full relative h-[60vh] lg:h-auto"
                    >
                        <picture className="w-full h-full lg:h-auto">
                            {/* Large Desktop Image - 1024px and above */}
                            <source
                                media="(min-width: 1024px)"
                                srcSet={image.desktop}
                            />
                            {/* Tablet Image - 768px to 1023px */}
                            <source
                                media="(min-width: 768px)"
                                srcSet={image.desktop}
                            />
                            {/* Mobile Image - below 768px */}
                            <source
                                media="(max-width: 767px)"
                                srcSet={image.mobile}
                            />
                            {/* Fallback Image */}
                            <img
                                src={image.mobile}
                                alt={`Hero banner ${index + 1}`}
                                className="w-full h-full object-cover lg:h-auto lg:max-h-[600px] object-center"
                                style={{ 
                                    objectPosition: 'center',
                                    display: 'block'
                                }}
                                loading={index === 0 ? "eager" : "lazy"}
                            />
                        </picture>
                    </div>
                ))}
            </div>

            {/* Arrow Navigation - Desktop Only */}
            <div className="hidden md:block">
                <button
                    onClick={goToPrevious}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-10 group cursor-pointer"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6 text-neutral-700 group-hover:text-primary-700" />
                </button>
                <button
                    onClick={goToNext}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-10 group cursor-pointer"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6 text-neutral-700 group-hover:text-primary-700" />
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        onMouseDown={(e) => e.stopPropagation()}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                            index === currentSlide
                                ? "w-8 h-2 bg-primary-700"
                                : "w-2 h-2 bg-white/60 hover:bg-white/80"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}