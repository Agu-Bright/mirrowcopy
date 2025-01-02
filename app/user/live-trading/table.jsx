import React from "react";

const MarketTradesTable = () => {
  const trades = [
    { time: "03:57:09", price: 40191, amount: 2298.6758, total: 7537 },
    { time: "03:48:08", price: 39810, amount: 9193.6961, total: 587 },
    { time: "03:48:07", price: 42000, amount: 3401.1169, total: 7222 },
    { time: "03:48:05", price: 40658, amount: 1326.1595, total: 7238 },
    { time: "03:47:09", price: 40658, amount: 3448.4315, total: 7664 },
    { time: "03:47:08", price: 40600, amount: 3001.6411, total: 856 },
    { time: "03:47:06", price: 40658, amount: 4413.4369, total: 7693 },
    { time: "03:46:32", price: 40658, amount: 3928.8634, total: 3977 },
    { time: "03:45:31", price: 40570, amount: 9789.1403, total: 9683 },
    { time: "03:44:10", price: 40170, amount: 9396.3306, total: 2846 },
    { time: "03:43:39", price: 40570, amount: 9317.4493, total: 7484 },
    { time: "03:43:20", price: 40170, amount: 2066.4724, total: 6568 },
    { time: "03:42:41", price: 40670, amount: 6051.2282, total: 3924 },
    { time: "03:00:33", price: 41000, amount: 300.1891, total: 700 },
  ];

  return (
    <div
      style={{ background: "#242731" }}
      className=" p-4 sm:p-6 rounded-lg shadow-lg text-white mt-8"
    >
      <div className="flex justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Market Trades</h2>
        <div className="flex flex-wrap space-x-2 sm:space-x-4">
          <button className="text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 bg-blue-700 rounded-md hover:bg-blue-600">
            Price Chart
          </button>
          <button className="text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 bg-gray-800 rounded-md hover:bg-gray-700">
            Deep Chart
          </button>
          <button className="text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 bg-gray-800 rounded-md hover:bg-gray-700">
            Open Orders
          </button>
          <button className="text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 bg-gray-800 rounded-md hover:bg-gray-700">
            Favorites
          </button>
        </div>
      </div>

      <table className="w-full table-auto text-xs sm:text-sm mb-2">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-2 sm:px-4 py-1 sm:py-2">TIME</th>
            <th className="px-2 sm:px-4 py-1 sm:py-2">PRICE (USDT)</th>
            <th className="px-2 sm:px-4 py-1 sm:py-2">AMOUNT (BTC)</th>
            <th className="px-2 sm:px-4 py-1 sm:py-2">TOTAL (USDT)</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr
              key={index}
              className={`border-b border-gray-700 ${
                index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
              }`}
            >
              <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                {trade.time}
              </td>
              <td
                className={`px-2 sm:px-4 py-1 sm:py-2 font-semibold text-xs sm:text-sm ${
                  trade.price > 40500 ? "text-green-500" : "text-red-500"
                } truncate`}
              >
                {trade.price}
              </td>
              <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm truncate">
                {trade.amount.toFixed(4)}
              </td>
              <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm truncate">
                {trade.total.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTradesTable;
