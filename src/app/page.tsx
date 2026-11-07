import BannerSection from "@/components/Banner";
import Category from "@/components/Category";
import FarePriceDecrease from "@/components/FarePriceDecrease";
import FarePriceIncrease from "@/components/FarePriceIncrease";
import MarqueeSection from "@/components/MarqueeSection";
import { Loader, Loader2 } from "lucide-react";


export default function Home() {
  return (
    <div className="">
      <MarqueeSection></MarqueeSection>
      <BannerSection></BannerSection>
      <FarePriceIncrease></FarePriceIncrease>
      <FarePriceDecrease></FarePriceDecrease>
      কমপক্ষে ৮ অক্ষর
      <div className="flex items-center justify-center p-2">
        <Loader className="h-6 w-6 animate-spin text-[#00873e]" />
      </div>
    </div>
  );
}
