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
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const { myWallet, formatMoney, setSideBar2, setGlobalCat } =
    useContext(RestaurantContext);

  const [active, setActive] = useState("deposit");
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    active === "deposit" &&
      (async () => {
        try {
          const { data } = await axios.get("/api/deposit/get-my-deposits");
          console.log("deposits", data);
          setDeposits(data?.deposits.reverse());
        } catch (error) {
          toast.error(error?.response?.data?.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      })();
  }, [active]);

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
                src="/img/dollar-symbol.png"
                alt="deposit"
                width={50}
                height={50}
                className="mr-2"
              />
              <Typography className="text-white text-2xl">
                Account History
              </Typography>
            </Box>
            <Box
              sx={{
                wdth: "100%",
                overflowY: "scroll",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Stack direction="row">
                <Typography
                  onClick={() => setActive("deposit")}
                  className={
                    active === "deposit"
                      ? "text-black bg-white rounded-xl mr-2 cursor-pointer p-1"
                      : "text-white mr-2 cursor-pointer p-1"
                  }
                >
                  Deposit History
                </Typography>
                <Typography
                  onClick={() => setActive("earning")}
                  className={
                    active === "earning"
                      ? "text-black bg-white rounded-xl mr-2 cursor-pointer p-1"
                      : "text-white mr-2 cursor-pointer p-1"
                  }
                >
                  Earning History
                </Typography>
                <Typography
                  onClick={() => setActive("withdrawal")}
                  className={
                    active === "withdrawal"
                      ? "text-black bg-white rounded-xl mr-2 cursor-pointer p-1"
                      : "text-white mr-2 cursor-pointer p-1"
                  }
                >
                  Wihdrawal History
                </Typography>
                <Typography
                  onClick={() => setActive("trading")}
                  className={
                    active === "trading"
                      ? "text-black bg-white rounded-xl mr-2 cursor-pointer p-1"
                      : "text-white mr-2 cursor-pointer p-1"
                  }
                >
                  Trading History
                </Typography>
              </Stack>
            </Box>
            <Box className="w-[100%] mt-4">
              {active === "deposit" && (
                <Card title="Deposits" type="deposit" deposits={deposits} />
              )}
              {active === "earning" && (
                <Card title="Earning History" type="earning" />
              )}
              {active === "withdrawal" && (
                <Card title="Withdrawal History" type="withdrawal" />
              )}
              {active === "trading" && (
                <Card title="Trading History" type="trading" />
              )}
            </Box>
          </Stack>
        </Box>
      </NavPage>
    );
}
