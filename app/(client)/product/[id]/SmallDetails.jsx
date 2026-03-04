const SmallDetails = ({ config }) => {
  let { product } = config;
  return (
    <section className="md:hidden flex justify-between items-end">
      <div className="">
        <h1 className="text-[2rem] font-medium leading-[3rem] uppercase">
          {product?.product_title}
        </h1>
        <h2 className="text-[1.4rem] uppercase">
          {product?.brand?.brand_name}
        </h2>
      </div>
    </section>
  );
};

export default SmallDetails;
