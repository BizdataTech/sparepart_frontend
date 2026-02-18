const BrandList = ({ brands, handleSelect }) => {
  return (
    <section className="w-4/6 flex flex-col gap-4">
      <div className="a-text--section">Existing Brands</div>
      {brands.length ? (
        <div className="grid grid-cols-7 auto-rows-[12rem] gap-4">
          {brands.map((brand) => (
            <div
              className="bg-white flex flex-col justify-between py-2 cursor-pointer hover:border-2 border-neutral-300"
              onClick={() => handleSelect(brand)}
            >
              <img
                src={brand.image.url}
                alt="brand image"
                className="w-full h-[8rem] object-contain p-2"
              />
              <div className="text-[1.4rem] font-medium text-center">
                {brand.brand_name}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-[3rem] bg-white">
          <div className="text-[2rem] font-medium">No Brand to List</div>
          <div className="text-[1.4rem]">
            Cannot find any brands. Create brands above.
          </div>
        </div>
      )}
    </section>
  );
};

export default BrandList;
