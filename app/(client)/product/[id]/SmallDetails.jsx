const SmallDetails = ({ config }) => {
  let { product } = config;
  return (
    <section className="md:hidden flex justify-between items-end">
      <div className="">
        <h1 className="text-[1.8rem] font-medium leading-[3rem] uppercase">
          {product?.product_title}
        </h1>
        <h2 className="text-[1.4rem] uppercase underline">
          {product?.brand?.brand_name}
        </h2>
      </div>
      <div className="text-[2.5rem] uppercase font-semibold">
        ₹ {product?.price}
      </div>
    </section>
  );
};

export default SmallDetails;
