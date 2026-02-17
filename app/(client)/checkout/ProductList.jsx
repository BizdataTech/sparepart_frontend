const ProductList = ({ items, loading }) => {
  return (
    <div className="space-y-4">
      <div className="text-[1.6rem] uppercase font-medium">
        Selected Products
      </div>
      {loading ? (
        <div className="grid grid-cols-3 gap-4">
          <div className="loading--container h-[12rem]">
            <div className="loading--mask loading--animation"></div>
          </div>
          <div className="loading--container h-[12rem]">
            <div className="loading--mask loading--animation"></div>
          </div>
        </div>
      ) : (
        <div className="items grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {items.map((item) => (
            <div className="flex gap-8 border border-neutral-400 bg-white p-4">
              <div>
                <img
                  src={item.productId.images[0]?.url}
                  alt=""
                  className="w-[7rem] h-[7rem] object-cover"
                />
              </div>
              <div className="text-[1.6rem]">
                <div className="font-semibold">
                  {item.productId.product_title}
                </div>
                <div>{item.productId.brand.brand_name}</div>
                <div>{`Price : ₹ ${item.productId.price}`}</div>
                <div className="mt-4">
                  <div>{`Total Quantity : ${item.quantity}`}</div>
                  <div className="font-semibold">{`Total Price : ₹ ${item.totalAmount}`}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
