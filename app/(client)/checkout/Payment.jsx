const Payment = ({ payment, setPayment }) => {
  return (
    <section className="space-y-4 text-[1.6rem]">
      <div className="font-medium uppercase">Payment Options</div>
      <div className="bg-white p-4 border border-neutral-300">
        <div className="flex items-center justify-between gap-6 py-2 border-b border-neutral-300">
          <label htmlFor="cod">Cash on Delivery (COD)</label>
          <input
            type="radio"
            name="payment"
            id="cod"
            value="cod"
            checked={payment === "cod"}
            onChange={(e) => setPayment(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between gap-6 py-2">
          <label htmlFor="bank_transfer">Bank Transfer</label>
          <input
            type="radio"
            name="payment"
            id="bank_transfer"
            value="bank_transfer"
            checked={payment === "bank_transfer"}
            onChange={(e) => setPayment(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};

export default Payment;
