import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {

    return (
        <footer className="bg-gradient-to-b from-primary-700 to-primary-800">
            <div className="container mx-auto px-4 border-b border-primary-400/30 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    <div className="col-span-1 lg:col-span-1">
                        <div className="mb-6">
                            <h3 className="text-4xl text-white font-serif mb-2">Alite</h3>
                            <p className="text-lg text-primary-100 font-medium">Skincare</p>
                        </div>
                        <p className="text-sm leading-relaxed text-primary-100/90 mb-4">Alite Skin Care Products are crafted without harmful sulfates, silicones, or parabens, ensuring safe and effective skincare for all.</p>
                        <p className="text-sm leading-relaxed text-primary-100/90">Inspired by nature and backed by dermatological testing, our range offers targeted solutions for acne care, skin nourishment, and everyday hygiene.</p>
                    </div>
                    <div className="col-span-1">
                        <h3 className="text-xl text-white font-serif mb-6 font-semibold">Shop</h3>
                        <div className="space-y-3 flex flex-col">
                            <a href="#" className="text-sm text-primary-100/90 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block w-fit">Face Care</a>
                            <a href="#" className="text-sm text-primary-100/90 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block w-fit">Body Care</a>
                            <a href="#" className="text-sm text-primary-100/90 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block w-fit">Combo</a>
                            <a href="#" className="text-sm text-primary-100/90 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block w-fit">Gift Cards</a>
                            <a href="#" className="text-sm text-primary-100/90 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block w-fit">About</a>
                            <a href="#" className="text-sm text-primary-100/90 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block w-fit">Contact</a>
                        </div>
                    </div>
                    
                    <div className="col-span-1">
                        <h3 className="text-xl text-white font-serif mb-6 font-semibold">Learn</h3>
                        <div className="space-y-3 flex flex-col">
                            <a href="#" className="text-sm text-primary-100/90 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block w-fit">Shipping Policy</a>
                            <a href="#" className="text-sm text-primary-100/90 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block w-fit">Return Policy</a>
                            <a href="#" className="text-sm text-primary-100/90 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block w-fit">Privacy Policy</a>
                            <a href="#" className="text-sm text-primary-100/90 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block w-fit">Terms & Conditions</a>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-xl text-white font-serif mb-6 font-semibold">Help</h3>
                        <div className="space-y-3 flex flex-col">
                            <a href="#" className="text-sm text-primary-100/90 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block w-fit">FAQ</a>
                            <a href="#" className="text-sm text-primary-100/90 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block w-fit">Contact Us</a>
                            <a href="#" className="text-sm text-primary-100/90 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block w-fit">Support</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
                    <p className="text-sm text-primary-100/90 text-center md:text-left">© 2026 Alite. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-primary-100/90 hover:text-white transition-colors duration-200 hover:scale-110 inline-block" aria-label="Facebook">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-primary-100/90 hover:text-white transition-colors duration-200 hover:scale-110 inline-block" aria-label="Instagram">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-primary-100/90 hover:text-white transition-colors duration-200 hover:scale-110 inline-block" aria-label="Twitter">
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}