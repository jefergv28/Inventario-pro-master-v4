"use client";

//componenetes
import Brands from "@/components/Brands";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Integration from "@/components/Integration";
import Testimonial from "@/components/Testimonial";
import Trial from "@/components/Trial";

//implementacion de lenis smooth scroll
import ReactLenis from "lenis/react";

export default function Home() {
  return (
    <>
      <ReactLenis root>
        <Hero />
        <Brands />
        <Features />
        <Integration />
        <Testimonial />
        <Trial />
        <Footer />
        {/* temporal div */}
        {/* <div className="h-[8000px]"></div> */}
      </ReactLenis>
    </>
  );
}
