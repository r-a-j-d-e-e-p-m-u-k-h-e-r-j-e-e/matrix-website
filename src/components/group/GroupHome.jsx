import React from "react";
import {
  GROUP_LOCATIONS,
  GROUP_METRICS,
  GROUP_PILLARS,
  GROUP_SERVICES,
  GROUP_TESTIMONIALS,
  GROUP_TIMELINE
} from "../../data/group";
import GroupHero from "./GroupHero";
import BrandSegments from "./BrandSegments";
import GroupMetrics from "./GroupMetrics";
import GroupPillars from "./GroupPillars";
import GroupServices from "./GroupServices";
import GroupTimeline from "./GroupTimeline";
import GroupLocations from "./GroupLocations";
import GroupTestimonials from "./GroupTestimonials";
import GroupLookbook from "./GroupLookbook";
import NewsletterSection from "../sections/NewsletterSection";
import GroupFooter from "./GroupFooter";
import { PRODUCTS } from "../../data/products";

export default function GroupHome({ brands, onSelectBrand, onOpenGateway }) {
  const lookbookImages = [
    ...Object.values(brands).map((brand) => brand.hero),
    ...PRODUCTS.slice(0, 3).map((product) => product.image)
  ];
  const handleExplore = () => {
    if (typeof window === "undefined") {
      return;
    }
    const target = document.getElementById("brand-segments");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white text-stone-900">
      <GroupHero onEnter={onOpenGateway} onExplore={handleExplore} />
      <BrandSegments brands={brands} onSelect={onSelectBrand} />
      <GroupMetrics metrics={GROUP_METRICS} />
      <GroupPillars pillars={GROUP_PILLARS} />
      <GroupLookbook images={lookbookImages} />
      <GroupServices services={GROUP_SERVICES} />
      <GroupTimeline timeline={GROUP_TIMELINE} />
      <GroupTestimonials testimonials={GROUP_TESTIMONIALS} />
      <GroupLocations locations={GROUP_LOCATIONS} />
      <NewsletterSection />
      <GroupFooter brands={brands} />
    </div>
  );
}
