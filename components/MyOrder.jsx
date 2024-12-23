import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const MyOrder = () => {
  return (
    <Box
      className="rounded-xl"
      sx={{
        width: { md: "33%", xs: "100%" },
        padding: "10px",
        background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
      }}
    >
      <Box>
        <Typography
          className="rounded-xl"
          style={{
            textAlign: "center",
            color: "white",
            background: "black",
          }}
        >
          My Orders
        </Typography>
        <Box
          sx={{
            height: "55vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box>
            <Image src="/img/empty.png" alt="empty" width={75} height={75} />
          </Box>
          <Typography className="text-gray-300 text-sm">
            You currently have no order
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MyOrder;
