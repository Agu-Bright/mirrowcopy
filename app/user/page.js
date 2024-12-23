"use client";
import LiveChatScript from "@components/LiveChat";
import NavPage from "@components/navPage/NavPage";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

import TableList from "./Table";

import React from "react";
import Image from "next/image";
import { RestaurantContext } from "@context/RestaurantContext";
import TradingViewWidget from "@components/TradingViewWidget";
import TradingPairWidget from "@components/TradingPairWidget";
import MyOrder from "@components/MyOrder";
import Buy from "@components/Buy";
import MarketNews from "@components/MarketNews";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { formatMoney, myWallet } = useContext(RestaurantContext);

  const [btc, setBtc] = useState("");

  useEffect(() => {
    myWallet &&
      (async () => {
        try {
          const response = await axios.get(
            "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
          );
          const btcPriceInUSD = response.data.bpi.USD.rate_float;
          // Calculate the equivalent BTC amount
          const btcEquivalent = Number(myWallet?.balance) / btcPriceInUSD;
          setBtc(btcEquivalent.toFixed(8));
        } catch (error) {
          console.error("Error fetching BTC price:", error.message);
        }
      })();
  }, [myWallet]);

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
        <Box
          sx={{
            width: "100%",
            height: "92.3vh",
            overflowY: "scroll",
          }}
        >
          <Stack direction="column" sx={{ width: "100%", marginTop: "30px" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                background: "#705C3D",
                border: "2px dotted #CBA055",
                padding: "30px 15px",
                borderRadius: "10px",
              }}
            >
              <Typography
                sx={{
                  color: "#E8FFFF",
                  fontSize: { md: "1.2em", xs: "0.8em" },
                }}
              >
                Empty Balance! Your balance is empty. Please make{" "}
                <a href="/user/deposit" className="text-gray-700">
                  Deposit
                </a>{" "}
                for your next investment.
              </Typography>
              <Box>
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                background: "#705C3D",
                border: "2px dotted #CBA055",
                padding: "30px 15px",
                borderRadius: "10px",
                marginTop: "15px",
              }}
            >
              <Typography
                sx={{
                  color: "#E8FFFF",
                  fontSize: { md: "1.2em", xs: "0.8em" },
                }}
              >
                KYC Verification Required! Please submit the required KYC
                information to verify yourself. Otherwise, you couldn't make any
                withdrawal requests to the system.{" "}
                <a href="/user/kyc" className="text-gray-700">
                  click here
                </a>{" "}
                to submit KYC information.
              </Typography>
              <Box>
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Stack>
          </Stack>
          <Box className="mt-5 rounded-xl min-h-[60vh] sm:min-h-[50vh] mb-5 relative bg-[#242731] z-10">
            <Box
              className="absolute left-1/2 transform -translate-x-1/2 rounded-xl h-[100%] w-[99%] bottom-[-10px] z-0"
              sx={{
                background: "#21242D",
                padding: { md: "30px", xs: "10px" },
              }}
            >
              <Stack
                direction="column"
                justifyContent="space-between"
                sx={{ height: "100%" }}
              >
                <Stack
                  direction={{ md: "row", xs: "column" }}
                  justifyContent="space-between"
                  sx={{ height: "50%" }}
                >
                  <Box sx={{ width: { md: "50%", xs: "100%" } }}>
                    <Typography className="text-white text-3xl font-semibold">
                      Total Balance
                    </Typography>
                    <Typography className="text-white text-4xl font-semibold mt-3">
                      {formatMoney(myWallet?.balance)}
                      <span
                        style={{ background: "#FF9F38" }}
                        className=" ml-2 rounded-3xl px-4 py-2 "
                      >
                        USD
                      </span>
                    </Typography>
                    <Typography
                      sx={{ color: "#808191" }}
                      className="text-4xl font-semibold mt-3"
                    >
                      {btc} BTC
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: { md: "50%", xs: "100%" },
                      marginTop: { md: "", xs: "10px" },
                    }}
                    className="px-4  md:px-0"
                  >
                    <Box>
                      <Stack
                        direction="row"
                        justifyContent={{ md: "flex-end", xs: "space-between" }}
                      >
                        <button
                          onClick={() => router.push("/user/kyc")}
                          className="text-white flex row bg-blue-600 px-4 py-2 rounded-2xl hover:bg-transparent hover:border-blue-600 hover:border-2 mr-5"
                          style={{ alignItems: "center" }}
                        >
                          <Box
                            sx={{
                              width: { md: "50px", xs: "25px" },
                              height: { md: "50px", xs: "25px" },
                            }}
                          >
                            <img
                              src="/img/exit.png"
                              alt="deposit"
                              style={{ width: "100", height: "100%" }}
                            />
                          </Box>
                          <Typography className="text-white text-xs md:text-xl">
                            Withdraw
                          </Typography>
                        </button>
                        <button
                          onClick={() => router.push("/user/deposit")}
                          className="text-white flex row bg-transparent px-4 py-2 rounded-2xl hover:bg-transparent border-blue-600 border-2"
                          style={{ alignItems: "center" }}
                        >
                          <Box
                            sx={{
                              width: { md: "50px", xs: "25px" },
                              height: { md: "50px", xs: "25px" },
                            }}
                          >
                            <img
                              src="/img/exit.png"
                              alt="deposit"
                              style={{ width: "100", height: "100%" }}
                            />
                          </Box>
                          <Typography className="text-blue-600 text-xl">
                            Deposit
                          </Typography>
                        </button>
                      </Stack>
                      <Box
                        sx={{
                          display: { md: "flex", xs: "none" },
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          marginTop: "15px",
                        }}
                      >
                        <Typography className="mr-4 text-white text-2xl">
                          Your current Rank:{" "}
                          <span className="font-extrabold">Sylver</span>{" "}
                        </Typography>
                        <Image
                          src="/img/silver-medal.png"
                          alt="silver"
                          width={100}
                          height={100}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Stack>

                <Stack
                  sx={{
                    height: "auto",
                    padding: "10px",
                    marginTop: { md: "0px", xs: "70px" },
                  }}
                  direction={{ md: "row", xs: "column" }}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    sx={{
                      width: { md: "45%", xs: "100%" },
                      border: "0.1px solid gray",
                      borderRadius: "10px",
                      padding: "25px 15px",
                      marginBottom: { md: "", xs: "10px" },
                    }}
                  >
                    <Stack direction="row">
                      <Image
                        src="/img/dot2.png"
                        alt="deposit"
                        width={50}
                        height={50}
                        className="mr-4"
                      />
                      <Box>
                        <Typography
                          sx={{ color: "#808191", fontSize: "1.2em" }}
                        >
                          Deposit wallet{" "}
                        </Typography>
                        <Typography sx={{ color: "white" }}>$0.00</Typography>
                      </Box>
                    </Stack>
                  </Box>{" "}
                  <Box
                    sx={{
                      width: { md: "45%", xs: "100%" },
                      border: "0.1px solid gray",
                      borderRadius: "10px",
                      padding: "25px 15px",
                    }}
                  >
                    <Stack direction="row">
                      <Image
                        src="/img/dot1.png"
                        alt="deposit"
                        width={50}
                        height={50}
                        className="mr-4"
                      />
                      <Box>
                        <Typography
                          sx={{ color: "#808191", fontSize: "1.2em" }}
                        >
                          Interest Balance
                        </Typography>
                        <Typography sx={{ color: "white" }}>$0.00</Typography>
                      </Box>
                    </Stack>
                  </Box>{" "}
                </Stack>
              </Stack>
            </Box>
          </Box>

          <Stack
            direction={{ md: "row", xs: "column" }}
            justifyContent="space-between"
          >
            <Box sx={{ width: { md: "65%", xs: "100%" } }}>
              <Stack
                direction="column"
                spacing={2}
                justifyContent="space-between"
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box
                    className="rounded-xl"
                    sx={{
                      height: "100%",
                      overflowY: "scroll",
                      padding: "10px",
                      background: "#21242D",
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
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box
                    className="rounded-xl"
                    sx={{
                      height: "100%",
                      overflowY: "scroll",
                      padding: "10px",
                      background: "#21242D",
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
                        Trending{" "}
                      </Typography>
                      <TradingViewWidget />
                    </Box>
                  </Box>
                </Box>
              </Stack>
              {/* <Stack
                className="mt-2"
                direction={{ md: "row", xs: "column" }}
                justifyContent="space-between"
              >
                <MyOrder />
                <Buy title="Buy" />
                <Buy title="Sell" />
              </Stack> */}
            </Box>
            <Box sx={{ width: { md: "34%", xs: "100%" } }}>
              <Stack spacing={2} direction="column" alignItems="center">
                <Typography className="text-center text-xl">
                  Your Current Server
                </Typography>
                <Box
                  sx={{
                    padding: "10px",
                    width: "300px",
                    height: "250px",
                    backgroundColor: "#242731",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    src="/img/discord.png"
                    alt="server"
                    width={100}
                    height={100}
                  />
                  <Typography>Server 1</Typography>
                  <Stack direction="row" justifyContent="space-between">
                    {[1, 2, 3, 4, 5].map((item, index) => {
                      return (
                        <Image
                          src="/img/star.png"
                          alt="server"
                          width={30}
                          height={30}
                        />
                      );
                    })}
                  </Stack>
                </Box>
                <Typography className="text-center text-xl">
                  Unlock New Rank{" "}
                </Typography>
                <Box
                  sx={{
                    padding: "10px",
                    width: "300px",
                    height: "250px",
                    backgroundColor: "#242731",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    src="/img/silver-medal.png"
                    alt="server"
                    width={100}
                    height={100}
                  />
                  <Typography>$0.00 - $5000.00 </Typography>
                  <Typography> Deposit $5000 to unlock this rank </Typography>
                </Box>

                <Box className="mt-5">
                  <Typography className="text-center text-xl">
                    Latest Activities{" "}
                  </Typography>
                  <Box
                    sx={{
                      padding: "10px",
                      width: "300px",
                      height: "40vh",
                      backgroundColor: "#242731",
                      borderRadius: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src="/img/activities.png"
                      alt="server"
                      width={100}
                      height={100}
                    />
                    <Typography>No Account History</Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </NavPage>
    );
}
