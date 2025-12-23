import Link from "next/link";

const Footer = () => {
  return (
    <footer className="">
      <div
        className="py-16 "
        style={{ backgroundColor: "#b00015", color: "white" }}
      ></div>
      <div
        className="py-16"
        style={{ backgroundColor: "#282828", color: "white" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-[85%] mx-auto text-[1.3rem] text-center sm:text-left">
          <div>
            <h3 className="font-medium text-[1.7rem] mb-4">About</h3>
            <ul className="space-y-1 text-[1.5rem]">
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/career" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:underline">
                  Store
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-[1.7rem] mb-4">
              Grouped Companies
            </h3>
            <ul className="space-y-1 text-[1.5rem]">
              <li>Flipkart</li>
              <li>Myntra</li>
              <li>Amazon</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-[1.7rem] mb-4">Help</h3>
            <ul className="space-y-1 text-[1.5rem]">
              <li>
                <Link href="/payment-policy" className="hover:underline">
                  Payment
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:underline">
                  Shipping
                </Link>
              </li>

              <li>Cancellation</li>
              <li>Return</li>
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-[1.7rem] mb-4">Consumer Policy</h3>
            <ul className="space-y-1 text-[1.5rem]">
              <li>
                <Link href="/cancellation-return" className="hover:underline">
                  Cancellation & Return
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:underline">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/security-policy" className="hover:underline">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:underline">
                  Site Map
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-[1.7rem] mb-4">Mail Us</h3>
            <ul className="space-y-1 text-[1.5rem]">
              <li className="flex justify-center sm:justify-start gap-2">
                info@gmail.com
              </li>
              <li className="flex justify-center sm:justify-start gap-2">
                @facebook.com
              </li>
              <li className="flex justify-center sm:justify-start gap-2">
                @instagram.com
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-[1.7rem] mb-4">
              Registered Office Address
            </h3>
            <ul>
              <li className="text-lg leading-relaxed text-[1.5rem]">
                Prototype Ashtamudi Towers TechnoPark Kollam 691501{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
