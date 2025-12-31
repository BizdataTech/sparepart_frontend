import ProductCard from "@/components/client/Product/ProductCard.jsx";
const ProductList = ({ title, products }) => {
  return (
    <section className="space-y-6">
      <div className="text-[1.6rem] md:text-[2rem] uppercase font-semibold text-red-900">
        {title}
      </div>
      <div className="flex md:grid md:grid-cols-5 gap-4 overflow-x-auto">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
