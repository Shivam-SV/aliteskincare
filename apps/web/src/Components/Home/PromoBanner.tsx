export default function PromoBanner() {
    return (
        <section className="overflow-hidden">
            <picture className="w-full h-full block">
                <source media="(max-width: 767px)" srcSet="https://cdn.shopify.com/s/files/1/0658/3959/5686/files/Choose_Alite.jpg?v=1725450683" />
                <img 
                    loading="lazy" 
                    fetchPriority="low" 
                    src="https://cdn.shopify.com/s/files/1/0658/3959/5686/files/why_Alite.jpg?v=1725423150" 
                    alt="Why Choose Alite" 
                    className="w-full h-auto object-cover"
                />
            </picture>
        </section>
    )
}