"use client";

import { useState } from "react";
import Search from "./Search";
import Content from "./Content";
import useOrders from "./useOrders";

const Orders = () => {
  let [input, setInput] = useState("");
  let [query, setQuery] = useState("");

  let { orders } = useOrders(query);

  return (
    <main className="space-y-8">
      <Search
        input={input}
        setInput={setInput}
        submitQuery={() => setQuery(input)}
      />
      <Content orders={orders} />
    </main>
  );
};

export default Orders;
