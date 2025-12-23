import { MinusCircle, PlusCircle, X } from "phosphor-react";
import { useEffect, useRef, useState } from "react";

const CartItem = ({ item, setCartTotal, getCart }) => {
  let [quantity, setQuantity] = useState(item.quantity);
  let [totalQuantity, setTotalQuantity] = useState(item.productId.stock);
  let [productTotal, setProductTotal] = useState(item.totalAmount);

  let firstRender = useRef(true);
  let debounce = useRef(null);
  let BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  let productPrice = item.productId.price;

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (debounce.current) debounce.current = clearTimeout(debounce.current);
    debounce.current = setTimeout(async () => {
      try {
        let response = await fetch(`${BACKEND_URL}/api/cart/item/${item._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
          credentials: "include",
        });
        let result = await response.json();
        if (!response.ok) throw new Error(result.message);
        console.log(result.message);
      } catch (error) {
        console.log("quantity update errror:", error.message);
      }
    }, 500);
  }, [quantity]);

  let increase = () => {
    setQuantity((prev) => {
      if (prev < totalQuantity) {
        setProductTotal((prev) => prev + productPrice);
        setCartTotal((prev) => prev + productPrice);
        return prev + 1;
      }
      return prev;
    });
  };
  let decrease = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        setProductTotal((prev) => prev - productPrice);
        setCartTotal((prev) => prev - productPrice);
        return prev - 1;
      }
      return prev;
    });
  };

  const removeItem = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/api/cart/item/${item._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      let result = await response.json();
      if (!response.ok) throw new Error(result.message);
      console.log(result.message);
      getCart();
    } catch (error) {
      console.log("cart item deletion error:", error.message);
    }
  };

  return (
    <div className="border border-neutral-300 p-8 bg-white flex justify-between gap-[2rem]">
      <div className="flex justify-start gap-8">
        <div className="">
          <img
            src={item?.productId?.images[0]}
            alt="product image"
            className="w-[10rem] h-[10rem] object-cover"
          />
        </div>
        <div className="text-[1.6rem]">
          <div className="font-medium uppercase">
            {item?.productId?.product_title}
          </div>
          <div className="">{item?.productId?.brand?.brand_name}</div>
          <div className="font-semibold">
            Rs {Intl.NumberFormat("en-IN").format(item.productId.price)}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="self-end" onClick={removeItem}>
          <X className="w-[1.8rem] h-[1.8rem] text-neutral-400 hover:text-red-600 transition-colors cursor-pointer" />
        </div>
        <div className="flex gap-[4rem]">
          <div className="flex items-center gap-6">
            <MinusCircle
              className="w-[2.5rem] h-[2.5rem] cursor-pointer"
              weight="regular"
              onClick={decrease}
            />
            <div className="text-[1.5rem]">{quantity}</div>
            <PlusCircle
              className="w-[2.5rem] h-[2.5rem] cursor-pointer"
              weight="regular"
              onClick={increase}
            />
          </div>
          <div className="text-[1.8rem] font-semibold">
            {`₹ ${Intl.NumberFormat("en-IN").format(productTotal)}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
