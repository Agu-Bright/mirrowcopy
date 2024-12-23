import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const CryptoMarketData = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/getCoin");
        setMarketData(data?.responses);
        console.log("data", data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        console.error("Error fetching market data:", error);
      }
    };

    fetchMarketData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <table
        border="1"
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
      >
        <tbody>
          {marketData.map((coin) => (
            <>
              <tr key={coin.symbol} className="text-white mt-2">
                <td>
                  <img
                    src={coin.image}
                    alt={coin.name}
                    width="500"
                    height="500"
                  />
                </td>
                <td>{coin.name}</td>
                <td>{coin.symbol}</td>
                <td>${coin.currentPrice.toLocaleString()}</td>
                <td
                  style={{
                    color: coin.priceChangePercentage >= 0 ? "green" : "red",
                  }}
                >
                  {coin.priceChangePercentage.toFixed(2)}%
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoMarketData;
