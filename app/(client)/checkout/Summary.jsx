const Summary = ({ cartTotal }) => {
  return (
    <section className="w-4/12 space-y-4">
      <div className="text-[1.6rem] uppercase font-medium">Order Summary</div>
      <div className="text-[1.6rem] bg-white border border-neutral-400 p-4">
        <div className="flex justify-between py-4">
          <div>Shipping</div>
          <div>Free</div>
        </div>
        <div className="flex justify-between items-center py-4">
          <div>Cart Total</div>
          <div>{`₹ ${Intl.NumberFormat("en-IN").format(cartTotal)}`}</div>
        </div>
        <div className="flex justify-between items-center py-4 border-t border-neutral-300 text-green-800 font-medium">
          <div>Checkout Total</div>
          <div>{`₹ ${Intl.NumberFormat("en-IN").format(cartTotal)}`}</div>
        </div>
        <button className="button w-full bg-black text-white mt-8 hover:opacity-65 transition-colors cursor-not-allowed">
          Checkout
        </button>
      </div>
    </section>
  );
};

export default Summary;
