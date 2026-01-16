import { toast } from "sonner";
import { confirmOrder } from "./orderService";
import { useState } from "react";
import { Spinner } from "phosphor-react";

const ActionButtons = ({ currentStatus, orderId, refetch }) => {
  const button_style = "py-3 px-4 text-[1.4rem] font-medium";
  const getCancelButton = () => {
    return (
      <button
        className={`${button_style} text-red-700 bg-white border border-red-800`}
      >
        Cancel this Order
      </button>
    );
  };

  const [confirmLoad, setConfirmLoad] = useState(false);
  const submitConfirm = async () => {
    try {
      setConfirmLoad(true);
      const result = await confirmOrder(orderId);
      setConfirmLoad(false);
      console.log(result.message);
      refetch();
    } catch (error) {
      console.log("order confirmation failed");
      toast.error(error.message);
    }
  };

  const getButtons = () => {
    switch (currentStatus) {
      case "placed":
        return (
          <>
            {getCancelButton()}
            <button
              className={`${button_style} text-blue-700 bg-white border border-blue-800 ${
                confirmLoad ? "cursor-not-allowed opacity-70" : "cursor-pointer"
              }`}
              onClick={() => submitConfirm()}
            >
              {confirmLoad ? (
                <div className="flex gap-2 items-center">
                  <div>Order Confirming</div>{" "}
                  <Spinner className="animate-spin w-[2rem] h-[2rem]" />
                </div>
              ) : (
                "Confirm this Order"
              )}
            </button>
          </>
        );
      default:
        break;
    }
  };
  return <div className="flex gap-4 self-end mt-8">{getButtons()}</div>;
};

export default ActionButtons;
