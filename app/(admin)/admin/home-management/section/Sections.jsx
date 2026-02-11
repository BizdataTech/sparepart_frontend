"use client";

import useSection from "./useSection";
import SectionCreation from "./SectionCreation.jsx";
import BannerSectionCard from "./BannerSectionCard";
import ProductListingSectionCard from "./ProductListingSectionCard";

const Sections = () => {
  let { sections, deleteSection, refetch } = useSection();
  return (
    <section className="w-5/6 space-y-4">
      {sections === null && (
        <div className="animation--container w-full h-[10rem]">
          <div className="animation--mask animation--effect"></div>
        </div>
      )}
      {sections && !sections.length && (
        <div className="a-section--box !bg-neutral-200">
          <div className="a-section--title">No Sections Found</div>
          <div className="a-text--body">
            You have created no sections so far. Create new sections to make
            user friendly experience for users when they visit the website. Add
            new section below.
          </div>
        </div>
      )}
      {sections && sections.length >= 1 && (
        <div className="space-y-2">
          <div className="a-section--title">Sections</div>
          <div className="space-y-8">
            {sections.map((section) =>
              section.section_type === "banner" ? (
                <BannerSectionCard
                  section={section}
                  deleteSection={deleteSection}
                  refetch={refetch}
                />
              ) : section.section_type === "product_listing" ? (
                <ProductListingSectionCard
                  section={section}
                  deleteSection={deleteSection}
                  refetch={refetch}
                />
              ) : (
                <></>
              ),
            )}
          </div>
        </div>
      )}
      <div className="a-section--box !space-y-4">
        <div className="a-section--title">Add New Section</div>
        <SectionCreation
          refetch={refetch}
          count={(sections && sections.length) || 0}
        />
      </div>
    </section>
  );
};

export default Sections;
