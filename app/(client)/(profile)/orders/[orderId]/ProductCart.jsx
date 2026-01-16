const ProductCard = ({ product }) => {
  return (
    <div className="border border-neutral-300 p-4 text-[1.6rem] flex items-start gap-8">
      <div>
        <img
          src={product.images[0]}
          alt={`${product.product_title} image`}
          className="w-[7rem] h-[7rem]"
        />
      </div>
      <div>
        <div>{product.product_title}</div>
        <div>
          Part Number :{" "}
          <span className="font-medium">{product.part_number}</span>
        </div>
        <div className="mt-6">
          Price : <span className="font-medium">{product.price}/-</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
