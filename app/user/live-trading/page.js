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
          <Stack
            direction={{ md: "row", xs: "column" }}
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Box
              sx={{
                width: { md: "65%", xs: "100%" },
                height: "92.3vh",
                overflowY: "scroll",
              }}
            >
              <Stack
                direction={{ md: "row", xs: "column" }}
                sx={{ height: { md: "63vh", xs: "auto" } }}
                justifyContent="space-between"
              >
                <Box
                  sx={{
                    width: { md: "65%", xs: "100%" },
                    height: "100%",
                    paddingTop: { md: "0px", xs: "20px" },
                  }}
                >
                  <Box
                    className="rounded-xl"
                    sx={{
                      height: "100%",
                      overflowY: "scroll",
                      border: "1px solid black",
                      padding: "10px",
                      background:
                        "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
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
                        Trading Pairs
                      </Typography>
                      <Box sx={{ height: "52vh" }}>
                        <TradingPairWidget />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Stack>
              <Stack
                className="mt-2"
                direction={{ md: "row", xs: "column" }}
                justifyContent="space-between"
              >
                <MyOrder />
                <Buy title="Buy" />
                <Buy title="Sell" />
              </Stack>
            </Box>
            <Box
              sx={{
                borderRadius: "10px",
                width: { md: "34%", xs: "100%" },
                background:
                  "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
                paddingTop: { md: "0px", xs: "20px" },
                height: { md: "90vh", xs: "80vh" },
              }}
            >
              <MarketNews />
            </Box>
          </Stack>
        </Box>
      </NavPage>
    );
}
