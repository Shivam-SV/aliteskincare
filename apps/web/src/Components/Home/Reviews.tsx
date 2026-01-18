import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
    id: number;
    name: string;
    review: string;
    rating: number;
    location?: string;
}

export default function Reviews() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const reviews: Review[] = [
        {
            id: 1,
            name: "Priya Sharma",
            review: "Amazing products! My skin has improved so much after using their face wash. It's gentle yet effective. Highly recommend to everyone looking for natural skincare.",
            rating: 5,
            location: "Mumbai, Maharashtra"
        },
        {
            id: 2,
            name: "Rahul Kumar",
            review: "Best skincare brand I've tried. The body lotion keeps my skin moisturized all day. Great quality and affordable prices. Will definitely order again!",
            rating: 5,
            location: "Delhi, NCR"
        },
        {
            id: 3,
            name: "Anjali Patel",
            review: "I've been using their products for 3 months now. My acne has reduced significantly and my skin feels so smooth. Thank you Alite for such wonderful products!",
            rating: 5,
            location: "Ahmedabad, Gujarat"
        },
        {
            id: 4,
            name: "Vikram Singh",
            review: "Fast delivery and excellent packaging. The products are exactly as described. My wife loves the face care range. Great customer service too!",
            rating: 5,
            location: "Bangalore, Karnataka"
        },
        {
            id: 5,
            name: "Meera Reddy",
            review: "Perfect for sensitive skin! No irritation or breakouts. The ingredients are natural and the results are visible within weeks. Worth every rupee spent.",
            rating: 5,
            location: "Hyderabad, Telangana"
        },
        {
            id: 6,
            name: "Arjun Nair",
            review: "Great value for money. The combo pack is a steal deal. Products last long and the quality is premium. My skin has never looked better!",
            rating: 5,
            location: "Chennai, Tamil Nadu"
        },
        {
            id: 7,
            name: "Sneha Desai",
            review: "I was skeptical at first, but after trying their products, I'm a loyal customer now. The moisturizer is perfect for Indian weather. Love it!",
            rating: 5,
            location: "Pune, Maharashtra"
        },
        {
            id: 8,
            name: "Karan Malhotra",
            review: "Excellent products! The face serum has reduced my dark spots and improved my skin texture. Packaging is eco-friendly which is a bonus. Highly satisfied!",
            rating: 5,
            location: "Chandigarh, Punjab"
        },
        {
            id: 9,
            name: "Divya Iyer",
            review: "My dermatologist recommended this brand and I'm so glad I tried it. The products are dermatologically tested and really work. My skin is glowing now!",
            rating: 5,
            location: "Coimbatore, Tamil Nadu"
        },
        {
            id: 10,
            name: "Amit Joshi",
            review: "Best purchase ever! The body care products smell amazing and keep my skin soft. Quick delivery and good packaging. Will order more products soon.",
            rating: 5,
            location: "Jaipur, Rajasthan"
        },
        {
            id: 11,
            name: "Kavita Menon",
            review: "I've tried many brands but Alite is the best. The products are gentle, effective, and affordable. My entire family uses them now. Thank you!",
            rating: 5,
            location: "Kochi, Kerala"
        },
        {
            id: 12,
            name: "Rohit Agarwal",
            review: "Amazing quality products! The face wash cleared my acne and the moisturizer keeps my skin hydrated. Great customer support and fast shipping. Highly recommended!",
            rating: 5,
            location: "Kolkata, West Bengal"
        },
    ];

    const [itemsPerView, setItemsPerView] = useState(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }
        return 3;
    });

    const maxIndex = useMemo(() => Math.max(0, reviews.length - itemsPerView), [reviews.length, itemsPerView]);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const handleResize = () => {
            let newItemsPerView = 3;
            if (window.innerWidth >= 1024) {
                newItemsPerView = 3;
            } else if (window.innerWidth >= 768) {
                newItemsPerView = 2;
            } else {
                newItemsPerView = 1;
            }
            setItemsPerView(newItemsPerView);
            const newMaxIndex = Math.max(0, reviews.length - newItemsPerView);
            if (currentIndex > newMaxIndex) {
                setCurrentIndex(Math.max(0, newMaxIndex));
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentIndex, reviews.length]);

    useEffect(() => {
        if (isAutoPlaying) {
            intervalRef.current = setInterval(() => {
                nextSlide();
            }, 5000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isAutoPlaying, nextSlide]);

    const handleMouseEnter = () => {
        setIsAutoPlaying(false);
    };

    const handleMouseLeave = () => {
        setIsAutoPlaying(true);
    };

    return (
        <section className="bg-linear-to-b from-white to-secondary-50 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl text-neutral-700 font-serif mb-2">What Our Customers Say</h2>
                    <p className="text-lg text-secondary-700 mb-8">Real reviews from real customers. Join thousands of satisfied users who trust Alite for their skincare needs.</p>
                </div>

                <div 
                    className="relative overflow-hidden"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div 
                        className="flex transition-transform duration-500 ease-in-out pb-8"
                        style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                    >
                        {reviews.map((review) => (
                            <div 
                                key={review.id} 
                                className="shrink-0 px-3"
                                style={{ width: `${100 / itemsPerView}%` }}
                            >
                                <div className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 rounded-2xl p-6 md:p-8 border border-neutral-200 h-full flex flex-col">
                                    <div className="flex items-center gap-2 mb-4">
                                        {Array.from({ length: review.rating }).map((_, index) => (
                                            <Star key={index} className="w-5 h-5 text-secondary-500 fill-secondary-500" />
                                        ))}
                                    </div>
                                    <p className="text-neutral-600 mb-6 grow leading-relaxed text-sm md:text-base">
                        "{review.review}"
                    </p>
                                    <div className="border-t border-neutral-200 pt-4">
                                        <h3 className="text-lg font-semibold text-secondary-700 mb-1">{review.name}</h3>
                                        {review.location && (
                                            <p className="text-sm text-neutral-500">{review.location}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    {currentIndex > 0 && (
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-primary-50 transition-colors z-10 border border-neutral-200"
                            aria-label="Previous reviews"
                        >
                            <ChevronLeft className="w-6 h-6 text-neutral-700" />
                        </button>
                    )}
                    {currentIndex < maxIndex && (
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-primary-50 transition-colors z-10 border border-neutral-200"
                            aria-label="Next reviews"
                        >
                            <ChevronRight className="w-6 h-6 text-neutral-700" />
                        </button>
                    )}
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all duration-300 rounded-full ${
                                index === currentIndex
                                    ? "w-8 h-2 bg-primary-700"
                                    : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}