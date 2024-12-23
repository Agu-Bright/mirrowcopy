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
import KYCPage from "@components/Kyc";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const { myWallet, formatMoney, setSideBar2, setGlobalCat } =
    useContext(RestaurantContext);

  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
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
  }, []);

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
                src="/img/check.png"
                alt="deposit"
                width={50}
                height={50}
                className="mr-2"
              />
              <Typography className="text-white text-4xl font-extrabold">
                KYC Verification
              </Typography>
            </Box>
            <Box className="w-[100%] mt-4">
              <Typography>
                To comply with regulation each participant will have to go
                through indentity verification (KYC/AML) to prevent fraud
                causes.
              </Typography>
              <KYCPage />
            </Box>
          </Stack>
        </Box>
      </NavPage>
    );
}
