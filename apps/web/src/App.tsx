import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./Components/Header";
import BestSellers from "./Components/Home/BestSellers";
import HeroSection from "./Components/Home/HeroSection";
import PromoBanner from "./Components/Home/PromoBanner";
import WeEnsureSection from "./Components/Home/WeEnsureSection";
import FaceCare from "./Components/Home/FaceCare";
import BodyCare from "./Components/Home/BodyCare";
import ProductVideos from "./Components/Home/ProductVideos";
import Reviews from "./Components/Home/Reviews";
import StoreFront from "./Components/Home/StoreFront";
import Footer from "./Components/Footer";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        <HeroSection />
        <BestSellers />
        <WeEnsureSection />
        <PromoBanner />
        <FaceCare />
        <BodyCare />  
        <ProductVideos />
        <Reviews />
        <StoreFront />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
