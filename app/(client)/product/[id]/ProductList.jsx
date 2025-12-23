import ProductCard from "@/components/client/Product/ProductCard.jsx";
const ProductList = ({ title, products }) => {
  return (
    <section className="space-y-6">
      <div className="text-[2rem] uppercase font-semibold text-red-900">
        {title}
      </div>
      <div className="grid grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
