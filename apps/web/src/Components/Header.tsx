import { useState, useEffect, useRef } from "react";
import { 
    Facebook, 
    Instagram, 
    Search, 
    ShoppingCart, 
    Truck, 
    Twitter, 
    User, 
    Home, 
    ShoppingBag, 
    Sparkles, 
    Heart, 
    Gift, 
    Info, 
    Phone, 
    ChevronLeft, 
    ChevronRight,
    X
} from "lucide-react";

interface NavItem {
    label: string;
    href: string;
    icon: any;
}

export default function Header() {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const navScrollRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const navItems: NavItem[] = [
        { label: "Home", href: "/", icon: Home },
        { label: "Shop All", href: "/", icon: ShoppingBag },
        { label: "Face Care", href: "/", icon: Sparkles },
        { label: "Body Care", href: "/", icon: Heart },
        { label: "Combo", href: "/", icon: Gift },
        { label: "Gift Cards", href: "/", icon: Gift },
        { label: "About", href: "/", icon: Info },
        { label: "Contact", href: "/", icon: Phone },
    ];

    // Handle scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle navigation scroll arrows
    useEffect(() => {
        const checkScrollButtons = () => {
            if (navScrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = navScrollRef.current;
                setCanScrollLeft(scrollLeft > 0);
                setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
            }
        };

        checkScrollButtons();
        window.addEventListener("resize", checkScrollButtons);
        if (navScrollRef.current) {
            navScrollRef.current.addEventListener("scroll", checkScrollButtons);
        }

        return () => {
            window.removeEventListener("resize", checkScrollButtons);
            if (navScrollRef.current) {
                navScrollRef.current.removeEventListener("scroll", checkScrollButtons);
            }
        };
    }, []);

    // Focus search input when modal opens
    useEffect(() => {
        if (isSearchModalOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchModalOpen]);

    const scrollNav = (direction: "left" | "right") => {
        if (navScrollRef.current) {
            const scrollAmount = 200;
            navScrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    const openSearchModal = () => {
        setIsSearchModalOpen(true);
    };

    const closeSearchModal = () => {
        setIsSearchModalOpen(false);
    };

    return (
        <>
            <div className={`bg-primary-800 text-white border-b border-primary-700 transition-all duration-300 ease-in-out ${isScrolled ? "max-h-0 overflow-hidden opacity-0" : "max-h-16 opacity-100"}`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center md:justify-between justify-center py-2">
                        <p className="flex items-center gap-2">
                            <Truck className="w-6 h-6" /> 
                            <span className="font-semibold text-sm">Quick Delivery on prepaid orders</span>
                        </p>
                        <div className="md:flex hidden items-center gap-4 justify-end">
                            <a href="#"><Facebook className="w-5 h-5 hover:text-primary-100 transition-colors duration-150" /></a>
                            <a href="#"><Instagram className="w-5 h-5 hover:text-primary-100 transition-colors duration-150" /></a>
                            <a href="#"><Twitter className="w-5 h-5 hover:text-primary-100 transition-colors duration-150" /></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`bg-white border-b border-neutral-200 shadow sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-md" : ""}`}>
                <div className={`border-b border-neutral-200 transition-all duration-300 ease-in-out ${isScrolled ? "max-h-0 overflow-hidden opacity-0" : "max-h-32 opacity-100"}`}>
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between py-2">
                            <a href="/">
                                <img 
                                    src="https://www.aliteskincare.in/cdn/shop/files/Alite_Logo_70x40_px-01.jpg?v=1744455909" 
                                    alt="Alite Skincare" 
                                    className="h-10 w-auto" 
                                />
                            </a>
                            
                            <div 
                                className="hidden md:flex items-center gap-2 border border-neutral-200 rounded-lg py-1 px-3 cursor-pointer hover:border-primary-500 transition-colors"
                                onClick={openSearchModal}
                            >
                                <Search className="w-5 h-5 text-neutral-500" />
                                <input 
                                    type="text" 
                                    placeholder="Search" 
                                    className="w-64 h-8 outline-none cursor-pointer" 
                                    readOnly
                                />
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={openSearchModal}
                                    className="md:hidden text-neutral-600 flex items-center rounded px-3 py-2 hover:text-primary-700 hover:bg-neutral-200 transition-colors duration-150"
                                >
                                    <Search className="w-5 h-5" />
                                </button>

                                <a href="/">
                                    <p className="text-neutral-600 flex items-center rounded px-2 md:px-4 py-2 gap-2 hover:text-primary-700 hover:bg-neutral-200 transition-colors duration-150 cursor-pointer">
                                        <ShoppingCart className="w-5 h-5" />
                                        <span className="text-sm hidden md:inline">My Cart</span>
                                    </p>
                                </a>
                                <a href="/">
                                    <p className="text-neutral-600 flex items-center rounded px-2 md:px-4 py-2 gap-2 hover:text-primary-700 hover:bg-neutral-200 transition-colors duration-150 cursor-pointer">
                                        <User className="w-5 h-5" />
                                        <span className="text-sm hidden md:inline">You</span>
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 relative">
                    <div className="relative flex items-center">
                        {canScrollLeft && (
                            <button
                                onClick={() => scrollNav("left")}
                                className="md:hidden absolute left-0 z-10 bg-white shadow-md rounded-full p-2 hover:bg-neutral-100 transition-colors"
                                aria-label="Scroll left"
                            >
                                <ChevronLeft className="w-5 h-5 text-neutral-600" />
                            </button>
                        )}

                        <div
                            ref={navScrollRef}
                            className="flex items-center gap-2 p-1 overflow-x-auto scrollbar-hide scroll-smooth"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            {navItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <a key={index} href={item.href}>
                                        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 px-2 md:px-3 text-neutral-600 hover:text-primary-700 hover:bg-neutral-100 transition-colors duration-150 cursor-pointer whitespace-nowrap">
                                            <Icon className="w-5 h-6 md:w-4 md:h-4" />
                                            <span className="text-xs md:text-sm font-semibold">{item.label}</span>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        {canScrollRight && (
                            <button
                                onClick={() => scrollNav("right")}
                                className="lg:hidden absolute right-0 z-10 bg-white shadow-md rounded-full p-2 hover:bg-neutral-100 transition-colors"
                                aria-label="Scroll right"
                            >
                                <ChevronRight className="w-5 h-5 text-neutral-600" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Modal */}
            {isSearchModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20 md:pt-32"
                    onClick={closeSearchModal}
                >
                    <div 
                        className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                            <h2 className="text-xl font-semibold text-neutral-800">Search Products</h2>
                            <button
                                onClick={closeSearchModal}
                                className="text-neutral-500 hover:text-neutral-700 transition-colors cursor-pointer"
                                aria-label="Close search"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center gap-2 border border-neutral-300 rounded-lg py-2 px-4 focus-within:border-primary-500 transition-colors">
                                <Search className="w-5 h-5 text-neutral-500" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search for products, categories, or brands..."
                                    className="flex-1 h-8 outline-none text-neutral-700 text-lg"
                                />
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-neutral-500 mb-2">Popular Searches</p>
                                <div className="flex flex-wrap gap-2">
                                    {["Face Wash", "Moisturizer", "Sunscreen", "Serum", "Cleanser"].map((term, idx) => (
                                        <button
                                            key={idx}
                                            className="px-3 py-1 cursor-pointer text-sm bg-neutral-100 hover:bg-primary-100 hover:text-primary-700 rounded-full transition-colors"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </>
    );
}