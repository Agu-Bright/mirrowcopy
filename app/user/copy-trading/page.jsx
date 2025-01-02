"use client";
import React from "react";
import NavPage from "@components/navPage/NavPage";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Grid,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
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
import TraderCard from "@components/TraderCard";
import LinearProgress from "@mui/material/LinearProgress";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const { myWallet, formatMoney, setSideBar2, setGlobalCat } =
    useContext(RestaurantContext);
  const [active, setActive] = useState(null);

  const [traders, setTraders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/get-traders");
        setTraders(data?.traders);
        setLoading(false);
      } catch (error) {
        console.log("cant get traders");
        setLoading(false);
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
            {/* <Box className="flex align-middle ">
              <Image
                src="/img/check.png"
                alt="deposit"
                width={50}
                height={50}
                className="mr-2"
              />
              <Typography className="text-white text-4xl font-extrabold">
                Expert Traders{" "}
              </Typography>
            </Box> */}

            <div
              style={{ background: "#242731", border: "0.1px solid gray" }}
              class=" text-white w-[100%] p-6 rounded-lg mb-8 mt-10"
            >
              <div class="grid grid-cols-3 gap-4">
                <div class="flex flex-col">
                  <span class="text-sm">Total CopyTrade</span>
                  <span class="text-lg font-semibold">$0.00</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm">Total Profit</span>
                  <span class="text-lg font-semibold">$0.00</span>
                </div>
                <div class="flex justify-end items-center">
                  <a
                    href="/user/copy-traders"
                    class="text-purple-500 hover:underline text-sm font-semibold"
                  >
                    CopyTrade Now →
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{ background: "#242731" }}
              class=" text-white w-[100%] p-6 rounded-lg shadow-md"
            >
              <h2 class="text-lg font-semibold mb-4">History</h2>
              {/* <!-- History Table --> */}
              <div class="grid grid-cols-5 gap-2 text-center mt-4">
                <div class="text-gray-400">Progress</div>
                <div class="text-gray-400">Plan Name</div>
                <div class="text-gray-400">Details</div>
                <div class="text-gray-400">Amount</div>
                <div class="text-gray-400">Start Date / Next Return</div>
              </div>
              {/* <!-- No Data Section --> */}
              <div class="bg-gray-900 p-4 rounded-lg text-center">
                <span class="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-6 h-6 mb-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.75 9.75h-.008v.008h.008v-.008zm4.5 0h-.008v.008h.008v-.008zm-2.25 9v-3.75m0-3.75v-3.75m12 3.75c0 6.075-4.925 11-11 11S1 18.825 1 12.75C1 6.675 5.925 1.75 11.5 1.75S23 6.675 23 12.75zm-11.25 0a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                  </svg>
                  <span class="text-gray-400">Data not found</span>
                </span>
              </div>
            </div>
          </Stack>
        </Box>
      </NavPage>
    );
}
