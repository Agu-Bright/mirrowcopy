"use client";
import React from "react";
import NavPage from "@components/navPage/NavPage";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { RestaurantContext } from "@context/RestaurantContext";
import Card from "@components/Card";
import CryptoMarketData from "@components/MarketValue";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const {
    myWallet,
    formatMoney,
    setSideBar2,
    setGlobalCat,
    index,
    amount,
    coin,
    plan,
    setIndex,
    setAmount,
  } = useContext(RestaurantContext);

  const [fetching, setFetching] = useState(false);
  const [adminWallet, setAdminWallets] = useState([]);
  const [main, setMain] = useState("");
  const [active, setActive] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleScreenshot = () => {
    const el = document.getElementById("screenshot");
    if (el) {
      el.click();
    }
  };

  const handleCopy = (address) => {
    // const referralCode = session?.user?.referalCode;
    if (address) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          toast.success("Copied to Clipboard", {
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
          // Optionally, display a notification or toast here
        })
        .catch((err) => {
          toast.error("copy failed", {
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
        });
    }
  };

  const handleSubmit = async () => {
    if (!amount && !paymentMethod) {
      toast.error("Amount and Payment Method, Required", {
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
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post("/api/deposit/crypto-deposit/", {
        amount: amount,
        method: "crypto",
        network: main?.network,
        screenShot: image,
        status: "pending",
        plan,
        coin,
      });
      toast.success("Deposit Successful", {
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
      setIndex(0);
      setLoading(false);
      setImage("");
    } catch (error) {
      setLoading(false);
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
  };

  useEffect(() => {
    index === 1 &&
      (async () => {
        try {
          setFetching(true);
          const { data } = await axios.get(`/api/get-admin-wallet`);
          setAdminWallets(data?.wallets);
          setFetching(false);
        } catch (error) {
          toast.error("Unable to fetch Wallet", {
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
          setFetching(false);
        }
      })();
  }, [index]);

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
                src="/img/donation.png"
                alt="deposit"
                width={50}
                height={50}
                className="mr-2"
              />
              <Typography className="text-white text-2xl">
                Make a Deposit
              </Typography>
            </Box>
            <Box className="w-[100%] mt-4">
              {index === 0 && (
                <Stack
                  direction={{ md: "row", xs: "column" }}
                  justifyContent="space-between"
                >
                  <Box sx={{ width: { md: "32%", xs: "100%" } }}>
                    <Card title="SELECT INVESTMENT PLAN" type="investment" />
                  </Box>
                  <Box sx={{ width: { md: "32%", xs: "100%" } }}>
                    <Card
                      title="SELECT PAYMENT AND ENTER AMOUNT"
                      type="payment"
                    />
                  </Box>
                  <Box sx={{ width: { md: "32%", xs: "100%" } }}>
                    <Card title="CRYPTO CURRENCY MARKET PRICES" type="market" />
                    <CryptoMarketData />
                  </Box>
                </Stack>
              )}
              {index === 1 && (
                <Stack
                  direction={{ md: "row", xs: "column" }}
                  justifyContent="center  "
                >
                  <Stack
                    spacing={2}
                    direction="column"
                    justifyContent="space-between"
                    sx={{
                      width: { md: "50%", xs: "100%" },
                      padding: "20px",
                      borderRadius: "15px",
                      background:
                        "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
                    }}
                  >
                    <Box
                      sx={{
                        padding: "10px",
                        borderRadius: "10px",
                        background: "white",
                      }}
                    >
                      <Typography className="text-2xl font-extrabold">
                        Investment Details
                      </Typography>
                      <Divider />
                      <Typography className="!text-gray-800">
                        <span className="font-extrabold text-gray-800">
                          Deposit Amount:
                        </span>{" "}
                        ${amount}
                      </Typography>
                      <Typography
                        sx={{ color: "gray" }}
                        className="!text-gray-800"
                      >
                        <span className="font-extrabold text-gray-800">
                          Coin
                        </span>
                        : {coin}
                      </Typography>
                      <Typography className="!text-gray-800">
                        <span className="font-extrabold text-gray-800">
                          Investment Plan:
                        </span>{" "}
                        {plan}
                      </Typography>
                    </Box>
                    <Typography className="text-white text-2xl">
                      Select a Network
                    </Typography>
                    {adminWallet &&
                      adminWallet.length > 0 &&
                      adminWallet.map((item, index) => {
                        return (
                          <Paper
                            key={index}
                            onClick={() => {
                              setActive(item?.network);
                              setMain(item);
                              setPaymentMethod(item?.network);
                            }}
                            sx={{
                              width: "100%",
                              alignContent: "center",
                              padding: "10px",
                              cursor: "pointer",
                              background: `${
                                active === item?.network
                                  ? "linear-gradient(90deg, #c3c3ef  0%, #e8e7f2 35%, #87d4e1  100%)"
                                  : "white"
                              }`,
                            }}
                          >
                            <Typography
                              sx={{
                                color: "black",
                              }}
                            >
                              Network: {item?.network}
                            </Typography>
                          </Paper>
                        );
                      })}

                    {fetching && (
                      <CircularProgress size={20} sx={{ color: "#8075f" }} />
                    )}
                    {main?.walletAddress && (
                      <>
                        <Typography
                          sx={{
                            cursor: "pointer",
                            border: "0.1px dotted gray",
                            borderRadius: "10px",
                            padding: "0px",
                            margin: "0px",
                          }}
                          onClick={() => handleCopy(main?.walletAddress)}
                        >
                          <span
                            style={{
                              background: "gray",
                              color: "white",
                              borderTopLeftRadius: "10px",
                              borderBottomLeftRadius: "10px",
                              height: "100%",
                              paddingRight: "4px",
                            }}
                          >
                            copy:
                          </span>
                          <span className="text-white ml-2 overflow-y-scroll">
                            {main?.walletAddress}
                          </span>
                        </Typography>
                        <Typography className="text-red-400 text-sm">
                          Upload a screenshot of your transaction to verify
                          deposit
                        </Typography>
                        <button
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                            border: "none",
                            borderRadius: "10px",
                            color: "white",
                          }}
                          onClick={handleScreenshot}
                        >
                          Upload Screenshot
                        </button>
                        <input
                          type="file"
                          id="screenshot"
                          style={{ display: "none" }}
                          onChange={async (e) => {
                            const file = e.target?.files;
                            if (file) {
                              try {
                                setUploading(true);
                                const { data } = await axios.post(
                                  "/api/cloudinaryupload/profile",
                                  file
                                );
                                setImage(data?.photosArray[0].url);
                                setUploading(false);
                              } catch (error) {
                                setUploading(false);
                                toast.error("Unable to upload", {
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
                            }
                          }}
                        />
                        <div style={{ marginTop: "10px" }}>
                          {uploading ? (
                            <div
                              style={{
                                width: "150px",
                                height: "150px",
                                border: "0.1px solid #cacecf",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "5px",
                              }}
                            >
                              <CircularProgress
                                sx={{ color: "rgba(0,212,255,1)" }}
                              />
                            </div>
                          ) : (
                            <>
                              {image && (
                                <>
                                  <Avatar
                                    src={image}
                                    alt="screendhot"
                                    sx={{
                                      width: "100px",
                                      height: "100px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                  <button
                                    style={{
                                      background:
                                        "linear-gradient(90deg, rgba(128,117,255,1) 0%, rgba(128,117,255,1) 35%, rgba(0,212,255,1) 100%)",
                                      border: "none",
                                      padding: "2px 4px",
                                      borderRadius: "10px",
                                      marginTop: "10px",
                                      color: "white",
                                    }}
                                    onClick={() => handleSubmit()}
                                  >
                                    {loading ? (
                                      <CircularProgress
                                        sx={{ color: "white" }}
                                        size={15}
                                      />
                                    ) : (
                                      "Submit"
                                    )}
                                  </button>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </Stack>
                </Stack>
              )}
            </Box>
          </Stack>
        </Box>
      </NavPage>
    );
}
