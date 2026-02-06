import { useState } from "react";
import BannerInputs from "./BannerInputs";
import ProductListingInputs from "./ProductListingInputs";
import { InputLabel } from "@/components/admin/InputLabel";

const SectionCreation = ({ refetch }) => {
  let [sectionType, setSectionType] = useState("banner");

  return (
    <section className="a-text--body space-y-8">
      <div className="space-y-2">
        <InputLabel label="Section Type" />
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="section_type"
              id="banner"
              value="banner"
              onChange={(e) => setSectionType(e.target.value)}
              checked={sectionType === "banner"}
            />
            <label htmlFor="banner">Banner</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="section_type"
              id="product_listing"
              value="product_listing"
              onChange={(e) => setSectionType(e.target.value)}
            />
            <label htmlFor="product_listing">Product Listing</label>
          </div>
        </div>
      </div>
      {sectionType === "banner" && <BannerInputs refetch={refetch} />}
      {sectionType === "product_listing" && <ProductListingInputs />}
    </section>
  );
};

export default SectionCreation;
