import React from "react";
import OrderBook from "./orderBook";

const TradingDashboard = () => {
  return (
    <div
      style={{ background: "#242731" }}
      className=" text-white min-h-screen p-6 mt-4"
    >
      {/* Tabs */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        {/* Buttons Section */}
        <div className="flex space-x-4 sm:space-x-6 mb-4 sm:mb-0">
          <button className="px-4 py-2 bg-blue-700 rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-600 w-auto">
            Price Chart
          </button>
          <button className="px-4 py-2 bg-gray-800 rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-700 w-auto">
            Deep Chart
          </button>
        </div>

        {/* Time and Additional Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-xs sm:text-sm">30m</span>
          <button className="px-4 py-2 bg-gray-800 rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-700 w-auto">
            Indicator
          </button>
          <button className="px-4 py-2 bg-gray-800 rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-700 w-auto">
            ↔
          </button>
        </div>
      </div>

      {/* Notice */}
      <div
        style={{ background: "#213126" }}
        className=" rounded-lg px-4 py-6 mb-6 text-center shadow-md"
      >
        <h2 className="font-bold text-lg">Notice! Notice!! Notice!!!</h2>
        <p className="mt-2">
          Hello <span className="font-bold">bright</span>, you are not eligible
          to view livestream of ongoing trade. Kindly contact your trader or
          support.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div
          style={{ background: "#242731" }}
          className="lg:col-span-2  rounded-lg p-4 shadow-md"
        >
          <div className="bg-black h-[400px] flex items-center justify-center rounded-md">
            {/* <span className="text-gray-500 text-lg">Chart Placeholder</span> */}
            <img
              src="https://www.financemagnates.com/wp-content/uploads/2017/04/58ff2167038a9.gif"
              width="100%"
            ></img>
          </div>
        </div>

        {/* Order Book Section */}
        <OrderBook />
      </div>
    </div>
  );
};

export default TradingDashboard;
