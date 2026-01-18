export default function ProductVideos() {
    return (
        <section className="bg-linear-to-b from-white to-secondary-50 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl text-neutral-700 font-serif mb-3">Showcase Time 😉</h2>
                    <p className="text-lg md:text-xl text-secondary-700 max-w-2xl mx-auto">Watch our products in action. See the quality and results that make Alite special.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-6 gap-3">
                    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <video className="w-full h-full object-cover" autoPlay={true} loop={true} playsInline={true} muted={true} preload="auto">
                            <source src="https://cdn.shopify.com/videos/c/o/v/ac8916f61a674a54a5909efdcd8eb58e.mp4#t=," data-source="https://cdn.shopify.com/videos/c/o/v/ac8916f61a674a54a5909efdcd8eb58e.mp4#t=," />
                        </video>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <video className="w-full h-full object-cover" autoPlay={true} loop={true} playsInline={true} muted={true} preload="auto">
                            <source src="https://cdn.shopify.com/videos/c/o/v/f615a12d006343e08c1999865cf8c137.mp4#t=," data-source="https://cdn.shopify.com/videos/c/o/v/f615a12d006343e08c1999865cf8c137.mp4#t=," />
                        </video>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <video className="w-full h-full object-cover" autoPlay={true} loop={true} playsInline={true} muted={true} preload="auto">
                            <source src="https://cdn.shopify.com/videos/c/o/v/226943849ea44310a373bb767e957b05.mp4#t=," data-source="https://cdn.shopify.com/videos/c/o/v/226943849ea44310a373bb767e957b05.mp4#t=," />
                        </video>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <video className="w-full h-full object-cover" autoPlay={true} loop={true} playsInline={true} muted={true} preload="auto">
                            <source src="https://cdn.shopify.com/videos/c/o/v/6bb030b6c9f042aa84806277c2038906.mp4#t=," data-source="https://cdn.shopify.com/videos/c/o/v/6bb030b6c9f042aa84806277c2038906.mp4#t=," />
                        </video>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <video className="w-full h-full object-cover" autoPlay={true} loop={true} playsInline={true} muted={true} preload="auto">
                            <source src="https://cdn.shopify.com/videos/c/o/v/dd7d25d644be40d3b89d25b313baa56d.mp4#t=," data-source="https://cdn.shopify.com/videos/c/o/v/dd7d25d644be40d3b89d25b313baa56d.mp4#t=," />
                        </video>
                    </div>
                </div>
            </div>
        </section>
    )
}