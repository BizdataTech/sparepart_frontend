"use client";

import { useEffect, useState } from "react";
import LayoutLoading from "@/components/client/Home/LayoutLoading.jsx";
import BannerSection from "@/components/client/sections/BannerSection";
import ProductListingSection from "@/components/client/sections/ProductListingSection";

const ClientPage = () => {
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [sections, setSections] = useState(null);
  useEffect(() => {
    const getSections = async () => {
      try {
        let response = await fetch(`${BACKEND_URL}/api/client/sections`, {
          method: "GET",
        });
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        console.log("client sections:", result.sections);
        setSections(result.sections);
      } catch (error) {
        console.log(error.message);
      }
    };
    getSections();
  }, []);

  return (
    <main className="pt-[16rem] md:pt-[16rem] lg:py-[18rem]  space-y-8 lg:space-y-[4rem]">
      {sections === null && <LayoutLoading />}
      {sections &&
        sections.length >= 1 &&
        sections.map((section, i) => {
          if (section.section_type === "banner")
            return <BannerSection key={i} section={section} />;
          else if (section.section_type === "product_listing")
            return <ProductListingSection key={i} section={section} />;
        })}
    </main>
  );
};

export default ClientPage;
