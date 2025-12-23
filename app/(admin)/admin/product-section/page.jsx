"use client";

import SectionForm from "./Form";
import Preview from "./Preview";
import useSection from "./useSection";

const ProductSection = () => {
  let { sectionData, config, handleInput, searchConfig } = useSection();
  let section_util = {
    sectionData,
    config,
    handleInput,
    searchConfig,
  };
  return (
    <main className="flex gap-4">
      <SectionForm util={section_util} />
      <Preview />
    </main>
  );
};

export default ProductSection;
