const SmallDetails = ({ config }) => {
  let { product } = config;
  return (
    <section className="md:hidden flex justify-between items-end">
      <div className="flex flex-col">
        <h1 className="text-[1.8rem] font-semibold leading-[3rem] uppercase">
          {product?.product_title}
        </h1>
        <h2 className="text-[1.2rem] text-neutral-700 uppercase">
          {product?.brand?.brand_name}
        </h2>
      </div>
    </section>
  );
};

export default SmallDetails;
