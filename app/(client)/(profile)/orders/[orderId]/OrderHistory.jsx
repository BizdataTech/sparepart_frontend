import dayjs from "dayjs";

const OrderHistory = ({ history }) => {
  const getColor = (status) => {
    if (status === "cancelled") return "#a82424";
    return "#0e611a";
  };
  return (
    <div>
      {history &&
        history.map((event) => (
          <div
            style={{ color: getColor(event.status) }}
            className="bg-neutral-50 p-4"
          >
            <div className="capitalize font-semibold">{event.status}</div>
            <div className="flex justify-between items-center">
              <div>{dayjs(event.date).format("Do MMMM, YYYY")}</div>
              <div>{dayjs(event.date).format("hh:mm a")}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderHistory;
