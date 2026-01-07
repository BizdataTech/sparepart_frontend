"use client";

import { Calendar, Newspaper, Truck } from "phosphor-react";
import { Details } from "./Details";
import { ImageGrid } from "./ImageGrid";
import ProductList from "./ProductList";
import { useProduct } from "./useProduct";
import SmallDetails from "./SmallDetails";
import { useState } from "react";

const Productpage = () => {
  const { product, products, genuineProduct, addProducttoCart } = useProduct();
  const productConfig = { product };
  const imageConfig = {
    _id: product?._id,
    stock: product?.stock,
    images: product?.images || [],
    addProducttoCart,
  };
  const product_types = products.reduce(
    (obj, prod) => {
      if (prod.product_type === "oem") obj.oems.push(prod);
      if (prod.product_type === "after_market") obj.aftermarkets.push(prod);
      return obj;
    },
    { oems: [], aftermarkets: [] }
  );

  let [heroImage, setHeroImage] = useState(imageConfig?.images[0]);
  let [zoomPosition, setZoomPosition] = useState({ x: "", y: "" });
  let [show, setShow] = useState(false);
  const handleMouseMovement = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  return product ? (
    <div className="w-[90%] md:w-[85%] mx-auto pt-[15rem] md:pt-[17rem] pb-12 space-y-16">
      <div className="flex flex-col md:flex-row gap-5">
        <SmallDetails config={productConfig} />
        <ImageGrid
          config={imageConfig}
          handleMouseMovement={handleMouseMovement}
          setShow={setShow}
          image={heroImage}
          setImage={setHeroImage}
        />
        <Details
          config={productConfig}
          show={show}
          zoomPosition={zoomPosition}
          image={heroImage}
          imageConfig={imageConfig}
        />
      </div>
      <div className="p-[3rem] bg-red-200/30 text-[1.6rem] grid grid-cols-1 md:grid-cols-3 gap-[6rem] md:gap-0">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <Truck className="w-[4rem] h-[4rem] text-red-900" /> Free Delivery
          (within 3 days)
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <Calendar className="w-[4rem] h-[4rem] text-red-900" /> 10 Days
          Assured Return
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <Newspaper className="w-[4rem] h-[4rem] text-red-900" /> GST Invoice
        </div>
      </div>
      {genuineProduct && (
        <ProductList title="Genuine Product" products={genuineProduct} />
      )}
      {product_types.oems.length > 0 && (
        <ProductList title="OEM Products" products={product_types.oems} />
      )}
      {product_types.aftermarkets.length > 0 && (
        <ProductList
          title="After Market Products"
          products={product_types.aftermarkets}
        />
      )}
    </div>
  ) : (
    <div className="w-[95%] mx-auto flex gap-6 pt-[17rem] pb-12">
      <div className="shimmer w-3/6 h-[50rem]"></div>
      <div className="w-3/6 space-y-3">
        <div className="shimmer w-full h-[5rem]"></div>
        <div className="shimmer w-[30%]"></div>
        <div className="shimmer w-[40%] my-[5rem] h-[3rem]"></div>
        <div className="shimmer h-[20rem]"></div>
      </div>
    </div>
  );
};

export default Productpage;
