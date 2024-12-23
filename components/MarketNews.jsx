"use client";

import { useEffect } from "react";

const MarketNews = () => {
  useEffect(() => {
    const containerId = "tradingview-widget-container5";
    const scriptId = "tradingview-widget-script5";

    // Check if the script is already added
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.async = true;

      // Widget configuration
      script.innerHTML = JSON.stringify({
        colorTheme: "dark",
        isTransparent: true,
        width: "100%",
        height: "100%",
        locale: "en",
      });

      const container = document.getElementById(containerId);

      if (container) {
        container.appendChild(script);
      } else {
        console.error("Container not found for TradingView widget.");
      }
    }
  }, []);

  return (
    <div id="tradingview-widget-container5" style={{ height: "100%" }}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default MarketNews;
