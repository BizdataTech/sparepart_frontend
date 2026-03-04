import { CartContext } from "@/context/cartContext";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import { X } from "phosphor-react";
import { useContext } from "react";
import AuthButtons from "./AuthButtons";

const SlideNavigation = ({ open }) => {
  const { user } = useContext(UserContext);
  const { items } = useContext(CartContext);

  const handleClick = () => {
    if (open) open(false);
  };
  return (
    <div className="py-8 md:py-12 px-10 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="text-[1.4rem] font-medium uppercase">Menu</div>
        <X
          className="w-[1.8rem] h-[1.8rem] text-red-800"
          weight="bold"
          onClick={() => open(false)}
        />
      </div>
      <nav className="md:hidden">
        <ul
          className={`options flex flex-col gap-6 text-[1.4rem] font-medium text-neutral-800`}
        >
          <div className="relative">
            <Link
              href={`/cart`}
              className="capitalize cursor-pointer"
              onClick={handleClick}
            >
              cart
            </Link>
            <span className="absolute top-0 right-[.5rem] md:right-[-1.5rem] text-[.9rem] py-[.1rem] px-[.5rem] bg-red-600 text-white rounded-full">
              {items.length}
            </span>
          </div>

          <Link
            href={`/wishlist`}
            className="capitalize cursor-pointer"
            onClick={handleClick}
          >
            wishlist
          </Link>
          {user && (
            <Link
              href={`/profile`}
              className="capitalize cursor-pointer"
              onClick={handleClick}
            >
              profile
            </Link>
          )}

          <AuthButtons open={open} />
        </ul>
      </nav>
    </div>
  );
};

export default SlideNavigation;
