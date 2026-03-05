const ProductList = ({ items, loading }) => {
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <div className="text-[1.2rem] md:text-[1.6rem] uppercase font-medium">
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
          <div className="loading--container h-[12rem]">
            <div className="loading--mask loading--animation"></div>
          </div>
        </div>
      ) : (
        <div className="items grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
          {items.map((item) => (
            <div className="flex gap-8 border border-neutral-400 rounded-[.5rem] md:rounded-none bg-white p-3 md:p-4">
              <div className="">
                <img
                  src={item.productId.images[0]?.url}
                  alt=""
                  className="w-[4rem] md:w-[7rem] h-[4rem] md:h-[7rem] object-cover mt-[50%] md:mt-0"
                />
              </div>
              <div className="text-[1.2rem] md:text-[1.6rem]">
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
