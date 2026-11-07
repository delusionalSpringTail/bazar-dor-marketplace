import AllProducts from "@/components/AllProducts";
import BannerSection from "@/components/Banner";
import FarePriceDecrease from "@/components/FarePriceDecrease";
import FarePriceIncrease from "@/components/FarePriceIncrease";
import MarqueeSection from "@/components/MarqueeSection";


export default function Home() {
  return (
    <div>
      <MarqueeSection></MarqueeSection>
      <BannerSection></BannerSection>
      <FarePriceIncrease></FarePriceIncrease>
      <FarePriceDecrease></FarePriceDecrease>
      <AllProducts></AllProducts>
    </div>
  );
}
