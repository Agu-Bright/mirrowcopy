import { Box, Typography } from "@mui/material";
import { useRouter } from "@node_modules/next/navigation";
import React, { useEffect, useState } from "react";

const Buy = ({ title }) => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setCurrentDate(formattedDate);
  }, []);
  return (
    <Box
      className="rounded-xl"
      sx={{
        width: { md: "33%", xs: "100%" },
        padding: "10px",
        background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          className="rounded-xl"
          style={{
            textAlign: "center",
            color: "white",
            background: "black",
            width: "100%",
          }}
        >
          {title}
        </Typography>
        <Box
          className="mt-3 p-2 rounded-xl bg-blue-950 bg-opacity-50"
          sx={{
            width: "95%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ height: "55vh", width: "100%" }}>
            <Box sx={{ width: "100%" }} className="mt-3">
              <Typography className="text-gray-200 text-sm">
                {" "}
                Currency
              </Typography>
              <select
                style={{ width: "100%" }}
                className="rounded-2xl bg-gray-400 text-white py-1"
              >
                <option>JAPANESE YUEN - JPY </option>
                <option>GREAT BRITAIN POUNDS - GBP </option>
                <option>AUSTRAILIAN DOLLAR - AUD </option>
                <option>NEW ZEALAND DOLLAR - NZD </option>
                <option>CANADIAN DOLLAR - CAN </option>
                <option>POLISH ZLOTY - PLN </option>
              </select>
            </Box>
            <Box className="mt-3">
              <Typography className="text-gray-200 text-sm">
                {" "}
                Lot size
              </Typography>
              <select
                style={{ width: "100%" }}
                className="rounded-2xl bg-gray-400 text-white py-1"
              >
                <option>MICRO LOT - 1000 </option>
                <option>MINI LOT - 10,000 </option>
                <option>STANDARD LOT - 100,000</option>
              </select>
            </Box>
            <Box className="mt-3">
              <Typography className="text-gray-200 text-sm">
                {" "}
                Stake Capital
              </Typography>
              <input
                type="number"
                style={{ width: "100%" }}
                className="rounded-2xl bg-gray-400 text-white py-1"
              />
            </Box>
            <Box className="mt-3">
              <Typography className="text-gray-200 text-sm"> Expiry</Typography>
              <input
                type="date"
                value={currentDate}
                style={{ width: "100%" }}
                className="rounded-2xl bg-gray-400 text-white py-1"
              />
            </Box>
            {title === "Buy" && (
              <button
                onClick={() => router.push("/user/investment")}
                className="mt-4 rounded-2xl bg-green-600 py-2 w-[100%] text-gray-300"
              >
                PLACE BUY ORDER
              </button>
            )}
            {title === "Sell" && (
              <button
                onClick={() => router.push("/user/investment")}
                className="mt-4 rounded-2xl bg-red-600 py-2 w-[100%] text-gray-300"
              >
                PLACE SELL ORDER
              </button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Buy;
