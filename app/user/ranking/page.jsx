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
          <div class=" text-white py-8 px-4 ">
            <div
              style={{ background: "#242731" }}
              class="max-w-4xl mx-auto border border-gray-700 rounded-lg p-4 mb-8"
            >
              <div class="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                <div>
                  <h3 class="text-xl font-semibold">My Invest</h3>
                  <p class="text-blue-400">$0.00 / $300.00</p>
                  <p class="text-gray-400">$300.00 To unlock</p>
                </div>
                <div>
                  <h3 class="text-xl font-semibold">No. of Direct Referral</h3>
                  <p class="text-blue-400">0 / 2</p>
                </div>
                <div>
                  <h3 class="text-xl font-semibold">Team Invest</h3>
                  <p class="text-blue-400">$0.00 / $400.00</p>
                </div>
                <div>
                  <h3 class="text-xl font-semibold">Bonus</h3>
                  <p class="text-blue-400">$50.00</p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div
                style={{ background: "#242731" }}
                class="border border-gray-700 rounded-lg p-4 text-center"
              >
                <div class="mb-4">
                  <img
                    src="https://copymoon.net/assets/images/user_rankings/6665c73899e191717946168.png"
                    alt="Silver Badge"
                    class="mx-auto w-16 h-16"
                  />
                </div>
                <h3 class="text-xl font-semibold mb-2">Silver</h3>
                <p class="text-sm">Level: 1</p>
                <p class="text-sm">Minimum Deposit: $300.00</p>
                <p class="text-sm">Direct Referral: 2</p>
                <p class="text-sm">Referral Deposits: $400.00</p>
                <p class="text-sm text-blue-400">Bonus: $50.00</p>
              </div>

              <div
                style={{ background: "#242731" }}
                class="border border-gray-700 rounded-lg p-4 text-center"
              >
                <div class="mb-4">
                  <img
                    src="/img/gold.png"
                    alt="Silver Pro Badge"
                    class="mx-auto w-16 h-16"
                  />
                </div>
                <h3 class="text-xl font-semibold mb-2">Silver Pro</h3>
                <p class="text-sm">Level: 2</p>
                <p class="text-sm">Minimum Deposit: $1,000.00</p>
                <p class="text-sm">Direct Referral: 10</p>
                <p class="text-sm">Referral Deposits: $5,000.00</p>
                <p class="text-sm text-blue-400">Bonus: $500.00</p>
              </div>

              <div
                style={{ background: "#242731" }}
                class="border border-gray-700 rounded-lg  p-4 text-center"
              >
                <div class="mb-4">
                  <img
                    src="path/to/gold-icon.png"
                    alt="Gold Badge"
                    class="mx-auto w-16 h-16"
                  />
                </div>
                <h3 class="text-xl font-semibold mb-2">Gold</h3>
                <p class="text-sm">Level: 3</p>
                <p class="text-sm">Minimum Deposit: $5,000.00</p>
                <p class="text-sm">Direct Referral: 20</p>
                <p class="text-sm">Referral Deposits: $10,000.00</p>
                <p class="text-sm text-blue-400">Bonus: $10,000.00</p>
              </div>
            </div>
          </div>
        </Box>
      </NavPage>
    );
}
