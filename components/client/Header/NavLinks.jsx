import Link from "next/link";
import AuthButtons from "./AuthButtons";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { CartContext } from "@/context/cartContext";

const NavLinks = () => {
  let { user } = useContext(UserContext);
  let { items } = useContext(CartContext);
  return (
    <nav className="hidden md:block">
      <ul
        className={`options flex items-center gap-[2.8rem] text-[1.6rem] font-medium text-neutral-800`}
      >
        <div className="relative">
          <Link href={`/cart`} className="capitalize cursor-pointer">
            cart
          </Link>
          <span className="absolute top-0 right-[-1.5rem] text-[.9rem] py-[.1rem] px-[.5rem] bg-red-600 text-white rounded-full">
            {items.length}
          </span>
        </div>

        <Link href={`/wishlist`} className="capitalize cursor-pointer">
          wishlist
        </Link>
        {user && (
          <Link href={`/profile`} className="capitalize cursor-pointer">
            profile
          </Link>
        )}

        <AuthButtons />
      </ul>
    </nav>
  );
};

export default NavLinks;
