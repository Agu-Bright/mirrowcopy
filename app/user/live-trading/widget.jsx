import React, { useEffect, useRef } from "react";

const TradingViewTicker = () => {
  const widgetContainerRef = useRef(null);

  useEffect(() => {
    // Create and append the TradingView script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;

    // Define the TradingView widget configuration
    script.onload = () => {
      if (widgetContainerRef.current) {
        const widgetConfig = {
          symbols: [
            { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
            { proName: "FOREXCOM:NSXUSD", title: "US 100" },
            { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
            { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
            { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
            { proName: "NASDAQ:AAPL", title: "Apple" },
            { proName: "NASDAQ:TSLA", title: "Tesla" },
          ],
          showSymbolLogo: true,
          colorTheme: "dark", // Ensure the dark theme
          isTransparent: true,
          displayMode: "adaptive",
          locale: "en",
        };

        // Inject the widget configuration into the container
        const scriptConfig = document.createElement("script");
        scriptConfig.type = "application/json";
        scriptConfig.text = JSON.stringify(widgetConfig);
        widgetContainerRef.current.appendChild(scriptConfig);
      }
    };

    // Append the script to the container
    if (widgetContainerRef.current) {
      widgetContainerRef.current.appendChild(script);
    }

    return () => {
      // Cleanup the widget container
      if (widgetContainerRef.current) {
        widgetContainerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={widgetContainerRef}
      style={{
        width: "100%",
        overflowX: "auto",
        backgroundColor: "#121212",
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      {/* Placeholder text while the widget loads */}
      <p style={{ color: "#ffffff", textAlign: "center" }}>Loading Ticker...</p>
    </div>
  );
};

export default TradingViewTicker;
