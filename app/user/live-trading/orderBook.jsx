import React from "react";

const OrderBook = () => {
  // Sample data for the order book
  const sellOrders = [
    { price: "18446.62230935", amount: "5.43268623", total: "5.43268623" },
    { price: "18446.62230935", amount: "0.254878", total: "5.43268623" },
    { price: "18446.62230935", amount: "5.43268623", total: "5.43268623" },
    { price: "18446.62230935", amount: "0.426823", total: "5.43268623" },
    { price: "18446.62230935", amount: "5.43268623", total: "5.43268623" },
    { price: "18446.62230935", amount: "0.3268", total: "5.43268623" },
  ];

  const buyOrders = [
    { price: "18446.62230935", amount: "5.43268623", total: "5.43268623" },
    { price: "18446.62230935", amount: "0.254878", total: "5.43268623" },
    { price: "18446.62230935", amount: "5.43268623", total: "5.43268623" },
    { price: "18446.62230935", amount: "0.426823", total: "5.43268623" },
    { price: "18446.62230935", amount: "5.43268623", total: "5.43268623" },
    { price: "18446.62230935", amount: "0.3268", total: "5.43268623" },
  ];

  return (
    <div
      style={{ background: "#242731" }}
      className=" text-white rounded-lg p-4 shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Order Book</h3>
        <div className="flex space-x-2">
          <button className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600">
            <span className="text-sm text-gray-300">=</span>
          </button>
          <button className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600">
            <span className="text-sm text-gray-300">≡</span>
          </button>
          <button className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600">
            <span className="text-sm text-gray-300">↔</span>
          </button>
        </div>
      </div>

      <div className="max-w-full">
        {/* Sell Orders */}
        <table className="w-full text-xs sm:text-sm mb-2">
          <thead>
            <tr>
              <th className="text-left px-2 py-1 sm:px-4 sm:py-2">
                PRICE (USDT)
              </th>
              <th className="text-left px-2 py-1 sm:px-4 sm:py-2">
                AMOUNT (BTC)
              </th>
              <th className="text-left px-2 py-1 sm:px-4 sm:py-2">
                TOTAL (USDT)
              </th>
            </tr>
          </thead>
          <tbody>
            {sellOrders.map((order, index) => (
              <tr
                key={index}
                className="hover:bg-gray-700 transition duration-150"
              >
                <td className="px-2 py-1 sm:px-4 sm:py-2 text-red-500 truncate">
                  {order.price}
                </td>
                <td className="px-2 py-1 sm:px-4 sm:py-2 truncate">
                  {order.amount}
                </td>
                <td className="px-2 py-1 sm:px-4 sm:py-2 truncate">
                  {order.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mid Price */}
        <div className="text-center text-xs sm:text-lg font-bold py-1 sm:py-2 bg-gray-700 rounded-md mb-2">
          18372.54657323 USDT
        </div>

        {/* Buy Orders */}
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr>
              <th className="text-left px-2 py-1 sm:px-4 sm:py-2">
                PRICE (USDT)
              </th>
              <th className="text-left px-2 py-1 sm:px-4 sm:py-2">
                AMOUNT (BTC)
              </th>
              <th className="text-left px-2 py-1 sm:px-4 sm:py-2">
                TOTAL (USDT)
              </th>
            </tr>
          </thead>
          <tbody>
            {buyOrders.map((order, index) => (
              <tr
                key={index}
                className="hover:bg-gray-700 transition duration-150"
              >
                <td className="px-2 py-1 sm:px-4 sm:py-2 text-green-500 truncate">
                  {order.price}
                </td>
                <td className="px-2 py-1 sm:px-4 sm:py-2 truncate">
                  {order.amount}
                </td>
                <td className="px-2 py-1 sm:px-4 sm:py-2 truncate">
                  {order.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderBook;
