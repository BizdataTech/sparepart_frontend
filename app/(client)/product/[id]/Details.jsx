export const Details = ({ config, show, zoomPosition, image, imageConfig }) => {
  let { images } = imageConfig;
  let { product } = config;
  let { sections } = product?.parent || [];

  return (
    <div className="md:w-3/6 space-y-6">
      <section className="relative bg-white p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="space-y-8">
            <div className="hidden md:block">
              <h1 className="text-[2rem] font-medium leading-[3rem] uppercase">
                {product?.product_title}
              </h1>
              <h2 className="text-[1.6rem] uppercase underline">
                {product?.brand?.brand_name}
              </h2>
            </div>
            <div className="text-[1.6rem] flex">
              {product.available_stock > 0 ? (
                <div className="font-medium text-green-900 bg-green-100 px-2 py-1">
                  Stock available
                </div>
              ) : (
                <div className="font-medium text-red-900 bg-red-100 px-2 py-1">
                  Stock not available
                </div>
              )}
            </div>
            <div className="text-[1.6rem] uppercase font-medium">
              <span>P/N : </span>
              <span className="text-red-600">{product.part_number}</span>
            </div>
          </div>

          <div>
            {["genuine", "oem"].includes(product.product_type) && (
              <div className="uppercase text-[1.2rem] text-white bg-red-700 font-medium py-1 px-4 self-start">
                {product.product_type}
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:block">
          <img
            src={product.brand.image}
            alt={product.brand.brand_name}
            className="w-[7rem] h-[7rem] object-contain"
          />
        </div>

        <div className="flex gap-6 hidden md:block">
          <p className="text-[3.5rem] font-semibold">₹{product.price}</p>
        </div>

        <div className="space-y-[.5rem] mt-8 text-[1.6rem]">
          <div className="font-medium">Product Description</div>
          <p className="line-clamp-4">{product?.description}</p>
        </div>
        {show && (
          <div
            className="absolute inset-0 h-[50rem] pointer-events-none shadow-2xl"
            style={{
              backgroundImage: `url(${image?.url || images[0]?.url})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundSize: "150%",
            }}
          ></div>
        )}
      </section>

      {sections && (
        <section className="bg-white p-6">
          {sections.map((section, index) => (
            <div
              className="text-[1.6rem] border-b border-neutral-300 last:border-b-0 space-y-4"
              key={index}
            >
              <div className="font-medium">{section.title}</div>
              <div>
                {section.details.map((detail, index) => (
                  <div className="flex justify-between gap-8" key={index}>
                    <div>{detail.label}</div>
                    <div>{detail.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
