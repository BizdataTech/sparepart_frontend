const ProductCard = ({ item }) => {
  let product = item.product;
  return (
    <div className="border border-neutral-300 text-[1.2rem] md:text-[1.6rem] flex items-start gap-8 p-4">
      <div className="self-stretch">
        <img
          src={product.images[0]?.url}
          alt={`${product.product_title} image`}
          className="w-[4rem] md:w-[7rem] h-[4rem] md:h-[7rem] mt-[50%]"
        />
      </div>
      <div>
        <div>{product.product_title}</div>
        <div>
          Part Number :{" "}
          <span className="font-medium">{product.part_number}</span>
        </div>
        <div className="mt-6">
          Quantity : <span className="font-medium">{item.quantity}</span>
        </div>
        <div className="font-semibold md:font-normal">
          Price : <span className="font-medium">{product.price}/-</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
