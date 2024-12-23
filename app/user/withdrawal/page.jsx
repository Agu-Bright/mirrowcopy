"use client";
import React from "react";
import NavPage from "@components/navPage/NavPage";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { RestaurantContext } from "@context/RestaurantContext";
import Card from "@components/Card";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const { myWallet, formatMoney, setSideBar2, setGlobalCat } =
    useContext(RestaurantContext);

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
        <CircularProgress style={{ color: "white" }} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/user/login");
  } else
    return (
      <NavPage>
        <Box sx={{ height: "100%" }}>
          <Stack direction="column" justifyContent="space-between">
            <Box className="flex align-middle ">
              <Image
                src="/img/money-withdrawal.png"
                alt="deposit"
                width={50}
                height={50}
                className="mr-2"
              />
              <Typography className="text-white text-2xl">
                Withdrawal{" "}
              </Typography>
            </Box>
            <Box className="w-[100%] mt-4">
              <Stack
                direction={{ md: "row", xs: "column" }}
                justifyContent="space-between"
              >
                <Box sx={{ width: { md: "48%", xs: "100%", height: "50vh" } }}>
                  <Card title="ACCOUNT BALANCE" type="balance" />
                </Box>
                <Box sx={{ width: { md: "48%", xs: "100%", height: "50vh" } }}>
                  <Card title="MAKE WITHDRAWAL" type="withdrawal" />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </NavPage>
    );
}
