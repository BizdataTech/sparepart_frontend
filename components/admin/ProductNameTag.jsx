const ProductNameTag = ({ product }) => {
  return (
    <>
      {`${product.product_title} ${product.brand.brand_name}`}{" "}
      <span
        className={`ml-2 px-2 py-1 capitalize text-[1.2rem] ${
          product.product_type === "genuine"
            ? "bg-blue-500 text-white "
            : product.product_type === "oem"
            ? "bg-green-500 text-white"
            : ""
        }`}
      >
        {product.product_type !== "after_market" &&
          product.product_type.split("_").join(" ")}
      </span>
    </>
  );
};

export default ProductNameTag;
