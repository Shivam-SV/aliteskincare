import { Headset, PackageOpen, ShieldCheck, Truck } from "lucide-react";

export default function WeEnsureSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-serif mb-4 text-primary-800">We Ensure</h2>
                    <p className="text-xl text-secondary-700 max-w-2xl mx-auto">Your trust is our commitment. Experience premium service with every purchase.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer rounded-2xl p-6 border border-primary-100 group">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-5 rounded-full bg-primary-700 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                                <PackageOpen className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-800 mb-2">Cash on Delivery</h3>
                            <p className="text-sm text-neutral-600">Pay when you receive your order. No upfront payment required.</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer rounded-2xl p-6 border border-secondary-100 group">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-5 rounded-full bg-secondary-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Truck className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-800 mb-2">Free Shipping</h3>
                            <p className="text-sm text-neutral-600">Free shipping on all orders across India. Fast and reliable delivery.</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer rounded-2xl p-6 border border-accent-100 group">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-5 rounded-full bg-accent-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Headset className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-800 mb-2">24/7 Support</h3>
                            <p className="text-sm text-neutral-600">Round-the-clock customer support. We're always here to help you.</p>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer rounded-2xl p-6 border border-primary-100 group">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-5 rounded-full bg-primary-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                                <ShieldCheck className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-800 mb-2">SSL Secured Payment</h3>
                            <p className="text-sm text-neutral-600">Your payment is 100% secure with industry-standard encryption.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}