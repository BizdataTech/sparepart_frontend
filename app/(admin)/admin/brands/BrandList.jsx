import EmptyRow from "@/components/admin/EmptyRow";
import Brand from "./Brand";

const BrandList = ({ brands, handleSelect, refetch }) => {
  return (
    <section className="w-full a-section--box !p-0">
      <div className="a-text--body">
        <div className="grid grid-cols-5">
          {[
            "Brand Name",
            "Brand Image Logo",
            "Created Date",
            "Created Time",
            "Options",
          ].map((item, i) => (
            <div
              className="text-center first:text-start last:text-end font-medium px-4 py-4"
              key={i}
            >
              {item}
            </div>
          ))}
        </div>
        {brands &&
          brands.length >= 1 &&
          brands.map((brand) => (
            <Brand
              key={brand._id}
              brand={brand}
              select={() => handleSelect(brand)}
              refetch={refetch}
            />
          ))}
        {brands && brands.length === 0 && <EmptyRow text="No result found" />}
      </div>
    </section>
  );
};

export default BrandList;
