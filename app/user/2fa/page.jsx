"use client";
import NavPage from "@components/navPage/NavPage";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import React from "react";
import Image from "next/image";
import { RestaurantContext } from "@context/RestaurantContext";
import TradingViewWidget from "@components/TradingViewWidget";
import TradingPairWidget from "@components/TradingPairWidget";
import MyOrder from "@components/MyOrder";
import Buy from "@components/Buy";
import MarketNews from "@components/MarketNews";
import TwoFactorAuth from "./designT";

const Topic = ({ title, src }) => {
  return (
    <div>
      <Image src={src} alt="img" width={30} height={30} />
      <span style={{ marginLeft: "10px" }}>{title}</span>
    </div>
  );
};

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#161722",
        }}
      >
        <CircularProgress className="text-gray-400" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else
    return (
      <NavPage>
        <Box sx={{ height: "100%", width: "100%", paddingBottom: "15px" }}>
          <TwoFactorAuth />
        </Box>
      </NavPage>
    );
}
