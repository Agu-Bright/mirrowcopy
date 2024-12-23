// components/TradingViewWidget.js
import { Typography } from "@node_modules/@mui/material";
import { useEffect, useState } from "react";

const TradingPairWidget = () => {
  const [symbol, setSymbol] = useState("EURUSD");
  const [interval, setInterval] = useState("D");

  const tradingPairs = [
    "EURUSD",
    "USDJPY",
    "GBPUSD",
    "AUDUSD",
    "NZDUSD",
    "USDCAD",
    "USDPLN",
  ];
  const timeframes = {
    D: "1 Day",
    W: "1 Week",
    M: "1 Month",
    "3M": "3 Months",
    "12M": "1 Year",
    "60M": "5 Years",
  };

  useEffect(() => {
    const scriptId = "tradingview-widget-script1";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.TradingView) {
          new window.TradingView.widget({
            symbol: symbol,
            interval: interval,
            theme: "dark",
            style: "1", // Candlestick style
            container_id: "tradingview-widget-container1",
            width: "100%",
            height: "100%",
            locale: "en",
            toolbar_bg: "rgba(0, 0, 0, 0)", // Transparent toolbar
            enable_publishing: false,
            hide_top_toolbar: true,
            hide_side_toolbar: true,
            allow_symbol_change: true,
            withdateranges: false,
            backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
            gridLineColor: "rgba(0, 0, 0, 0)", // Transparent grid
            isTransparent: true,
          });
        }
      };
    } else {
      if (window.TradingView) {
        new window.TradingView.widget({
          symbol: symbol,
          interval: interval,
          theme: "dark",
          style: "1",
          container_id: "tradingview-widget-container1",
          width: "100%",
          height: "100%",
          locale: "en",
          toolbar_bg: "rgba(0, 0, 0, 0)",
          enable_publishing: false,
          hide_top_toolbar: true,
          hide_side_toolbar: true,
          allow_symbol_change: true,
          withdateranges: false,
          backgroundColor: "rgba(0, 0, 0, 0)",
          gridLineColor: "rgba(0, 0, 0, 0)",
          isTransparent: true,
        });
      }
    }

    return () => {
      const widgetContainer = document.getElementById(
        "tradingview-widget-container1"
      );
      if (widgetContainer) {
        widgetContainer.innerHTML = "";
      }
    };
  }, [symbol, interval]);

  return (
    <div>
      <div className="controls flex justify-between">
        <label className="flex mt-2">
          <Typography className="text-white mr-2 bg-black rounded-2xl text-xs p-1">
            Trading Pair
          </Typography>
          <select
            className="text-black border-none rounded-lg"
            onChange={(e) => setSymbol(e.target.value)}
            value={symbol}
          >
            {tradingPairs.map((pair) => (
              <option key={pair} value={pair}>
                {pair}
              </option>
            ))}
          </select>
        </label>

        <label className="flex mt-2">
          <Typography className="text-white mr-2 bg-black rounded-2xl text-xs p-1">
            Interval
          </Typography>
          <select
            className="text-black border-none rounded-lg"
            onChange={(e) => setInterval(e.target.value)}
            value={interval}
          >
            {Object.entries(timeframes).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        className="tradingview-widget-container1"
        id="tradingview-widget-container1"
        style={{ height: "100%" }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export default TradingPairWidget;
