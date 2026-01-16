import dayjs from "dayjs";

const OrderHistory = ({ history }) => {
  return (
    <div className="a-text--body mt-8">
      {history.map((item, i) => (
        <div className="py-4 first:pt-0 last:pb-0 last:border-b-0 border-b border-neutral-300">
          <div className="capitalize font-semibold">{item.status}</div>
          <div className="flex justify-between items-center">
            <div>{`Date : ${dayjs(item.date).format("DD MMMM, YYYY")}`}</div>
            <div>{`Time : ${dayjs(item.date).format("hh:mm a")}`}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
