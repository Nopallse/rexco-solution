"use client";

import React from "react";
import HeroSection from "@/app/components/Home/HeroSection";
import FeaturedProductSection from "@/app/components/Home/FeaturedProductSection";
import BestProductSection from "@/app/components/Home/BestProductSection";
import TipsSection from "@/app/components/Home/TipsSection";
import ProtectSection from "@/app/components/Home/ProtectSection";
import UsesSection from "@/app/components/Home/UsesSection";
export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <FeaturedProductSection />
      <BestProductSection />
      <TipsSection />
      <ProtectSection />
      <UsesSection />
    </div>
  );
}
